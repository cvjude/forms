import { FC } from 'react';
import classNames from 'classnames';
import styles from './style.module.scss';

interface CheckBoxProps {
  handleChange: (e: any) => void;
  value: boolean;
  placeHolder: string;
  name: string;
}

export const CheckBox: FC<CheckBoxProps> = ({
  handleChange,
  value,
  placeHolder,
  name,
}) => {
  return (
    <div className={styles['input-div']} style={{ background: 'transparent' }}>
      <div className={styles['input']}>
        <div className={styles['input-con']}>
          <div className="p-2 pt-5 flex items-center">
            <input
              onChange={handleChange}
              data-test="checkbox"
              type="checkbox"
              className={classNames(styles['check-input'], 'hidden')}
              checked={value}
              id="input-type-checkbox"
              name={name}
            />
            <label
              className="flex cursor-pointer"
              htmlFor="input-type-checkbox"
            >
              <span
                className={classNames(
                  styles['checkbox-label'],
                  styles['create-team-label'],
                  'w-5 h-5 border-2 mr-5 border-txt relative inline-block'
                )}
              />
              <span>{placeHolder}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
