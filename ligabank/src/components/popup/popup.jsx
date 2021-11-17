import React from 'react';
import styles from './popup.module.scss';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

function Popup({popupState, handlePopupClick}) {
  const handleAfterOpen = () => {
    document.body.classList.add(styles.open);
  };

  const handleAfterClose = () => {
    document.body.classList.remove(styles.open);
  };

  return (
    <ReactModal
      isOpen={popupState}
      contentLabel='Форма успешно заполнена'
      overlayClassName={styles.popup}
      className={styles.inner}
      onRequestClose={handlePopupClick}
      onAfterOpen={handleAfterOpen}
      onAfterClose={handleAfterClose}
    >
      <section>
        <h2 className='visually-hidden'>
          Сообщение об успешном заполнении формы
        </h2>
        <button
          className={styles.close}
          onClick={handlePopupClick}
          aria-label='Закрыть модальное окно'
        >
        </button>
        <p className={styles.title}>
          Спасибо за обращение в наш банк.
        </p>
        <p className={styles.text}>
          Наш менеджер скоро свяжется с вами по указанному номеру телефона.
        </p>
      </section>
    </ReactModal>
  );
}

Popup.propTypes = {
  popupState: PropTypes.bool.isRequired,
  handlePopupClick: PropTypes.func.isRequired,
};


export default Popup;
