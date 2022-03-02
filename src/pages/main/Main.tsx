import React from 'react';
import style from './main.module.css';
import Button from '../../components/button/Button';
import Nav from '../../components/nav/Nav';

const Main: React.FC = () => (
  <div className={style.container}>
    <div className={style.text__wrapper}>
      <p className={`${style.text} text-main-orange`}>RSLang
        <span className='text-black'>это коллекция наиболее популярных английский слов.
          Мини-игры сделают процесс обучения легким и интересным,<br /> а статистика покажет Ваш прогресс.
        </span>
      </p>
    </div>
    <Button classExtra={style.btn}>О приложении</Button>
    <Nav />
  </div>
);

export default Main;