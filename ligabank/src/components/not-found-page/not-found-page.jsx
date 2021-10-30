import React from 'react';
import styles from './not-found-page.module.scss';
import Header from '../header/header';
import Footer from '../footer/footer';

export default function NotFoundPage() {
  return (
    <>
      <Header/>
      <h1 className={styles.title}>Приносим извинения! Страница находится в разработке.</h1>
      <Footer/>
    </>
  );
}
