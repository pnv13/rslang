import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { UserContext } from '../popup/UserContext';
import style from './Header.module.css';

interface IHeaderProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  onSignInOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<IHeaderProps> = ({ setActive, active, onSignInOpen }) => {
  const { user, setUser } = useContext(UserContext);

  const logOut = () => {
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <header className={style.container}>
      <div className={style.wrapper}>
        <Link to='/'>
          <h1 className={style.title}>RSLang</h1>
        </Link>
      </div>
      <div className={style.wrapper}>
        {user ? (
          <div className='flex items-center gap-x-5'>
            <div className='font-semibold'>
              <div className='flex'>
                <p className='pr-3'>Имя:</p>
                <p className='text-main-orange'>{user.name}</p>
              </div>
              <div className='flex'>
                <p className='pr-3'>Почта:</p>
                <p className='text-main-orange'>{user.email}</p>
              </div>
            </div>
            <button type='button' onClick={logOut}>
              <i className='fa-solid fa-arrow-right-from-bracket text-2xl cursor-pointer hover:text-main-orange ease-in duration-300' />
            </button>
          </div>
        ) : (
          <div className='flex items-center relative'>
            <i
              className={`fa-solid fa-circle-exclamation flex items-center flex-row-reverse text-2xl pr-3 cursor-pointer ${style.note}`}>
              <span className={`text-sm w-56 absolute top-16 z-10 ${style.tooltip}`}>
                Без авторизации не доступен весь функционал приложения.
              </span>
            </i>
            <Button classExtra='btn' onClick={() => onSignInOpen(true)}>
              Войти
            </Button>
          </div>
        )}
        <button type='button' className={style.burger} onClick={() => setActive(!active)}>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
