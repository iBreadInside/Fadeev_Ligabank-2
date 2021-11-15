import React, { useEffect, useState } from 'react';
import styles from './bid.module.scss';
import Button from '../button/button';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { Purpose } from '../../const';

const InputsName = {
  NAME: 'name',
  TEL: 'tel',
  EMAIL: 'email',
};

function Bid({number, creditState}) {
  const storage = localStorage.getItem('Bid');
  const initialForm = storage ? JSON.parse(storage) : {
    [InputsName.NAME]: '',
    [InputsName.TEL]: '',
    [InputsName.EMAIL]: '',
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
        <label className='visually-hidden' htmlFor={InputsName.NAME}>Введите имя</label>
        <input
          className={styles.input}
          name={InputsName.NAME}
          id={InputsName.NAME}
          autoFocus
          type='text'
          placeholder='ФИО'
          required
          value={form[InputsName.NAME]}
          onChange={handleInputChange}
        />
        <label className='visually-hidden' htmlFor={InputsName.TEL}>Введите телефон</label>
        <NumberFormat
          format='+7 (###) ###-####'
          mask='_'
          className={styles.input}
          name={InputsName.TEL}
          id={InputsName.TEL}
          type='tel'
          placeholder='Телефон'
          required
          value={form[InputsName.TEL]}
          onChange={handleInputChange}
        />
        <label className='visually-hidden' htmlFor={InputsName.EMAIL}>Введите почту</label>
        <input
          className={styles.input}
          name={InputsName.EMAIL}
          id={InputsName.EMAIL}
          type='email'
          placeholder='E-mail'
          required
          value={form[InputsName.EMAIL]}
          onChange={handleInputChange}
        />
      </fieldset>
      <Button
        type='submit'
        className={styles.submit}
      >
        Отправить
      </Button>
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

export default Bid;

