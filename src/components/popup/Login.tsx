import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userLoginAPI } from '../../services/dataAPI';
import { ILoginUser } from '../../services/types';
import { checkUserAuthorization } from '../../services/utils';
import { UserContext } from './UserContext';

interface ILogin {
  setWhatPopup: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<ILogin> = ({ setWhatPopup }) => {
  const [loginIsCorrect, setLoginIsCorrect] = useState(true);
  const [signInIsDisabled, setSignInIsDisabled] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ILoginUser>({
    mode: 'onBlur',
  });

  const updateUser = useCallback(() => {
    checkUserAuthorization().then((checkedUser) => {
      if (JSON.stringify(user) !== JSON.stringify(checkedUser)) {
        setUser(checkedUser);
      }
    });
  }, [setUser, user]);

  useEffect(() => {
    setSignInIsDisabled(false);
    updateUser();
  }, [updateUser, user]);

  const onSubmit: SubmitHandler<ILoginUser> = async (data) => {
    setSignInIsDisabled(true);
    const res = await userLoginAPI(data);
    if (typeof res === 'object') {
      setLoginIsCorrect(true);
      reset();
      localStorage.setItem('userData', JSON.stringify(res));
      updateUser();
    } else {
      setSignInIsDisabled(false);
      setLoginIsCorrect(false);
    }
  };

  return (
    <>
      <p className='text-center text-lg w-9/12 tracking-widest'>
        Войдите в профиль, чтобы получить больше возможностей.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className='w-9/12 h-full flex flex-col'>
        <input
          {...register('email', {
            required: 'Поле обязательно для заполнения!',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'invalid email address',
            },
          })}
          className='p-2 w-full border-2 border-gray-600'
          type='email'
          autoComplete='username'
          placeholder='E-mail'
        />
        <div className='h-7'>
          {errors.email && <p className='h-7 text-red-600'>{errors.email.message}</p>}
        </div>
        <input
          {...register('password', {
            required: 'Поле обязательно для заполнения!',
            minLength: {
              value: 8,
              message: 'Введите больше 8 символов',
            },
          })}
          className='p-2 w-full border-2 border-gray-600'
          type='password'
          autoComplete='current-password'
          placeholder='Пароль'
        />
        <div className='h-7'>
          {errors.password && <p className='h-7 text-red-600'>{errors.password.message}</p>}
        </div>
        <input
          className='p-2 border-2 border-white bg-yellow-400 w-full text-lg font-bold hover:border-gray-600'
          type='submit'
          value='Войти'
          disabled={signInIsDisabled}
        />
        <div className='h-7'>
          {!loginIsCorrect && <p className='h-7 text-red-600'>Wrong email or password</p>}
        </div>
      </form>
      <div className='w-9/12 flex justify-between'>
        <button
          className='hover:text-main-orange'
          type='button'
          onClick={() => setWhatPopup('signUp')}>
          Регистрация
        </button>
        <button className='hover:text-main-orange' type='button' onClick={() => setWhatPopup('signUp')}>
          Забыли пароль?
        </button>
      </div>
    </>
  );
};

export default Login;
