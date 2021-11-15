import React, {useState} from 'react';
import styles from './select.module.scss';
import PropTypes from 'prop-types';
import { Purpose } from '../../const';

const titles = {
  [Purpose.DEFAULT]: 'Выберите цель кредита',
  [Purpose.MORTGAGE]: 'Ипотечное кредитование',
  [Purpose.CAR]: 'Автомобильное кредитование',
};

function Select({purpose, setCreditState, setFormState, setBidState}) {
  const [isOpen, setOpen] = useState(false);

  const closeSelect = (value) => {
    setOpen(false);
    setCreditState((prev) => ({...prev, purpose: value}));
    setFormState(true);

    if (purpose !== value) {
      setBidState(false);
    }
  };

  const handleClick = (evt) => {
    closeSelect(evt.target.htmlFor);
  };

  const handleKeyDown = (evt) => {
    if (evt.code === 'Enter') {
      closeSelect(evt.target.value);
    }
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Шаг 1. Цель кредита</legend>
      <button
        type='button'
        className={`${styles.button} ${isOpen ? styles.button__open : ''}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {titles[purpose]}
      </button>
      {
        isOpen &&
        <ul
          className={styles.list}
        >
          {
            Object.entries(titles).map(([value, title]) => {
              if (title === titles[Purpose.DEFAULT]) {
                return '';
              }
              return (
                <li className={styles.item} key={value}>
                  <input
                    type='radio'
                    className={`visually-hidden ${styles.input}`}
                    id={value}
                    name='radio'
                    value={value}
                    onKeyDown={handleKeyDown}
                  />
                  <label
                    className={styles.label}
                    htmlFor={value}
                    onClick={handleClick}
                  >
                    {title}
                  </label>
                </li>
              );
            })
          }
        </ul>
      }
    </fieldset>
  );
}

Select.propTypes = {
  purpose: PropTypes.string.isRequired,
  setCreditState: PropTypes.func.isRequired,
  setFormState: PropTypes.func.isRequired,
  setBidState: PropTypes.func.isRequired,
};

export default Select;
