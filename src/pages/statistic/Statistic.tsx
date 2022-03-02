import React from "react";
import style from './Statistic.module.css';

const Statistic = () => (
        <div className={style.container}>
            <h2 className='text-4xl font-semibold text-gray-700 mb-7'>Статистика за сегодня</h2>
            <table>
                <thead>
                <tr>
                    <th className={style.row_name}>Игра</th>
                    <th>Изучено слов</th>
                    <th>Правильно (%)</th>
                    <th>Самая длинная серия</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={style.row_name}>Аудиовызов</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td className={style.row_name}>Спринт</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td className={style.row_name}>Всего</td>
                    <td>0</td>
                    <td>0</td>
                    <td></td>
                </tr>
                </tfoot>
            </table>
        </div>
    );

export default Statistic;
