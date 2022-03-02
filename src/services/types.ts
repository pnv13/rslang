export interface ILoginUser {
  email: string;
  password: string;
}

export interface ISignUpUser extends ILoginUser {
  name: string;
}

export interface IGetUSer {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IRouteProps {
  cardGroupId: number;
  groupPage: number;
  level: string;
}

export interface IGameDataProps {
  game: {
    id: number;
    name: string;
    img: string;
    description: string;
    rout: string;
  };
}

export interface IGameProps {
  difficultLvl: string;
}

export interface IQuestions {
  word: string;
  wordTranslate: string;
  wordTranslateRight: string;
  audio: string;
  transcription: string;
}
export interface IResultPopup {
  resultArray: boolean[],
  words: IQuestions[],
  score: number | null,
  game: string
}