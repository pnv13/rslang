import React from 'react';
import style from './AboutUs.module.css';
import Gena from '../../assets/Gena.jpg';
import Ivan from '../../assets/Ivan.jpg';
import Lena from '../../assets/Lena.jpg';
import GitHub from '../../assets/GitHub.png';

const AboutUs: React.FC = () => (
  <div className={style.container}>
    <div className={style.developer}>
      <img src={Ivan} alt="img" className={style.img} />
      <h3 className={style.name}>Иван <br /> Пахотных</h3>
      <p className={style.text}>Team-lead</p>
      <span className={style.text}>Настроил API, Авторизация, Страница игр, игра Аудиовызов, запуск игр со страниц учебника.</span>
      <a href="https://github.com/pnv13" className={style.github}>
        <img src={GitHub} className={style.git__img} alt="img" />
      </a>
    </div>
    <div className={style.developer}>
      <img src={Gena} alt="img" className={style.img} />
      <h3 className={style.name}>Геннадий Винокуров</h3>
      <p className={style.text}>Developer</p>
      <span className={style.text}>Базовая структура проекта(Header, Main, Footer, adaptive/responsive), Главная страница, Стилизация игр, Вывод результатов игр, Страница О Команде, игра Спринт.</span>
      <a href="https://github.com/GenaVinokurov" className={style.github}>
        <img src={GitHub} className={style.git__img} alt="img" />
      </a>
    </div>
    <div className={style.developer}>
      <img src={Lena} alt="img" className={style.img} />
      <h3 className={style.name}>Елена <br /> Самойлова</h3>
      <p className={style.text}>Developer</p>
      <span className={style.text}>Электронный учебник, страница статистики.</span>
      <a href="https://github.com/Helen-JS" className={style.github}>
        <img src={GitHub} className={style.git__img} alt="img" />
      </a>
    </div>
  </div>
);

export default AboutUs;