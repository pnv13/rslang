import React, { useMemo, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Header from './components/header/Header';
import BurgerMenu from './components/burgerMenu/BurgerMenu';
import Textbook from './pages/textbook/Textbook';
import Popup from './components/popup/Popup';
import AboutUs from './pages/aboutUs/AboutUs';
import MiniGames from './pages/games/MiniGames';
import SprintGame from './pages/games/sprint/SprintGame';
import AudioGame from './pages/games/audioGame/AudioGame';
import Layout from './components/Layout';
import GameLayout from './pages/games/GameLayout';
import Card from './components/card/Card';
import Statistic from './pages/statistic/Statistic';
import Difficult from './pages/textbook/Difficult';
import { IUser } from './services/types';
import { UserContext } from './components/popup/UserContext';

const App: React.FC = () => {
  const [burgerMenuActive, setBurgerMenu] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [whatPopup, setWhatPopup] = useState('login');
  const [difficultLvl, setDifficultLvl] = useState('0');
  const [user, setUser] = useState<IUser | null>(null);

  const userValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={userValue}>
      <>
        <Header active={burgerMenuActive} setActive={setBurgerMenu} onSignInOpen={setPopupActive} />
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='textbook' element={<Textbook />} />
            <Route
              path='textbook/level1'
              element={<Card cardGroupId={0} groupPage={0} level='level1' />}
            />
            <Route
              path='textbook/level2'
              element={<Card cardGroupId={1} groupPage={0} level='level2' />}
            />
            <Route
              path='textbook/level3'
              element={<Card cardGroupId={2} groupPage={0} level='level3' />}
            />
            <Route
              path='textbook/level4'
              element={<Card cardGroupId={3} groupPage={0} level='level4' />}
            />
            <Route
              path='textbook/level5'
              element={<Card cardGroupId={4} groupPage={0} level='level5' />}
            />
            <Route
              path='textbook/level6'
              element={<Card cardGroupId={5} groupPage={0} level='level6' />}
            />
            <Route path='textbook/difficult' element={<Difficult />} />
            <Route path='aboutUs' element={<AboutUs />} />
            <Route
              path='games'
              element={<MiniGames difficultLvl={difficultLvl} setDifficultLvl={setDifficultLvl} />}
            />
            <Route path='statistic' element={<Statistic />} />
          </Route>
          <Route path='/' element={<GameLayout />}>
            <Route path='games/audio-game' element={<AudioGame difficultLvl={difficultLvl} />} />
            <Route path='games/sprint' element={<SprintGame difficultLvl={difficultLvl} />} />
          </Route>
        </Routes>
        <BurgerMenu active={burgerMenuActive} setActive={setBurgerMenu} />
        <Popup
          active={popupActive}
          setActive={setPopupActive}
          popup={whatPopup}
          setPopup={setWhatPopup}
        />
      </>
    </UserContext.Provider>
  );
};

export default App;
