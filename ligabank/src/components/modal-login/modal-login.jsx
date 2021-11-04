import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BtnType, InputType, LocStorKey } from '../../const';
import Logo from '../logo/logo';
import styles from './modal-login.module.scss';

const MAX_PASS_LENGTH = 16;

export default function ModalLogin({onClose, onFormSubmit}) {
  const [isPassHide, setIsPassHide] = useState(true);
  const [fields, setFields] = useState({
    login: '',
    password: '',
  });

  let {login, password} = fields;

  useEffect(() => {
    setFields(
      {
        login: localStorage.getItem(LocStorKey.LOGIN) || '',
        password: localStorage.getItem(LocStorKey.PASS) || '',
      }
    );
  }, []);

  // Input handlers
  const handleLoginChange = (evt) => {
    localStorage.setItem(LocStorKey.LOGIN, evt.target.value);
    setFields(prevState => ({...prevState, login: evt.target.value}));
  };

  const handlePassChange = (evt) => {
    localStorage.setItem(LocStorKey.PASS, evt.target.value);
    setFields(prevState => ({...prevState, password: evt.target.value}));
  };

  const handlePassToggle = (evt) => {
    evt.preventDefault();
    isPassHide ? setIsPassHide(false) : setIsPassHide(true);
  };

  return(
    <>
      <div className={styles.header}>
        <Logo isModal />
        <button
          type={BtnType.BTN}
          className={styles.closeBtn}
          onClick={onClose}
          aria-label='Закрыть окно' />
      </div>

      <form className={styles.form} onSubmit={onFormSubmit}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <label className={styles.label} htmlFor={LocStorKey.LOGIN}>Логин</label>
            <input
              className={styles.input}
              type={InputType.TEXT}
              value={login}
              onChange={handleLoginChange}
              autoFocus
              name='login-input'
              id={LocStorKey.LOGIN} />
          </li>
          <li className={styles.item}>
            <label className={styles.label} htmlFor={LocStorKey.PASS}>Пароль</label>
            <input
              className={styles.input}
              type={isPassHide ? InputType.PASSWORD : InputType.TEXT}
              maxLength={MAX_PASS_LENGTH}
              value={password}
              onChange={handlePassChange}
              name='login-input'
              id={LocStorKey.PASS} />
            <button
              type={BtnType.button}
              className={styles.password_toggler}
              onClick={handlePassToggle}
              aria-label={isPassHide ? 'Показать пароль' : 'Скрыть пароль'}
            />
            <Link className={styles.forgotBtn} to='#'>Забыли пароль?</Link>
          </li>
        </ul>

        <button
          type={BtnType.SUBMIT}
          className={styles.loginBtn}>
            Войти
        </button>
      </form>
    </>
  );
}

ModalLogin.propTypes = {
  onClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
