import React from 'react';
import styles from './footer.module.scss';
import Logo from '../logo/logo';
import SocialList from '../social-list/social-list';
import Nav from '../nav/nav';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <section className={styles.info}>
          <Logo />
          <address className={styles.adress}>
            150015, г. Москва, ул. Московская, д. 32
            Генеральная лицензия Банка России №1050
            &copy; Лига Банк, 2019
          </address>
        </section>

        <Nav isFooter />

        <section className={styles.contacts}>
          <div className={`${styles.call} ${styles.mobile}`}>
            <a
              className={styles.tel}
              href='tel:*0904'
              aria-label='Наш мобильный номер'>
                *0904
            </a>
            <p className={styles.text}>Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</p>
          </div>
          <div className={`${styles.call} ${styles.phone}`}>
            <a
              className={styles.tel}
              href='tel:+78001112233'
              aria-label='Наш городской номер'>
                8 800 111 22 33
            </a>
            <p className={styles.text}>Бесплатный для всех городов России</p>
          </div>

          <SocialList />
        </section>
      </div>
    </footer>
  );
}
