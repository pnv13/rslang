import React, { useEffect, useState, FC, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import style from './Card.module.css';
import { getWordsAPI } from '../../services/dataAPI';
import { IWord, IRouteProps } from '../../services/types';
import CardPlayer from '../../pages/textbook/CardPlayer/CardPlayer';

const Card: FC<IRouteProps> = ({ cardGroupId, groupPage, level }) => {
  const [cards, setCards] = useState<IWord[]>([]);
  const [pageParams, setPageParams] = useState<Array<number>>([cardGroupId, groupPage]);
  const [cardsIsLoaded, setCardsIsLoaded] = useState(false);

  const getCardsAssign = (group: number, page: number) => {
    getWordsAPI(group, page).then((result) => {
      setCards(result);
      setCardsIsLoaded(true);
    });
  };

  const paramsForGames = () => {
    localStorage.setItem('gamesParams', JSON.stringify(pageParams));
  };

  const savePage = useCallback(() => {
    localStorage.setItem('textBookParams', JSON.stringify(pageParams));
  }, [pageParams]);

  const loadPage = () => {
    const page = localStorage.getItem('textBookParams');
    if (page) setPageParams(JSON.parse(page));
  };

  useEffect(() => {
    getCardsAssign(pageParams[0], pageParams[1]);
    window.addEventListener('beforeunload', savePage);
    window.addEventListener('load', loadPage);
    paramsForGames();
    return () => {
      window.removeEventListener('beforeunload', savePage);
      window.removeEventListener('load', loadPage);
    };
  }, [level, pageParams, savePage]);

  const HandlerPageClick = (event: any) => {
    setPageParams([pageParams[0], event.selected]);
  };

  if (!cardsIsLoaded) return <div className='flex justify-center text-2xl'>Загрузка...</div>;

  return (
    <>
      <div className={style.cards}>
        {cards.map((item) => (
          <div className={`${style.container} card-container-${level}`} key={item.id}>
            <div className={style.games_links}>
              <div className={`${style.game_link} ${style.audioGame_link}`}>
                <Link to='/games/audio-game' className='block rounded-full w-full h-full' />
                <span className={style.tooltip}>Начать игру Аудиовызов</span>
              </div>
              <div className={`${style.game_link} ${style.sprintGame_link}`}>
                <Link to='/games/sprint' className='block rounded-full w-full h-full' />
                <span className={style.tooltip}>Начать игру Спринт</span>
              </div>
            </div>
            <div
              className={style.header}
              style={{
                backgroundImage: `url("https://rslang-helen-js.herokuapp.com/${item.image}")`,
              }}>
              <div className={`${style.overlay} card-overlay-${level}`}>
                <div className={style.marks}>
                  <div className={style.mark_difficult}>
                    {'\u2605'}
                    <span className={style.tooltip}>Отметить как сложное</span>
                  </div>
                  <div className={style.mark_difficult}>
                    {'\u2665'}
                    <span className={style.tooltip}>Отметить как изученное</span>
                  </div>
                  <div className={style.mark_difficult}>
                    {'\u259F'}
                    <span className={style.tooltip}>Статистика по слову</span>
                  </div>
                </div>
                <div className={style.word}>
                  <div className={style.primary}>
                    <h3>{item.word}</h3>
                  </div>
                  <div className={style.translate_block}>
                    <span>{item.wordTranslate}</span>
                    <span>{item.transcription}</span>
                    <div>
                      <CardPlayer
                        url='https://rslang-helen-js.herokuapp.com/'
                        audioNameList={[item.audio, item.audioMeaning, item.audioExample]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.content}>
              <div className={style.word_block}>
                <div dangerouslySetInnerHTML={{ __html: item.textMeaning }} />
                <div className={style.word_example}>{item.textMeaningTranslate}</div>
              </div>
              <div className={style.word_block}>
                <div dangerouslySetInnerHTML={{ __html: item.textExample }} />
                <div className={style.word_example}>{item.textExampleTranslate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        forcePage={pageParams[1]}
        previousLabel={'\u00AB'}
        nextLabel={'\u00BB'}
        breakLabel='...'
        pageCount={30}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={HandlerPageClick}
        containerClassName='z-0 relative flex rounded-md shadow-sm -space-x-px justify-center py-10'
        pageLinkClassName='z-10 relative bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
        previousLinkClassName='z-10 relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
        nextLinkClassName='z-10 relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
        breakLinkClassName='z-10 relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'
        activeClassName='z-20 relative bg-indigo-300 border-indigo-500 text-indigo-600 items-center border text-sm font-medium'
      />
    </>
  );
};

export default Card;
