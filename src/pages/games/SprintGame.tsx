import React from 'react';
import { IGameProps } from '../../services/types';

const SprintGame: React.FC<IGameProps> = ({ difficultLvl }) => (
  <div>
    Спринт
    <div>Сложность {difficultLvl}</div>
  </div>
);

export default SprintGame;
