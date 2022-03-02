import React from 'react';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';

const Nav = () => (
  <nav>
    <ul className={style.ul}>
      <li><Link to='/textbook' className={style.link}>Учебник</Link></li>
      <li><Link to='/games' className={style.link}>Мини-игры</Link></li>
      <li><Link to='/statistic' className={style.link}>Статистика</Link></li>
    </ul>
  </nav>
);

export default Nav;
