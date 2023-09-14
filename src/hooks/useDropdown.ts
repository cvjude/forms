import { useState, useEffect, useRef, useCallback } from 'react';
import { isVisible } from 'utils/helpers';

interface useDropDownProps {
  name: string;
  parentRef: any;
  disabled: boolean;
  handleClick: (
    name: string,
    value: any | null | undefined,
    label: string
  ) => void;
  innerInputs: any[];
  type: string;
}

interface DropDownReturn {
  openDrop: boolean;
  revileDropDown: () => void;
  toggleDropDown: () => void;
  closeFromOutside: (event: any) => void;
  close: () => void;
  activeIndex: number;
  dropRef: any;
}

export const useDropDown = ({
  name,
  parentRef,
  disabled,
  handleClick,
  innerInputs,
  type,
}: useDropDownProps): DropDownReturn => {
  const [openDrop, setOpenDrop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    type === 'autocomplete' ? -1 : 0
  );
  const activeIndexRef = useRef<any>(type === 'autocomplete' ? -1 : 0);
  const dirRef = useRef<any>();
  const dropRef = useRef<any>();

  const updateActiveIndex = (index: number) => {
    setActiveIndex(index);
    activeIndexRef.current = index;
  };

  useEffect(() => {
    const element = document.querySelector('.options.__active');
    if (!element) return;

    if (!isVisible(element, dropRef.current)) {
      document
        .querySelector('.options.__active')
        ?.scrollIntoView(dirRef.current === 'down');
    }
  }, [activeIndex, openDrop]);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.keyCode >= 48 && event.keyCode <= 90) {
        if (type !== 'autocomplete') {
          event.stopPropagation();
          event.preventDefault();
          const key = event.key.toLowerCase();
          const index = innerInputs.findIndex(
            (input) => input.name.toLowerCase()[0] === key
          );
          updateActiveIndex(index);
        }
      }

      if (event.key === 'ArrowUp' && activeIndexRef.current > 0) {
        event.stopPropagation();
        event.preventDefault();
        dirRef.current = 'up';
        updateActiveIndex(activeIndexRef.current - 1);
      }

      if (
        event.key === 'ArrowDown' &&
        activeIndexRef.current < innerInputs.length - 1
      ) {
        event.stopPropagation();
        event.preventDefault();
        dirRef.current = 'down';
        updateActiveIndex(activeIndexRef.current + 1);
      }

      if (event.key === 'Enter') {
        event.stopPropagation();
        event.preventDefault();

        if (type === 'autocomplete') {
          const element = document.querySelector('.options.__active');

          handleClick(
            name,
            element?.getAttribute?.('data-value'),
            element?.getAttribute?.('data-name') || ''
          );
        } else {
          const data = innerInputs.filter(
            (input, index) => index === activeIndexRef.current
          )[0];
          handleClick(name, data.value, data.name);
        }

        setOpenDrop(false);
      }
    },
    [innerInputs, activeIndexRef, handleClick, name, type]
  );

  useEffect(() => {
    if (openDrop) {
      typeof window !== 'undefined' &&
        document.body.addEventListener('keydown', handleKeyDown);
    }
    if (!openDrop) {
      typeof window !== 'undefined' &&
        document.body.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.body.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [openDrop, handleKeyDown]);

  const toggleDropDown = () => {
    if (disabled) return;
    setOpenDrop(!openDrop);
  };

  const closeFromOutside = (e: any) => {
    const leavingParent = !parentRef.current.contains(e.relatedTarget);

    if (leavingParent) {
      close();
    }
  };

  const close = (index?: number) => {
    setOpenDrop(false);
    updateActiveIndex(type === 'autocomplete' ? -1 : index || activeIndex);
  };

  const revileDropDown = () => {
    setOpenDrop(true);
  };

  return {
    revileDropDown,
    toggleDropDown,
    closeFromOutside,
    openDrop,
    close,
    dropRef,
    activeIndex,
  };
};
