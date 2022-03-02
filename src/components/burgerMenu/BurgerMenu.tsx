import React from 'react';
import { Link } from 'react-router-dom';
import style from './burgerMenu.module.css';

interface IBurgerMenu {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerMenu: React.FC<IBurgerMenu> = ({ active, setActive }) => {
  const eventKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActive(false);
    }
  }
  return (
    <div
      className={active ? `${style.menu__container} ${style.active}` : `${style.menu__container}`}
      onClick={() => setActive(false)}
      onKeyDown={() => eventKeyDown}
      role='menu'
      tabIndex={0}>
      <div
        className={`${style.menu__content} bg-main-orange`}
        onClick={e => e.stopPropagation()}
        onKeyDown={() => eventKeyDown}
        role='menu'
        tabIndex={0}>
        <ul
          className={style.ul}
          onClick={() => setActive(false)}
          onKeyDown={() => eventKeyDown}
          role='menu'
          tabIndex={0}>
          <li><Link className={style.link__menu} to='/'>Главная</Link></li>
          <li><Link className={style.link__menu} to='/aboutUs'>О Команде</Link></li>
          <li><Link className={style.link__menu} to='/textbook'>Учебник</Link></li>
          <li><Link className={style.link__menu} to='/games'>Мини-игры</Link></li>
          <li><Link className={style.link__menu} to='/statistic'>Статистика</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
