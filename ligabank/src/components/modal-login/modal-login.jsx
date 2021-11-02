import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BtnType, InputType } from '../../const';
import Logo from '../logo/logo';
import styles from './modal-login.module.scss';

export default function ModalLogin() {
  return(
    <>
      <div className={styles.header}>
        <Logo isModal />
        <button
          type={BtnType.BTN}
          className={styles.closeBtn}
          aria-label='Закрыть окно' />
      </div>

      <form className={styles.form}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <label className={styles.label} htmlFor='login'>Логин</label>
            <input
              className={styles.input}
              type={InputType.TEXT}
              name='login-input'
              id='login' />
          </li>
          <li className={styles.item}>
            <label className={styles.label} htmlFor='password'>Пароль</label>
            <input
              // style={`${styles.input} ${styles.input__password}`}
              type={InputType.PASSWORD}
              name='login-input'
              id='password' />
            <Link to='#'>Забыли пароль?</Link>
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
