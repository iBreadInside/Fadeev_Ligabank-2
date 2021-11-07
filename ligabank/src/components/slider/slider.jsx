import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import './slider.scss';
import styles from './slider.module.scss';
import SlideItem from '../slide-item/slide-item';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

SwiperCore.use([Pagination, Autoplay]);

const TIMING = 4000;

const SlidesInfo = [
  {
    id: 1,
    isWhite: true,
    subtitle: 'Кредиты на любой случай',
    btnText: 'Рассчитать кредит',
  },{
    id: 2,
    subtitle: 'Ваша уверенность в завтрашнем дне',
  },{
    id: 3,
    subtitle: 'Всегда рядом',
    btnText: 'Найти отделение',
  }
];

const pagination = {
  'clickable': true,
  'bulletActiveClass': styles.pag__active,
  'bulletClass': `swiper-pagination-bullet ${styles.pag}`,
};

const autoplay = {
  'delay': TIMING,
  'disableOnInteraction': false,
};

export default function Slider() {
  return(
    <Swiper
      className={styles.swiper}
      pagination={pagination}
      // autoplay={autoplay}
      centeredSlides={true}
    >
      {SlidesInfo.map((item) => (
        <SwiperSlide
          key={item.id}
          className={`${styles.slide} ${item.isWhite ? styles.slide_white : ''}`}
        >
          <SlideItem slide={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
