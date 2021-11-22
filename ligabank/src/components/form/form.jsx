import React, { useEffect, useState } from 'react';
import styles from './form.module.scss';
import PropTypes from 'prop-types';
import { Purpose, makeInputString, makeInputNumber, BtnType, InputType } from '../../const';

const INPUT_MAX_LENGTH = 12;
const STRING_ENDS = {
  RUB: ['рубль', 'рубля', 'рублей'],
  YEAR: ['год', 'года', 'лет'],
};

const deleteLetters = (value) => value.replace(/[a-zа-яё]/gi, '').trim();
const getPercentFromNumber = (percent, number) => number * percent / 100;
const getNumberFromPercent = (mainNumber, number) => number * 100 / mainNumber;

const InputName = {
  PRICE: 'price',
  PAYMENT: 'payment',
  TIME: 'time',
  RANGE: 'range',
};

const btnName = {
  MINUS: 'minus',
  PLUS: 'plus',
};

const priceParams = {
  [Purpose.MORTGAGE]: {
    value: 1200000,
    min: 1200000,
    max: 25000000,
    step: 100000,
  },
  [Purpose.CAR]: {
    value: 1000000,
    min: 500000,
    max: 5000000,
    step: 50000,
  },
};

const paymentParams = {
  [Purpose.MORTGAGE]: {
    percent: 10,
    value: 120000,
    min: 10,
    max: 100,
    step: 5,
  },
  [Purpose.CAR]: {
    percent: 20,
    value: 200000,
    min: 20,
    max: 100,
    step: 5,
  },
};

const timeParams = {
  [Purpose.MORTGAGE]: {
    value: 5,
    min: 5,
    max: 30,
    step: 1,
  },
  [Purpose.CAR]: {
    value: 1,
    min: 1,
    max: 5,
    step: 1,
  },
};

export default function Form({creditState, setCreditState}) {
  const [timeRange, setTimeRange] = useState('');
  const [priceError, setPriceError] = useState(false);

  const purpose = creditState.purpose;

  useEffect(() => {
    const priceValue = priceParams[purpose].value;
    const purposeValue = paymentParams[purpose].value;
    const percentValue = paymentParams[purpose].percent;
    const timeValue = timeParams[purpose].value;

    if (purpose !== Purpose.DEFAULT) {
      setCreditState((prev) => ({
        ...prev,
        price: makeInputString(priceValue, STRING_ENDS.RUB),
        payment: makeInputString(purposeValue, STRING_ENDS.RUB),
        percent: percentValue,
        time: makeInputString(timeValue, STRING_ENDS.YEAR),
      }));

      setTimeRange(timeParams[purpose].min);
    }
  }, [purpose, setCreditState]);

  const handlePriceFocus = () => {
    setCreditState((prev) => ({...prev, price: deleteLetters(prev.price)}));
  };

  const handlePriceChange = (evt) => {
    const value = makeInputNumber(evt.target.value);
    const paymentValue = getPercentFromNumber(creditState.percent, value);
    const min = priceParams[purpose].min;
    const max = priceParams[purpose].max;

    if (value.toString().length >= INPUT_MAX_LENGTH) {
      return;
    }

    if (value < min) {
      setPriceError(true);
    }

    if (value > max) {
      setPriceError(true);
    }

    if (value >= min && value <= max) {
      setPriceError(false);
    }

    setCreditState((prev) => ({
      ...prev,
      price: makeInputString(value),
      payment: makeInputString(paymentValue, STRING_ENDS.RUB),
    }));
  };

  const handlePriceBlur = () => {
    const min = priceParams[purpose].min;
    const max = priceParams[purpose].max;
    const value = makeInputNumber(creditState.price);
    let paymentValue;

    if (value < min) {
      setPriceError(false);
      setCreditState((prev) => ({...prev, price: makeInputString(min, STRING_ENDS.RUB)}));
      paymentValue = getPercentFromNumber(creditState.percent, min);
      setCreditState((prev) => ({...prev, payment: makeInputString(paymentValue, STRING_ENDS.RUB)}));
      return;
    }

    if (value > max) {
      setPriceError(false);
      setCreditState((prev) => ({...prev, price: makeInputString(max, STRING_ENDS.RUB)}));
      paymentValue = getPercentFromNumber(creditState.percent, max);
      setCreditState((prev) => ({...prev, payment: makeInputString(paymentValue, STRING_ENDS.RUB)}));
      return;
    }

    return setCreditState((prev) => ({...prev, price: `${prev.price} рублей`}));
  };

  const handleButtonClick = (evt) => {
    const {name} = evt.target;

    let value = makeInputNumber(creditState.price);
    const min = priceParams[purpose].min;
    const max = priceParams[purpose].max;
    let newValue;

    if ((value === min && name === btnName.MINUS) || (value === max && name === btnName.PLUS)) {
      return;
    }

    if (name === btnName.PLUS) {
      newValue = value += priceParams[purpose].step;
    }

    if (name === btnName.MINUS) {
      newValue = value -= priceParams[purpose].step;
    }

    const paymentValue = getPercentFromNumber(creditState.percent, newValue);

    setCreditState((prev) => ({
      ...prev,
      price: makeInputString(newValue, STRING_ENDS.RUB),
      payment: makeInputString(paymentValue, STRING_ENDS.RUB),
    }));
  };

  const handlePaymentChange = (evt) => {
    const name = evt.target.name;
    const value = makeInputNumber(evt.target.value);
    const priceValue = makeInputNumber(creditState.price);
    let paymentValue;

    if (value.toString().length >= INPUT_MAX_LENGTH) {
      return;
    }

    if (name === InputName.RANGE) {
      paymentValue = getPercentFromNumber(value, priceValue);

      setCreditState((prev) => ({
        ...prev,
        payment: makeInputString(paymentValue, STRING_ENDS.RUB),
        percent: value,
      }));
      return;
    }

    if (name === InputName.PAYMENT) {
      setCreditState((prev) => ({...prev, payment: makeInputString(value)}));

      const rangeValue = getNumberFromPercent(priceValue, value);
      const percent = rangeValue < paymentParams[purpose].percent ? paymentParams[purpose].percent : rangeValue;
      setCreditState((prev) => ({...prev, percent: percent}));
    }
  };

  const handlePaymentFocus = () => {
    setCreditState((prev) => ({...prev, payment: deleteLetters(prev.payment)}));
  };

  const handlePaymentBlur = (evt) => {
    const actualValue = makeInputNumber(evt.target.value);
    const priceValue = makeInputNumber(creditState.price);
    const percent = paymentParams[purpose].percent;
    const minValue = getPercentFromNumber(percent, priceValue);

    if (actualValue < minValue) {
      setCreditState((prev) => ({...prev, payment: makeInputString(minValue, STRING_ENDS.RUB)}));
      return;
    }

    setCreditState((prev) => ({...prev, payment: makeInputString(prev.payment, STRING_ENDS.RUB)}));
  };

  const handleTimeChange = (evt) => {
    const name = evt.target.name;
    const value = makeInputNumber(evt.target.value);
    const min = timeParams[creditState.purpose].min;
    const max = timeParams[creditState.purpose].max;

    if (value < min) {
      return setCreditState((prev) => ({...prev, time: makeInputString(min)}));
    }

    if (value > max) {
      return setCreditState((prev) => ({...prev, time: makeInputString(max)}));
    }


    if (name === InputName.TIME) {
      setCreditState((prev) => ({...prev, time: makeInputString(value)}));
      setTimeRange(value);
      return;
    }

    if (name === InputName.RANGE) {
      setTimeRange(value);
      setCreditState((prev) => ({...prev, time: makeInputString(value, STRING_ENDS.YEAR)}));
    }
  };

  const handleTimeFocus = () => {
    setCreditState((prev) => ({...prev, time: deleteLetters(prev.time)}));
  };

  const handleTimeBlur = () => {
    setCreditState((prev) => ({...prev, time: makeInputString(prev.time, STRING_ENDS.YEAR)}));
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Шаг 2. Введите параметры кредита</legend>
      <ul className={styles.list}>
        <li className={styles.item}>
          {
            priceError && <span className={styles.error}>Некорректное значение</span>
          }
          <label className={styles.label}>
            Стоимость недвижимости
            <input
              className={`${styles.input} ${priceError ? styles.input__error : ''}`}
              type='text'
              name={InputName.PRICE}
              value={creditState.price}
              onFocus={handlePriceFocus}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
            />
          </label>
          <button
            onClick={handleButtonClick}
            name={btnName.MINUS}
            type={BtnType.BTN}
            aria-label='Уменьшить значение'
            className={`${styles.control} ${styles.control__minus}`}
          >
          </button>
          <button
            onClick={handleButtonClick}
            name={btnName.PLUS}
            type={BtnType.BTN}
            aria-label='Увеличить значение'
            className={`${styles.control} ${styles.control__plus}`}
          >
          </button>
          <p className={styles.notice}>От {makeInputString(priceParams[purpose].min)} до {makeInputString(priceParams[purpose].max)} рублей</p>
        </li>
        <li className={styles.item}>
          <label className={styles.label}>
            Первоначальный взнос
            <input
              className={styles.input}
              type={InputType.TEXT}
              name={InputName.PAYMENT}
              value={creditState.payment}
              onFocus={handlePaymentFocus}
              onChange={handlePaymentChange}
              onBlur={handlePaymentBlur}
            />
          </label>
          <input
            className={styles.range}
            type={InputType.RANGE}
            name={InputName.RANGE}
            min={paymentParams[purpose].min}
            max={paymentParams[purpose].max}
            step={paymentParams[purpose].step}
            value={creditState.percent}
            onChange={handlePaymentChange}
          />
          <p className={styles.limit}>{Math.round(creditState.percent)}%</p>
        </li>
        <li className={styles.item}>
          <label className={styles.label}>
            Срок кредитования
            <input
              className={styles.input}
              type={InputType.TEXT}
              name={InputName.TIME}
              value={creditState.time}
              onBlur={handleTimeBlur}
              onFocus={handleTimeFocus}
              onChange={handleTimeChange}
            />
          </label>
          <input
            type={InputType.RANGE}
            className={`${styles.range} ${styles.range__time}`}
            name={InputName.RANGE}
            min={timeParams[purpose].min}
            max={timeParams[purpose].max}
            step={timeParams[purpose].step}
            value={timeRange}
            onChange={handleTimeChange}
            onBlur={handleTimeBlur}
            onFocus={handleTimeFocus}
          />
          <p className={styles.limit}>
            <span>{timeParams[purpose].min} лет</span>
            <span>{timeParams[purpose].max} лет</span>
          </p>
        </li>
        {
          purpose === Purpose.MORTGAGE &&
          <li className={styles.item}>
            <label className={styles.checkbox}>
              <input
                type={InputType.CHECKBOX}
                checked={creditState.capital}
                onChange={() => setCreditState((prev) => ({...prev, capital: !prev.capital}))}
              />
              <span>Использовать материнский капитал</span>
            </label>
          </li>
        }
        {
          purpose === Purpose.CAR &&
          <>
            <li className={styles.item}>
              <label className={styles.checkbox}>
                <input
                  type={InputType.CHECKBOX}
                  checked={creditState.casco}
                  onChange={() => setCreditState((prev) => ({...prev, casco: !prev.casco}))}
                />
                <span>Оформить КАСКО в нашем банке</span>
              </label>
            </li>
            <li className={styles.item}>
              <label className={styles.checkbox}>
                <input
                  type={InputType.CHECKBOX}
                  checked={creditState.insurance}
                  onChange={() => setCreditState((prev) => ({...prev, insurance: !prev.insurance}))}
                />
                <span>Оформить Страхование жизни в нашем банке</span>
              </label>
            </li>
          </>
        }
      </ul>
    </fieldset>
  );
}

Form.propTypes = {
  creditState: PropTypes.shape({
    purpose: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    capital: PropTypes.bool.isRequired,
    casco: PropTypes.bool.isRequired,
    insurance: PropTypes.bool.isRequired,
  }).isRequired,
  setCreditState: PropTypes.func.isRequired,
};
