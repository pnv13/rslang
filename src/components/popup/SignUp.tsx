import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userSignUpAPI } from '../../services/dataAPI';
import { ISignUpUser } from '../../services/types';

const SignUp: React.FC = () => {
  const [emailIsCorrect, setEmailIsCorrect] = useState(true);
  const [signUpIsDisabled, setSignUpIsDisabled] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISignUpUser>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ISignUpUser> = async (data) => {
    setSignUpIsDisabled(true);
    const res = await userSignUpAPI(data).catch();
    if (res) {
      setEmailIsCorrect(true);
      reset();
    } else {
      setEmailIsCorrect(false);
    }
    setSignUpIsDisabled(false);
  };

  return (
    <>
      <p className='text-center text-lg w-9/12 tracking-widest'>
        Создайте профиль, чтобы получить больше возможностей.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className='h-full w-9/12 flex flex-col'>
        <input
          {...register('name', {
            required: 'Поле обязательно для заполнения!',
            minLength: {
              value: 3,
              message: 'Введите от 3 до 10 символов',
            },
            maxLength: {
              value: 10,
              message: 'Введите от 3 до 10 символов',
            },
          })}
          className='p-2 w-full border-2 border-gray-600'
          type='text'
          autoComplete='username'
          placeholder='Имя'
        />
        <div className='h-7'>
          {errors.name && <p className='h-7 text-red-600'>{errors.name.message}</p>}
        </div>
        <input
          {...register('email', {
            required: 'Поле обязательно для заполнения!',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'invalid email address',
            },
            maxLength: {
              value: 25,
              message: 'Слишком большое название'
            }
          })}
          className='p-2 w-full border-2 border-gray-600'
          type='email'
          autoComplete='username'
          placeholder='E-mail'
        />
        <div className='h-7'>
          {errors.email && <p className='h-7 text-red-600'>{errors.email.message}</p>}
          {!emailIsCorrect && <p className='h-7 text-red-600'>This email is already taken</p>}
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
          type='submit'
          className='p-2 border-2 border-white bg-yellow-400 w-full text-lg font-bold hover:border-gray-600 cursor-pointer'
          value='Создать аккаунт'
          disabled={signUpIsDisabled}
        />
      </form>
    </>
  );
};

export default SignUp;
