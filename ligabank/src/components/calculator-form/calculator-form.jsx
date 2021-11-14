import React, { useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import { BtnType, InputType } from '../../const';
import styles from './calculator-form.module.scss';

const OptionValue = {
  DEFAULT: 'Выберите цель кредита',
  HYPOTHEC: 'Ипотечное кредитование',
  AVTO: 'Автомобильное кредитование',
};

const DEFAULT_ESTATE_COST = 2000000;
const MIN_ESTATE_COST = 1200000;
const MAX_ESTATE_COST = 25000000;
const ESTATE_COST_STEP = 100000;
const COST_ERROR_MSG = 'Некорректное значение';
const MIN_FIRST_PAYMENT_PERCENT = 10;
const FIRST_PAYMENT_STEP = 5;
const MIN_DURATION = 5;
const MAX_DURATION = 30;
const DURATION_STEP = 1;

export default function CalculatorForm() {
  const [selectedOption, setSelectedOption] = useState(OptionValue.DEFAULT);
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [estateCost, setEstateCost] = useState(DEFAULT_ESTATE_COST);

  const [firstPayment, setFirstPayment] = useState(estateCost / MIN_FIRST_PAYMENT_PERCENT);
  const [duration, setDuration] = useState(MIN_DURATION);

  const costRef = useRef();
  const firstPaymentRef = useRef();
  const firstPaymentRangeRef = useRef();

  const handleSelectToggle = () => {
    isSelectOpened ? setIsSelectOpened(false) : setIsSelectOpened(true);
  };

  const handleOptionClick = (key) => {
    isSelectOpened && setSelectedOption(key);
    setIsSelectOpened(false);
  };

  const handleCostChange = (value) => {
    setEstateCost(value);

    if (value < MIN_ESTATE_COST || value > MAX_ESTATE_COST) {
      costRef.current.classList.add(`${styles.param__invalid}`);
    } else {
      setFirstPayment(Math.round(value / MIN_FIRST_PAYMENT_PERCENT));
      costRef.current.classList.remove(`${styles.param__invalid}`);
    };
  };

  const handleCostBlur = (value) => {
    if (value < MIN_ESTATE_COST || value > MAX_ESTATE_COST) {
      costRef.current.value = COST_ERROR_MSG;
      costRef.current.classList.add(`${styles.param__invalid}`);
    };
  };

  const handleCtrlBtnClick = (isPlus) => {
    isPlus
      ? setEstateCost(estateCost + ESTATE_COST_STEP)
      : setEstateCost(estateCost - ESTATE_COST_STEP);
  };

  const handleFirstPaymentChange = (value) => {
    if (value < Math.round(estateCost / MIN_FIRST_PAYMENT_PERCENT)) {
      // console.log(value, firstPaymentRef.current.value);
      setFirstPayment(Math.round(estateCost / MIN_FIRST_PAYMENT_PERCENT));
    } else if (value > estateCost) {
      // console.log(value, firstPaymentRef.current.value, firstPayment);
      setFirstPayment(estateCost);
      // value = estateCost;
    } else {
      setFirstPayment(value);
      // setFirstPaymentRange(Math.round(estateCost * 100 / value));
      // firstPaymentRangeRef.current?.value = value;
      firstPaymentRangeRef.current.value = value * 100 / estateCost;
      console.log(Math.round(estateCost / value));
    };
  };

  const handleFirstPaymentRangeChange = () => {
    // setFirstPaymentRange(firstPaymentRangeRef.current?.value);
    setFirstPayment(Math.round(estateCost * firstPaymentRangeRef.current?.value / 100));
  };

  const isFirstSelection = selectedOption === OptionValue.DEFAULT ? 0 : 1;

  return(
    <section className={styles.section}>
      <h3 className={styles.title}>Кредитный калькулятор</h3>
      <form className={styles.form}>
        <fieldset className={`${styles.fieldset} ${styles.fieldset__purpose}`}>
          <legend className={styles.legend}>Шаг 1. Цель кредита</legend>

          <ul className={styles.select}>
            <li
              className={`${styles.option} ${styles.option__menu}`}
              onClick={() => handleSelectToggle()}>{selectedOption}</li>
            {isSelectOpened &&
              Object.values(OptionValue).slice(isFirstSelection).map((purpose) => (
                <li
                  key={purpose}
                  className={`${styles.option} ${styles.option__menu}`}
                  onClick={() => handleOptionClick(purpose)}
                  hidden={purpose === selectedOption}
                >
                  {purpose}
                </li>
              ))
            }
          </ul>
        </fieldset>

        <fieldset className={`${styles.fieldset} ${styles.fieldset__params}`}>
          <legend className={`${styles.legend} ${styles.legend__params}`}>Шаг 2. Введите параметры кредита</legend>

          <div className={styles.cost_block}>
            <label className={styles.label} htmlFor='cost'>Стоимость недвижимости</label>

            <div className={styles.input_wrapper}>
              <NumberFormat
                className={styles.param}
                id='cost'
                thousandSeparator=' '
                suffix=' рублей'
                getInputRef={costRef}
                value={estateCost}
                onValueChange={({floatValue}) => handleCostChange(floatValue)}
                onBlur={() => handleCostBlur(estateCost)}
              />

              <button
                className={styles.ctrl_btn}
                type={BtnType.BTN}
                onClick={() => handleCtrlBtnClick()}
              />

              <button
                className={`${styles.ctrl_btn} ${styles.ctrl_btn__plus}`}
                type={BtnType.BTN}
                onClick={() => handleCtrlBtnClick(true)}
              />
            </div>

            <p className={`${styles.tip} ${styles.tip__cost}`}>От 1 200 000 до 25 000 000 рублей</p>
          </div>

          <div className={styles.data}>
            <label className={styles.label} htmlFor='first-payment'>Первоначальный взнос</label>

            <NumberFormat
              className={styles.param}
              id='first-payment'
              type={InputType.TEXT}
              thousandSeparator=' '
              suffix=' рублей'
              getInputRef={firstPaymentRef}
              value={firstPayment}
              isNumericString={true}
              onValueChange={({floatValue}) => handleFirstPaymentChange(floatValue)}
            />

            <input
              className={styles.input_range}
              ref={firstPaymentRangeRef}
              type={InputType.RANGE}
              min={MIN_FIRST_PAYMENT_PERCENT}
              step={FIRST_PAYMENT_STEP}
              defaultValue={MIN_FIRST_PAYMENT_PERCENT}
              onInput={handleFirstPaymentRangeChange}
            />

            <p className={`${styles.tip} ${styles.tip__first_payment}`}>{`${MIN_FIRST_PAYMENT_PERCENT}%`}</p>
          </div>

          <div className={styles.data}>
            <label className={styles.label} htmlFor='duration'>Срок кредитования</label>
            <input
              className={styles.param}
              type={InputType.TEXT}
              id='duration'
              value='5 лет' />

            <input
              className={styles.input_range}
              // ref={firstPaymentRangeRef}
              type={InputType.RANGE}
              min={MIN_DURATION}
              max={MAX_DURATION}
              step={DURATION_STEP}
              defaultValue={MIN_DURATION}
              // onInput={handleFirstPaymentRangeChange}
            />

            <div className={styles.duration_tips}>
              <p className={`${styles.tip} ${styles.tip__duration}`}>{`${MIN_DURATION} лет`}</p>
              <p className={`${styles.tip} ${styles.tip__duration}`}>{`${MAX_DURATION} лет`}</p>
            </div>
          </div>

          {/* <div className={styles.mother_capital}> */}
            <input type={InputType.CHECKBOX} id='mother' />
            <label htmlFor='mother'>Использовать материнский капитал</label>
          {/* </div> */}
        </fieldset>
      </form>
    </section>
  );
}
