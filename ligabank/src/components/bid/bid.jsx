import React, { useEffect, useState } from 'react';
import styles from './bid.module.scss';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { BtnType, InputType, Purpose } from '../../const';

const InputName = {
  NAME: 'name',
  TEL: 'tel',
  EMAIL: 'email',
};

export default function Bid({number, creditState}) {
  const storage = localStorage.getItem('Bid');
  const initialForm = storage ? JSON.parse(storage) : {
    [InputName.NAME]: '',
    [InputName.TEL]: '',
    [InputName.EMAIL]: '',
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    localStorage.setItem('Bid', JSON.stringify(form));
  }, [form]);

  const handleInputChange = (evt) => {
    const {name, value} = evt.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.bid}>
      <h3 className={styles.title}>Шаг 3. Оформление заявки</h3>
      <dl className={styles.list}>
        <div className={styles.dl}>
          <dt className={styles.term}>Номер заявки</dt>
          <dd className={styles.definition}>№ {number}</dd>
        </div>
        <div className={styles.dl}>
          <dt className={styles.term}>Цель кредита</dt>
          <dd className={styles.definition}>{creditState.purpose}</dd>
        </div>
        <div className={styles.dl}>
          <dt className={styles.term}>Стоимость {creditState.purpose === Purpose.MORTGAGE ? 'недвижимости' : 'автомобиля'}</dt>
          <dd className={styles.definition}>{creditState.price}</dd>
        </div>
        <div className={styles.dl}>
          <dt className={styles.term}>Первоначальный взнос</dt>
          <dd className={styles.definition}>{creditState.payment}</dd>
        </div>
        <div className={styles.dl}>
          <dt className={styles.term}>Срок кредитования</dt>
          <dd className={styles.definition}>{creditState.time}</dd>
        </div>
      </dl>
      <fieldset className={styles.fieldset}>
        <legend className='visually-hidden'>Ваши данные</legend>
        <label className='visually-hidden' htmlFor={InputName.NAME}>Введите имя</label>
        <input
          className={styles.input}
          name={InputName.NAME}
          id={InputName.NAME}
          autoFocus
          type={InputType.TEXT}
          placeholder='ФИО'
          required
          value={form[InputName.NAME]}
          onChange={handleInputChange}
        />
        <label className='visually-hidden' htmlFor={InputName.TEL}>Введите телефон</label>
        <NumberFormat
          format='+7 (###) ###-####'
          mask='_'
          className={styles.input}
          name={InputName.TEL}
          id={InputName.TEL}
          type={InputType.TEL}
          placeholder='Телефон'
          required
          value={form[InputName.TEL]}
          onChange={handleInputChange}
        />
        <label className='visually-hidden' htmlFor={InputName.EMAIL}>Введите почту</label>
        <input
          className={styles.input}
          name={InputName.EMAIL}
          id={InputType.EMAIL}
          type={InputType.EMAIL}
          placeholder='E-mail'
          required
          value={form[InputName.EMAIL]}
          onChange={handleInputChange}
        />
      </fieldset>
      <button
        type={BtnType.SUBMIT}
        className={styles.submit}
      >
        Отправить
      </button>
    </div>
  );
}

Bid.propTypes = {
  number: PropTypes.string.isRequired,
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
};
