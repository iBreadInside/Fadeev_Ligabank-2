import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import styles from './slider.module.scss';
import SlideItem from '../slide-item/slide-item';
import SwiperCore, { Autoplay, Pagination } from 'swiper';

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

const PaginationSettings = {
  'clickable': true,
  'bulletActiveClass': styles.pag__active,
  'bulletClass': `swiper-pagination-bullet ${styles.pag}`,
};

const AutoplaySettings = {
  'delay': TIMING,
  'disableOnInteraction': false,
};

SwiperCore.use([Pagination, Autoplay]);

export default function Slider() {
  return(
    <Swiper
      className={styles.swiper}
      pagination={PaginationSettings}
      // autoplay={AutoplaySettings}
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
