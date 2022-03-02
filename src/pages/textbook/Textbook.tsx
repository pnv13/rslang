import React from 'react';
import { Link } from 'react-router-dom';
import style from './textbook.module.css';

const Textbook: React.FC = () => (
  <div className={style.container}>
    <p className='text-4xl font-semibold text-gray-700 mb-7'>Учебник</p>
    <div className={style.ul__wrapper}>
    <ul className={`${style.ul} text-white`}>
      <li className='bg-blue-200'><Link className={style.link} to='/textbook/level1'><span>A1</span>Beginner</Link></li>
      <li className='bg-blue-400'><Link className={style.link} to='/textbook/level2'><span>A2</span>Elementary</Link></li>
      <li className='bg-violet-400'><Link className={style.link} to='/textbook/level3'><span>B1</span>Intermediate</Link></li>
      <li className='bg-violet-600'><Link className={style.link} to='/textbook/level4'><span>B2</span>Upper<br />Intermediate</Link></li>
    </ul>
    <ul className={`${style.ul} text-white`}>
      <li className='bg-rose-300'><Link className={style.link} to='/textbook/level5'><span>C1</span>Advanced</Link></li>
      <li className='bg-rose-400'><Link className={style.link} to='/textbook/level6'><span>C2</span>Proficiency</Link></li>
    </ul>
    <ul className={`${style.ul} ${style.ul__difficult} text-white`}>
      <li className='bg-amber-400 pl-7'><Link className={style.link} to='/textbook/difficult'>Сложные слова</Link></li>
    </ul>
    </div>
  </div>
);

export default Textbook;
