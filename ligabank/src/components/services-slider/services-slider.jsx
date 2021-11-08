import React from 'react';
// Slider imports
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import styles from './services-slider.module.scss';
// Icons  imports
import depositIcon from '../../img/svg/tabs/vault.svg';
import creditIcon from '../../img/svg/tabs/cards.svg';
import insuranceIcon from '../../img/svg/tabs/security.svg';
import onlineIcon from '../../img/svg/tabs/phone.svg';
import ServicesItem from '../services-item/services-item';

const SERVICES = [
  {
    id: 1,
    tabName: 'Вклады',
    tabIcon: depositIcon,
    title: 'Вклады Лига Банка – это выгодная инвестиция в свое будущее',
    advantages: [
      'Проценты по вкладам до 7%',
      'Разнообразные условия',
      'Возможность ежемесячной капитализации или вывод процентов на банковскую карту'
    ],
    linkTo: '#'
  },{
    id: 2,
    tabName: 'Кредиты',
    tabIcon: creditIcon,
    title: 'Лига Банк выдает кредиты под\u00A0любые\u00A0цели',
    advantages: [
      'Ипотечный кредит',
      'Автокредит',
      'Потребительский кредит'
    ],
    additionalText: 'Рассчитайте ежемесячный платеж и ставку по кредиту воспользовавшись нашим кредитным калькулятором'
  },{
    id: 3,
    tabName: 'Страхование',
    tabIcon: insuranceIcon,
    title: 'Лига Страхование — застрахуем все что захотите',
    advantages: [
      'Автомобильное страхование',
      'Страхование жизни и здоровья',
      'Страхование недвижимости'
    ],
    linkTo: '#'
  },{
    id: 4,
    tabName: 'Онлайн-сервисы',
    tabIcon: onlineIcon,
    title: 'Лига Банк — это огромное количество онлайн-сервисов для вашего удобства',
    advantages: [
      'Мобильный банк, который всегда под рукой',
      'Приложение Лига-проездной позволит вам оплачивать билеты по всему миру'
    ],
    linkTo: '#'
  }
];

const PaginationSettings = {
  'bulletActiveClass': styles.pag__active,
  'bulletClass': `swiper-pagination-bullet ${styles.pag}`,
  'horizontalClass': 'hor-pag'
};

SwiperCore.use([Pagination]);

export default function ServicesSlider() {
  return(
    <>
      <nav className={styles.tabs}>
        <ul className={styles.tabList}>
          {SERVICES.map((service) => (
            <li className={styles.serviceTab}>
              {service.tabIcon}
              <p className={styles.tab_name}>{service.tabName}</p>
            </li>
          ))}
        </ul>
      </nav>

      <Swiper
        className={styles.services_slider}
        centeredSlides={true}
        pagination={PaginationSettings}
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
    </>
  );
}
