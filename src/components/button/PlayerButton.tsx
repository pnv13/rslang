import React from 'react';

export type PlayerButtonProp = {
  buttonName: string;
  id?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PlayerButton = ({ buttonName, id, onClick }: PlayerButtonProp) => (
  <button type='button' id={id} onClick={onClick}>
    {buttonName}
  </button>
);

export default PlayerButton;
