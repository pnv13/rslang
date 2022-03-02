import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/popup/UserContext';
import { setUserStatistic } from '../../services/dataAPI';
import { IResultPopup } from '../../services/types';
import style from './MiniGames.module.css';

const ResultPopup: React.FC<IResultPopup> = ({ resultArray, words, score, game }) => {
  const [audio] = useState(new Audio());
  const { user } = useContext(UserContext);
  const learnedWords = resultArray.filter((el) => el === true).length;
  let session = 0;
  let mainSession = 0;
  const onClick = (url: string) => {
    audio.src = `https://react-rslang-project.herokuapp.com/${url}`;
    audio.play();
  };
  resultArray.forEach((res, i) => {
    if (res === true && resultArray[i - 1] === true) {
      session += 1;
      if (mainSession < session) {
        mainSession = session;
      }
    } else if (session >= mainSession) {
      mainSession = session;
      session = 0;
    } else session = 0;
  });
  if (mainSession !== 0) {
    mainSession += 1;
  }
  const statistic = () => ({
    date: new Date(),
    percentCorrect: Math.floor((learnedWords / 20) * 100),
    game: game,
    session: mainSession,
  });
  useEffect(() => {
    if (user) setUserStatistic(user.id, learnedWords, statistic());
  }, []);

  return (
    <div className={style.popup__shadow}>
      <div className={style.popup}>
        <Link to='/games' className={style.close} />
        {score !== null && <h3 className={style.title}>Ваш результат: {score}</h3>}
        <div className={style.result__container}>
          {resultArray.map((res, i) => (
            <div className={style.result} key={`${Date.now() + i}`}>
              <div>{res === false ? '\u274c' : '\u2705'}</div>
              <div className={style.word}>{words[i].word}</div>
              <div className={style.word}>{words[i].transcription}</div>
              <div className={style.word}>{words[i].wordTranslateRight}</div>
              <button type='button' onClick={() => onClick(words[i].audio)}>
                {'\u25B6'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
