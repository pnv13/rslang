import { IGetUSer, IUser } from './types';
import { getUserAPI } from './dataAPI';
import audioGame from '../assets/audioGame.webp';
import sprintGame from '../assets/sprintGame.webp';

export const getToken = (): string => {
  const storedToken = localStorage.getItem('userData');
  let token = '';
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken) as IGetUSer;
    token = userData.token as string;
  }
  return token;
};

export const checkUserAuthorization = async (): Promise<IUser | null> => {
  const storedToken = localStorage.getItem('userData');
  let user;
  if (typeof storedToken === 'string') {
    const userData = JSON.parse(storedToken) as IGetUSer;
    user = await getUserAPI(userData.userId);
  } else {
    user = null;
  }
  return user;
};

export const getAllGames = () => [
  {
    id: 0,
    name: 'Аудиовызов',
    img: audioGame,
    description: `После произнесения слова вам предлагается выбрать правильный вариант перевода из
      предлагаемых пяти слов.`,
    rout: '/games/audio-game',
  },
  {
    id: 1,
    name: 'Спринт',
    img: sprintGame,
    description: `За отведённое время вам нужно сделать как можно больше правильных ответов, отвечая верно
    или неверно переведено слово.`,
    rout: '/games/sprint',
  },
];

export const getRandomPage = () => Math.floor(Math.random() * 30);

export const getThreeRandomNumbers = (trueNumber: number): Array<number> => {
  const result = [trueNumber];
  while (result.length < 4) {
    const randomNumber = Math.floor(Math.random() * 20);
    if (!result.includes(randomNumber)) result.push(randomNumber);
  }
  return result.sort(() => Math.random() - 0.5);
};
