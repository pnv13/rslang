import React, { useEffect } from 'react';
import { getAllGames } from '../../services/utils';
import Game from './Game';
import style from './MiniGames.module.css';

interface IMiniGamesProps {
  difficultLvl: string;
  setDifficultLvl: React.Dispatch<React.SetStateAction<string>>;
}

const MiniGames: React.FC<IMiniGamesProps> = ({ difficultLvl, setDifficultLvl }) => {
  const games = getAllGames();

  const isLvlSelected = (val: string) => difficultLvl === val;

  const changeDifficult = (e: React.ChangeEvent<HTMLInputElement>): void => setDifficultLvl(e.target.value);

  useEffect(() => {
    localStorage.removeItem('gamesParams');
  }, []);

  return (
    <div className={`flex flex-col justify-evenly ${style.container}`}>
      <div className='flex flex-col items-center'>
        <div className='text-2xl pb-5'>Выберите уровень сложности</div>
        <div className='flex gap-x-3'>
          <label className='flex justify-center items-center' htmlFor="A1">
            <input className='appearance-none peer' type='radio' name='difficult' value='0' id='A1' onChange={changeDifficult} checked={isLvlSelected('0')} />
            <div className='flex justify-center items-center p-1 w-16 h-16 text-4xl border-4 rounded-lg border-main-white hover:border-main-orange cursor-pointer bg-blue-200 ease-in duration-300 peer-checked:border-neutral-600'>A1</div>
          </label>
          <label className='flex justify-center items-center' htmlFor="A2">
            <input className='appearance-none peer' type='radio' name='difficult' value='1' id='A2' onChange={changeDifficult} checked={isLvlSelected('1')} />
            <div className='flex justify-center items-center p-1 w-16 h-16 text-4xl border-4 rounded-lg border-main-white hover:border-main-orange cursor-pointer bg-blue-400 ease-in duration-300 peer-checked:border-neutral-600'>A2</div>
          </label>
          <label className='flex justify-center items-center' htmlFor="B1">
            <input className='appearance-none peer' type='radio' name='difficult' value='2' id='B1' onChange={changeDifficult} checked={isLvlSelected('2')} />
            <div className='flex justify-center items-center p-1 w-16 h-16 text-4xl border-4 rounded-lg border-main-white hover:border-main-orange cursor-pointer bg-violet-400 ease-in duration-300 peer-checked:border-neutral-600'>B1</div>
          </label>
          <label className='flex justify-center items-center' htmlFor="B2">
            <input className='appearance-none peer' type='radio' name='difficult' value='3' id='B2' onChange={changeDifficult} checked={isLvlSelected('3')} />
            <div className='flex justify-center items-center p-1 w-16 h-16 text-4xl border-4 rounded-lg border-main-white hover:border-main-orange cursor-pointer bg-violet-600 ease-in duration-300 peer-checked:border-neutral-600'>B2</div>
          </label>
          <label className='flex justify-center items-center' htmlFor="C1">
            <input className='appearance-none peer' type='radio' name='difficult' value='4' id='C1' onChange={changeDifficult} checked={isLvlSelected('4')} />
            <div className='flex justify-center items-center p-1 w-16 h-16 text-4xl border-4 rounded-lg border-main-white hover:border-main-orange cursor-pointer bg-rose-300 ease-in duration-300 peer-checked:border-neutral-600'>C1</div>
          </label>
          <label className='flex justify-center items-center' htmlFor="C2">
            <input className='appearance-none peer' type='radio' name='difficult' value='5' id='C2' onChange={changeDifficult} checked={isLvlSelected('5')} />
            <div className='flex justify-center items-center p-1 w-16 h-16 text-4xl border-4 rounded-lg border-main-white hover:border-main-orange cursor-pointer bg-rose-400 ease-in duration-300 peer-checked:border-neutral-600'>C2</div>
          </label>
        </div>
      </div>
      <div className='flex justify-around'>
        {games.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default MiniGames;
