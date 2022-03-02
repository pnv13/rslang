import React, { useState, FC } from 'react';
import PlayerButton from '../../../components/button/PlayerButton';

export interface ICardPlayerProps {
  url: string;
  audioNameList: string[];
}

const CardPlayer: FC<ICardPlayerProps> = ({ url, audioNameList }) => {
  const audioList: Array<string> = [];
  const [audioPlayer] = useState(new Audio());
  Object.values(audioNameList).forEach((audioName) => audioList.push(url.concat(audioName)));

  const playAudio = (startingSong: number) => {
    let currentSong = startingSong;
    audioPlayer.src = audioList[currentSong];
    audioPlayer.autoplay = true;
    audioPlayer.addEventListener('ended', () => {
      currentSong += 1;
      playAudio(currentSong);
    });
  };

  return (
    <PlayerButton
      buttonName={'\u25B6'}
      onClick={() => {
        playAudio(0);
      }}
    />
  );
};
export default CardPlayer;
