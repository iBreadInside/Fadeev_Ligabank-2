import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BtnType, InputType } from '../../const';
import Logo from '../logo/logo';
import styles from './modal-login.module.scss';

export default function ModalLogin({onClose}) {
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

      <form className={styles.form}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <label className={styles.label} htmlFor='login'>Логин</label>
            <input
              className={styles.input}
              type={InputType.TEXT}
              autoFocus
              name='login-input'
              id='login' />
          </li>
          <li className={styles.item}>
            <label className={styles.label} htmlFor='password'>Пароль</label>
            <input
              className={styles.input}
              type={InputType.PASSWORD}
              name='login-input'
              id='password' />
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
};
