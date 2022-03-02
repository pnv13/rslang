import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getWordsAPI } from '../../../services/dataAPI';
import { IGameProps, IWord, IQuestions } from '../../../services/types';
import { getRandomPage, getThreeRandomNumbers } from '../../../services/utils';
import style from './AudioGame.module.css';
import trueAnswer from '../../../assets/sounds/yes.mp3';
import falseAnswer from '../../../assets/sounds/no.mp3';
import ResultPopup from '../ResultPopup';
import { changeQuestions } from '../sprint/SprintGameUtils';

const AudioGame: React.FC<IGameProps> = ({ difficultLvl }) => {
  const [words, setWords] = useState<Array<IWord>>([]);
  const [wordsResult, setWordsResult] = useState<Array<IQuestions>>([]);
  const [wordsIsLoaded, setWordsIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [wordNumber, setWordNumber] = useState<number>(0);
  const [musicIsPlay, setMusicIsPlay] = useState<boolean>(false);
  const [audio] = useState(new Audio());
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [lastWord, setLastWord] = useState<HTMLButtonElement | null>(null);
  const [resultArray, setResultArray] = useState<boolean[]>([]);

  const playSound = () => {
    if (!musicIsPlay) {
      audio.src = `https://react-rslang-project.herokuapp.com/${words[wordNumber].audio}`;
      audio.play();
      setMusicIsPlay(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement> | KeyboardEvent) => {
    if (e.key === '1') {
      document.getElementById('btn-0')?.click();
    }
    if (e.key === '2') {
      document.getElementById('btn-1')?.click();
    }
    if (e.key === '3') {
      document.getElementById('btn-2')?.click();
    }
    if (e.key === '4') {
      document.getElementById('btn-3')?.click();
    }
    if (e.code === 'Space') {
      document.getElementById('btn-4')?.click();
    }
    if (e.code === 'KeyR') {
      document.getElementById('btn-5')?.click();
    }
  };

  const answers = useMemo(() => getThreeRandomNumbers(wordNumber), [wordNumber]);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target.value === words[wordNumber].wordTranslate) {
      audio.src = trueAnswer;
      target.style.color = 'green';
      setResultArray([...resultArray, true]);
    } else {
      audio.src = falseAnswer;
      target.style.color = 'red';
      setResultArray([...resultArray, false]);
    }
    audio.play();
    setLastWord(target);
    setIsAnswered(true);
  };

  const nextWord = () => {
    if (wordNumber < words.length - 1) {
      setWordNumber(wordNumber + 1);
      if (!isAnswered) setResultArray([...resultArray, false]);
    }
    if (wordNumber === 19 && !isAnswered) setResultArray([...resultArray, false]);
    if (lastWord) lastWord.style.color = 'black';
    setIsAnswered(false);
  };

  const getWords = useCallback(() => {
    const randomPage = getRandomPage();
    let wordsParams;
    const textBookParams = localStorage.getItem('gamesParams');
    if (textBookParams) {
      wordsParams = JSON.parse(textBookParams);
    } else {
      wordsParams = [+difficultLvl, randomPage];
    }
    getWordsAPI(wordsParams[0], wordsParams[1]).then(
      (res) => {
        setWords(res);
        setWordsIsLoaded(true);
        setWordsResult(changeQuestions(res));
      },
      (e: string) => {
        setError(e);
        setWordsIsLoaded(true);
      },
    );
  }, [difficultLvl]);

  useEffect(() => {
    getWords();
    audio.addEventListener('ended', () => {
      setMusicIsPlay(false);
    });
    document.addEventListener('keydown', (e) => handleKeyDown(e));
    return () => {
      audio.removeEventListener('ended', () => {
        setMusicIsPlay(false);
      });
      document.removeEventListener('keydown', (e) => handleKeyDown(e));
    };
  }, [audio, getWords]);

  if (error) return <div>{error}</div>;
  if (!wordsIsLoaded) return <div>Загрузка...</div>;

  return (
    <main className={`${style.container} p-3 flex flex-col items-center justify-evenly gap-y-5`}>
      {resultArray.length === 20 && (
        <ResultPopup resultArray={resultArray} words={wordsResult} score={null} game='Аудиовызов' />
      )}
      <div className={style.game__wrapper}>
        <div className='flex w-full flex-row-reverse relative'>
          <i
            className={`fa-solid fa-circle-exclamation flex items-center justify-center text-2xl cursor-pointer ${style.note}`}>
            <span className={`flex text-xs absolute -top-20 z-10 ${style.tooltip}`}>
              <div className='flex flex-col pr-3'>
                <span>R - произнести слово</span>
                <span>1 - первый вариант ответа</span>
              </div>
              <div className='flex flex-col pr-3'>
                <span>2 - второй вариант ответа</span>
                <span>3 - третий вариант ответа</span>
              </div>
              <div className='flex flex-col pr-3'>
                <span>4 - четвёртый вариант ответа</span>
                <span>Space - дальше / пропустить</span>
              </div>
            </span>
          </i>
        </div>
        <div className='flex flex-col items-center mb-10'>
          <div
            style={
              isAnswered
                ? {
                    backgroundImage: `url("https://rss-words-3.herokuapp.com/${words[wordNumber].image}")`,
                  }
                : {
                    backgroundImage: 'none',
                  }
            }
            className='flex items-center justify-center relative w-52 h-52 border-slate-700 bg-white hover:bg-orange-400 ease-in duration-300 rounded-full bg-center bg-cover bg-no-repeat'>
            <button
              className={style.btn__audio}
              disabled={musicIsPlay}
              type='button'
              id='btn-5'
              onClick={playSound}>
              {' '}
            </button>
            <audio
              src={`https://react-rslang-project.herokuapp.com/${words[wordNumber].audio}`}
              autoPlay>
              <track kind='captions' />
            </audio>
            <i
              className={`${
                isAnswered ? 'opacity-0 pointer-events-none' : 'opacity-100'
              } fa-solid fa-podcast text-6xl flex items-center justify-center text-blue-500 leading-4 ease-in duration-300`}
            />
          </div>
          <div
            className={`${
              isAnswered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } text-xl pt-5`}>
            {words[wordNumber].word} {words[wordNumber].transcription}{' '}
            {words[wordNumber].wordTranslate}
          </div>
        </div>
        <ul className={style.list}>
          {answers.map((wordIndex, index) => (
            <li key={words[wordIndex].id}>
              <button
                id={`btn-${index}`}
                disabled={isAnswered}
                type='button'
                value={words[wordIndex].wordTranslate}
                className='border-2 border-black p-2 cursor-pointer text-m hover:text-main-orange ease-in duration-300 hover:bg-main-white rounded-md'
                onKeyDown={handleKeyDown}
                onClick={checkAnswer}>
                {words[wordIndex].wordTranslate}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button id='btn-4' type='button' className={style.btn} onClick={nextWord}>
        {isAnswered ? 'дальше' : 'пропустить'}
      </button>
    </main>
  );
};

export default AudioGame;
