import React, { useEffect } from 'react';
import style from './Popup.module.css';
import Login from './Login';
import SignUp from './SignUp';

interface IPopup {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  popup: string;
  setPopup: React.Dispatch<React.SetStateAction<string>>;
}

const Popup: React.FC<IPopup> = ({ active, setActive, popup, setPopup }) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActive(false);
    }
  };
  useEffect(() => {
    if (popup === 'signUp' && !active) setPopup('login');
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div
      className={!active ? style.container : `${style.container} ${style.activeContainer}`}
      onClick={() => setActive(false)}
      onKeyDown={() => handleKeyDown}
      role='textbox'
      tabIndex={0}>
      <div
        className={!active ? style.content : `${style.content} ${style.activeContent}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={() => handleKeyDown}
        role='textbox'
        tabIndex={0}>
        <div className='w-full flex justify-end'>
          <i
            className='fas fa-times text-2xl cursor-pointer hover:text-main-orange flex items-center justify-center leading-4'
            onClick={() => setActive(false)}
            role='button'
            onKeyDown={() => handleKeyDown}
            tabIndex={0}
            aria-label='Close Popup'
          />
        </div>
        {popup === 'login' ? <Login setWhatPopup={setPopup} /> : <SignUp />}
      </div>
    </div>
  );
};

export default Popup;
