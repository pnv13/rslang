import React from 'react';
import { Link } from 'react-router-dom';
import { IGameDataProps } from '../../services/types';

const Game: React.FC<IGameDataProps> = ({ game }) => {
  const { name, img, description, rout } = game;

  return (
    <div className='p-2 w-2/4 md:w-2/5 lg:w-1/4 flex flex-col items-center gap-y-6 border-2 border-main-white hover:border-main-orange/25 ease-in duration-300 rounded '>
      <Link
        to={rout}
        className='w-24 h-24 bg-cover bg-center bg-no-repeat text-center rounded-full border-2 border-main-white hover:border-main-orange ease-in duration-300'
        style={{ backgroundImage: `url(${img})` }}
      />
      <h3 className='text-xl'>{name}</h3>
      <p className='text-center'>{description}</p>
    </div>
  );
};

export default Game;
