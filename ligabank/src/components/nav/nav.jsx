import React from 'react';
import styles from './menu.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';

const NavLinks = [
  {
    text: 'Услуги',
    route: AppRoute.SERVICES,
  },
  {
    text: 'Рассчитать кредит',
    route: AppRoute.CREDIT_CALCULATOR,
  },
  {
    text: 'Конвертер валют',
    route: AppRoute.CONVERTER,
  },
  {
    text: 'Контакты',
    route: AppRoute.CONTACTS,
  },
  {
    text: 'Задать вопрос',
    route: AppRoute.QNA,
  },
];

export default function Nav({isFooter = false}) {
  return (
    <ul className={`${styles.list} ${isFooter ? '' : styles.upper}`}>
      {
        NavLinks.map(({text, route}) => (
          <li key={text} className={`${styles.list__item} ${isFooter ? styles.list__item_footer : ''}`}>
            <NavLink
              exact
              to={route}
              className={styles.link}
              activeClassName={`${styles.active} ${isFooter ? 'visually-hidden' : ''}`}
            >
              {text}
            </NavLink>
          </li>
        ))
      }
    </ul>
  );
}

Nav.propTypes = {
  isFooter: PropTypes.bool.isRequired,
};
