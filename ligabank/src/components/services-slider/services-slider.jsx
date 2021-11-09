import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import styles from './services-slider.module.scss';
import ServicesItem from '../services-item/services-item';

const SERVICES = [
  {
    id: 0,
    tabName: 'Вклады',
    title: 'Вклады Лига Банка – это выгодная инвестиция в свое будущее',
    advantages: [
      'Проценты по вкладам до 7%',
      'Разнообразные условия',
      'Возможность ежемесячной капитализации или вывод процентов на банковскую карту'
    ],
    linkTo: '#'
  },{
    id: 1,
    tabName: 'Кредиты',
    title: 'Лига Банк выдает кредиты под\u00A0любые\u00A0цели',
    advantages: [
      'Ипотечный кредит',
      'Автокредит',
      'Потребительский кредит'
    ],
    additionalText: 'Рассчитайте ежемесячный платеж и ставку по кредиту воспользовавшись нашим кредитным калькулятором'
  },{
    id: 2,
    tabName: 'Страхование',
    title: 'Лига Страхование — застрахуем все\u00A0что\u00A0захотите',
    advantages: [
      'Автомобильное страхование',
      'Страхование жизни и здоровья',
      'Страхование недвижимости'
    ],
    linkTo: '#'
  },{
    id: 3,
    tabName: 'Онлайн-сервисы',
    title: 'Лига Банк — это огромное количество онлайн-сервисов для вашего удобства',
    advantages: [
      'Мобильный банк, который\u00A0всегда под рукой',
      'Приложение Лига-проездной позволит вам оплачивать билеты по всему миру'
    ],
    linkTo: '#'
  }
];

const PaginationSettings = {
  'bulletActiveClass': styles.pag__active,
  'bulletClass': `swiper-pagination-bullet ${styles.pag}`,
};

SwiperCore.use([Pagination]);

export default function ServicesSlider() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const swiperRef = useRef();

  const handleTabClick = (id) => {
    setActiveSlideIndex(id);
    swiperRef.current?.swiper.slideTo(id);
  };

  return(
    <section className={styles.services}>
      <nav className={styles.tabs}>
        <ul className={styles.tab_list}>
          {SERVICES.map((service) => (
            <li
              key={service.id}
              id={service.id}
              tabIndex={0}
              className={`${styles.service_tab} ${activeSlideIndex === service.id ? styles.service_tab__active : ''}`}
              onClick={() => handleTabClick(service.id)}
            >
              <p className={styles.tab_name}>{service.tabName}</p>
            </li>
          ))}
        </ul>
      </nav>

      <Swiper
        className={styles.services_slider}
        pagination={PaginationSettings}
        ref={swiperRef}
        breakpoints={
          {
            1024: {
              pagination: false,
              allowTouchMove: false,
            }
          }
        }
      >
        {SERVICES.map((service) => (
          <SwiperSlide
            key={service.id}
            className={styles.service_slide}
          >
            <ServicesItem item={service} />
            <div className={styles.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
