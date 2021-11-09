import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './services-item.module.scss';

const UNDERLINED_SYMBOLS = -23;
const SHORTER_LIST_ID = 4;

export default function ServicesItem({item}) {
  const {
    id,
    title,
    advantages,
    additionalText,
    linkTo,
  } = item;

  return(
    <>
      <p className={`${styles.title} ${id%2 === 0 ? styles.title__short : ''}`}>{title}</p>
      <ul className={`${styles.advantages} ${id === SHORTER_LIST_ID ? styles.advantages__short : ''}`}>
        {advantages.map((check) => (
          <li key={check} className={`${styles.item}`}>{check}</li>
        ))}
      </ul>
      {additionalText &&
        <p className={styles.info}>
          {additionalText.slice(0, UNDERLINED_SYMBOLS)}
          <span className={styles.info__underlined}>{additionalText.slice(UNDERLINED_SYMBOLS)}</span>
        </p>}
      {linkTo &&
        <NavLink
          exact
          to={linkTo}
          className={styles.link}
        >
          Узнать подробнее
        </NavLink>}
    </>
  );
}
