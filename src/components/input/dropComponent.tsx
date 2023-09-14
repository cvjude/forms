import { FC, useEffect } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

interface DropComponentProps {
  openDrop: boolean;
  innerInputs: any[];
  optionSchema?: (name: string, openDrop: boolean) => string;
  dropRef: any;
  presentValue?: any;
  activeIndex: number;
  handleClick: (name: string, value: any, key: string) => void;
  close: (index: number) => void;
  name: string;
}

// Update this logic to bring up data in batches as the user scrolls down the list.
export const DropComponent: FC<DropComponentProps> = ({
  openDrop,
  innerInputs,
  optionSchema,
  dropRef,
  presentValue,
  activeIndex,
  handleClick,
  close,
  name,
}) => {
  useEffect(() => {
    if (dropRef.current.getBoundingClientRect().right > window.innerWidth) {
      dropRef.current.classList.add('right-0');
      dropRef.current.classList.remove('-left-5');
    } else {
      dropRef.current.classList.add('-left-5');
      dropRef.current.classList.remove('right-0');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDrop]);

  return (
    <div
      className={classNames(
        styles.dropDownButtons,
        'absolute shadow w-full overflow-scroll opacity-0 invisible top-0 mt-5 -left-5 ml-5 z-10 rounded-sm',
        {
          [styles['open-drop']]: openDrop,
          close: !openDrop,
        }
      )}
      ref={dropRef}
    >
      {innerInputs.map((input, i) => {
        const _handleClick = (e: any) => {
          e.preventDefault();
          e.stopPropagation();
          handleClick(name, input.value, input.name);
          close(i);
        };

        const option = optionSchema
          ? optionSchema(input.name, openDrop)
          : input.name;

        return (
          <button
            className={classNames(
              styles.options,
              'block w-full p-2.5 rounded-sm text-left text-txt dark:text-white',
              {
                [styles.selected]: input.value === presentValue,
                [styles.__active]: i === activeIndex,
              }
            )}
            key={i}
            value={input.value}
            onClick={_handleClick}
            data-value={input.value}
            data-name={input.name}
            aria-label={input.name}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
