import React from 'react';
import styles from './nav.module.scss';
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
  const navList = isFooter ? NavLinks : NavLinks.slice(0, -1);

  return (
    <ul className={`${styles.list} ${isFooter ? styles.list__footer : ''}`}>
      {
        navList.map(({text, route}) => (
          <li key={text} className={`${styles.list__item} ${isFooter ? styles.list__item_footer : ''}`}>
            <NavLink
              exact
              to={route}
              className={`${styles.link} ${isFooter ? styles.link__footer : ''}`}
              activeClassName={`${styles.active} ${isFooter ? styles.link__hidden : ''}`}
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
