import React from 'react';
import styles from './button.module.scss';
import PropTypes from 'prop-types';

export default function Button({text, isBig=true, isDisabled, type, onClick}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${isBig === true ? styles.big : styles.small}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button >
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  isBig: PropTypes.bool.isRequired,
  isDisabled:PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
