import React from 'react';
import { BtnType } from '../../const';
import styles from './slide-item.module.scss';
import PropTypes from 'prop-types';

export default function SlideItem({slide}) {
  const {
    id,
    isWhite,
    subtitle,
    btnText,
  } = slide;

  return(
    <>
      <h2 className={styles.title}>Лига Банк</h2>
      <p className={`${styles.subtitle} ${id === 2 ? styles.subtitle_short : ''}`}>
        {subtitle}
      </p>
      {
        btnText &&
          <button
            className={`${styles.button} ${isWhite ? styles.button__white : ''}`}
            type={BtnType.BTN}
          >
            {btnText}
          </button>
      }
    </>
  );
}

SlideItem.propTypes = {
  isWhite: PropTypes.bool,
  subtitle: PropTypes.string,
  btnText: PropTypes.string,
};
