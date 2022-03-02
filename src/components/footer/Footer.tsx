import React from 'react';
import style from './Footer.module.css';

const Footer = () => (
  <footer className={`${style.container} bg-main-orange`}>
    <div className={style.wrapper}>
      <a href='https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-2/rs-lang/rslang.md' className={style.task} target='_blank' rel="noreferrer">2022 RSLang</a>
      <ul className={style.developers}>
        <li><a href='https://github.com/Helen-JS' target='_blank' rel="noreferrer">Helen-JS</a></li>
        <li><a href='https://github.com/GenaVinokurov' target='_blank' rel="noreferrer">GenaVinokurov</a></li>
        <li><a href='https://github.com/pnv13' target='_blank' rel="noreferrer">pnv13</a></li>
      </ul>
      <a href='https://rs.school/' className={style.school__logo} target='_blank' rel="noreferrer">
        <div className={style.img} />
      </a>
    </div>
  </footer>
);

export default Footer;