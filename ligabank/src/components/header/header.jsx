import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './header.module.scss';
import Logo from '../logo/logo';
import Nav from '../nav/nav';
import { BtnType, LocStorKey } from '../../const';
import ModalLogin from '../modal-login/modal-login';
import LoginBtn from '../login-btn/login-btn';

Modal.setAppElement('#root');

export default function Header() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isMobileNavHide, setIsMobileNavHide] = useState(true);

  // Modal handlers
  const handleModalOpen = () => {
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    Object.values(LocStorKey).map((name) => (
      localStorage.removeItem(name)
    ));

    setIsModalOpened(false);
  };

  // Nav handlers
  const handleOpenNav = () => {
    setIsMobileNavHide(false);
  };

  const handleCloseNav = () => {
    setIsMobileNavHide(true);
  };

  return (
    <header className={`${styles.header} ${isMobileNavHide ? '' : styles.header__navShown}`}>
      <div className={styles.wrapper}>

        <nav className={styles.nav}>
          <div className={styles.nav__control}>
            <button
              type={BtnType.BTN}
              className={styles.nav__toggler}
              onClick={isMobileNavHide ? handleOpenNav : handleCloseNav}
            />
            <Logo/>
            <button
              type={BtnType.BTN}
              className={`${styles.morph} ${isMobileNavHide ? styles.morph__login : styles.morph__close}`}
              onClick={isMobileNavHide ? handleModalOpen : handleCloseNav}
            />
          </div>

          <div className={`${styles.menu} ${isMobileNavHide ? styles.menu__hide : ''}`}>
            <Nav isFooter={false}/>
            <LoginBtn withText onLoginCLick={handleModalOpen} />
          </div>
        </nav>
      </div>

      <Modal
        isOpen={isModalOpened}
        onRequestClose={handleModalClose}
        className={styles.modal__container}
        overlayClassName={styles.modal}
      >
        <ModalLogin onClose={handleModalClose} onFormSubmit={handleFormSubmit} />
      </Modal>
    </header>
  );
}
