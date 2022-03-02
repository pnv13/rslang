import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import style from './MiniGames.module.css';

const GameLayout: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <main className={`container ${style.game}`}>
      <header className='pt-6 pb-6'>
        <button
          type='button'
          className={`${style.link} hover:text-orange-400 ease-in duration-300`}
          onClick={goBack}>
          Назад
        </button>
      </header>
      <Outlet />
    </main>
  );
};

export default GameLayout;
