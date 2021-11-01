import React from 'react';
import {Link} from 'react-router-dom';
import styles from './banner.module.scss';
import cardsWebp from '../../img/cards.webp';
import cardsWebp2x from '../../img/cards.webp';
import cardsPng from '../../img/cards.png';
import cardsPng2x from '../../img/cards@2x.png';
import {AppRoute} from '../../const';

export default function Banner() {
  return(
    <section className={styles.banner}>
      <div className={styles.bannerWrapper}>
        <div className={styles.content}>
          <section className={styles.textBlock}>
            <h2 className={styles.title}>Лига Банк</h2>
            <p className={styles.subtitle}>Кредиты на любой случай</p>
            <Link
              className={styles.creditLink}
              to={AppRoute.CREDIT_CALCULATOR}>Рассчитать кредит</Link>
          </section>
          <section className={styles.imageBlock}>
            <picture className={styles.cards}>
              <source
               type='image/webp'
               srcSet={`${cardsWebp} 1x, ${cardsWebp2x} 2x`}
              />
              <img
                src={cardsPng}
                srcSet={`${cardsPng2x} 2x`} alt='Кредитные карты Лига-банка'
                width='444'
                height='286'
              />
            </picture>
          </section>
        </div>
      </div>
    </section>
  );
}
