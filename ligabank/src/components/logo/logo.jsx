import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from './logo.module.scss';
import {AppRoute} from '../../const';

export default function Logo({isModal = false}) {
  return (
    <Link
      className={`${styles.link} ${isModal ? styles.link__modal : ''}`}
      to={AppRoute.MAIN}
      aria-label='Логотип Лига-банк'>
      <svg className={styles.logo} width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.75 1H13.8333L1 22.3415H4.79167L6.54167 19.2927L16.75 1Z" fill="#2C36F2"/>
        <path d="M2.75 26H27.25L16.75 7.09756L15 10.1463L20.25 19.2927L22 22.3415H4.79167H1L2.75 26Z" fill="#2C36F2"/>
        <path d="M22 22.3415L20.25 19.2927H9.75H6.54167L4.79167 22.3415H22Z" fill="#2C36F2"/>
        <path d="M27.25 26L29 22.3415L16.75 1L6.54167 19.2927H9.75L15 10.1463L16.75 7.09756L27.25 26Z" fill="#2C36F2"/>
        <path d="M15 10.1463L9.75 19.2927H20.25L15 10.1463Z" fill="#2C36F2"/>
        <path d="M27.25 26H2.75L1 22.3415M27.25 26L29 22.3415L16.75 1M27.25 26L16.75 7.09756L15 10.1463M16.75 1H13.8333L1 22.3415M16.75 1L6.54167 19.2927M1 22.3415H4.79167M15 10.1463L9.75 19.2927M15 10.1463L20.25 19.2927M9.75 19.2927H20.25M9.75 19.2927H6.54167M20.25 19.2927L22 22.3415H4.79167M6.54167 19.2927L4.79167 22.3415" stroke="#F6F7FF"/>
      </svg>

      {isModal
        ? <div className={styles.textBlock}>
          <p className={styles.title}>ЛИГА Банк</p>
          <span className={styles.subtitle}>интернет-банк</span>
        </div>
        : 'ЛИГА Банк'}
    </Link>
  );
}

Logo.propTypes = {
  isModal: PropTypes.bool,
}
