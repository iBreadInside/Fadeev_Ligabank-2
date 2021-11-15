import React, { useState } from 'react';
import styles from './calculator.module.scss';
import Select from '../select/select';
import Form from '../form/form';
import Bid from '../bid/bid';
import Offer from '../offer/offer';
import Popup from '../popup/popup';
import { Purpose } from '../../const';

const DEFAULT_STATE_STRING = '';
const DEFAULT_STATE_NUMBER = 0;
const STEP = 1;
const DEFAULT_NUMBER = '0010';

function Calculator() {
  const [creditState, setCreditState] = useState({
    purpose: Purpose.DEFAULT,
    price: DEFAULT_STATE_STRING,
    payment: DEFAULT_STATE_STRING,
    percent: DEFAULT_STATE_NUMBER,
    time: DEFAULT_STATE_STRING,
    capital: false,
    casco: false,
    insurance: false,
  });
  const [formState, setFormState] = useState(false);
  const [bidState, setBidState] = useState(false);
  const [number, setNumber] = useState(DEFAULT_NUMBER);
  const [popupState, setPopupState] = useState(false);

  const handlePopupClick = () => {
    setPopupState((prev) => !prev);
  };

  const handleSubmitClick = (evt) => {
    evt.preventDefault();
    setNumber((prev) => `00${Number(prev) + STEP}`);
    setPopupState((prev) => !prev);
  };

  return (
    <section className={styles.calculator} id='calculator'>
      <h2 className={styles.title}>Кредитный калькулятор</h2>
      <form action='/#' method='post' className={styles.form} onSubmit={handleSubmitClick}>
        <Select
          purpose={creditState.purpose}
          setCreditState={setCreditState}
          setFormState={setFormState}
          setBidState={setBidState}
        />
        {
          formState &&
          <>
            <Form
              creditState={creditState}
              setCreditState={setCreditState}
            />
            <Offer
              creditState={creditState}
              setBidState={setBidState}
            />
          </>
        }
        {
          bidState &&
          <Bid
            creditState={creditState}
            number={number}
          />
        }
      </form>
      {
        popupState && <Popup popupState={popupState} handlePopupClick={handlePopupClick}/>
      }
    </section>
  );
}

export default Calculator;

