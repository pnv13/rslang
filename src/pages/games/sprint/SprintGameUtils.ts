import { IQuestions, IWord } from '../../../services/types';

const randomAnswer = (array: IWord[] | IQuestions[]) => (Math.floor(Math.random() * (array.length)));

const isCorrectScore = (correctScore: number, setCorrectScore: any, score: number, setScore: any) => {
  setCorrectScore(correctScore += 1);
  if (correctScore === 4) {
    setCorrectScore(0);
    setScore(score += 20);
  }
}

const isWrongScore = (correctScore: number, setCorrectScore: any) => {
  setCorrectScore(correctScore = 0);
}

const wordCorrect =
  (array: IQuestions[], question: number, answer: number, resultArray: boolean[], score: number,
    setQuestion: any, setAnswer: any, setScore: any, correctScore: number, setCorrectScore: any) => {
    resultArray.push(true);
    setQuestion(question += 1);
    setAnswer(answer += 1);
    setScore(score += 10);
    isCorrectScore(correctScore, setCorrectScore, score, setScore);
  };
const wordWrong =
  (array: IQuestions[], question: number, answer: number, resultArray: boolean[], score: number,
    setQuestion: any, setAnswer: any, setScore: any, correctScore: number, setCorrectScore: any) => {
    resultArray.push(false);
    setQuestion(question += 1);
    setAnswer(answer += 1);
    isWrongScore(correctScore, setCorrectScore);
  };

export const isCorrect =
  (array: IQuestions[], backWords: IWord[], question: number, answer: number, resultArray: boolean[], score: number,
    setQuestion: any, setAnswer: any, setScore: any, correctScore: number, setCorrectScore: any, isTrue: boolean) => {
    if (question < array.length - 1) {
      if (isTrue) {
        if (array[question].wordTranslate === backWords[answer].wordTranslate) {
          wordCorrect(array, question, answer, resultArray, score, setQuestion, setAnswer, setScore, correctScore, setCorrectScore);
        } else {
          wordWrong(array, question, answer, resultArray, score, setQuestion, setAnswer, setScore, correctScore, setCorrectScore);
        }
      } else if (array[question].wordTranslate !== backWords[answer].wordTranslate) {
        wordCorrect(array, question, answer, resultArray, score, setQuestion, setAnswer, setScore, correctScore, setCorrectScore);
      } else {
        wordWrong(array, question, answer, resultArray, score, setQuestion, setAnswer, setScore, correctScore, setCorrectScore);
      }
    } else if (question === array.length - 1) {
      if (isTrue) {
        if (array[question].wordTranslate === backWords[answer].wordTranslate) {
          resultArray.push(true);
          setScore(score += 10);
          isCorrectScore(correctScore, setCorrectScore, score, setScore);
        } else {
          resultArray.push(false);
          isWrongScore(correctScore, setCorrectScore);
        }
      } else if (array[question].wordTranslate !== backWords[answer].wordTranslate) {
        resultArray.push(true);
        setScore(score += 10);
        isCorrectScore(correctScore, setCorrectScore, score, setScore);
      } else {
        resultArray.push(false);
        isWrongScore(correctScore, setCorrectScore);
      }
    }
  }

export const changeQuestions = (array: IWord[]) => {
  const randomTranslate = () => (Math.floor(Math.random() * (1 + 1)));
  const gameArray: IQuestions[] = [];
  array.forEach((el, i) => {
    const randomResult = randomTranslate();
    if (randomResult === 1) {
      const wordsObject = {
        word: el.word,
        wordTranslate: el.wordTranslate,
        wordTranslateRight: el.wordTranslate,
        transcription: el.transcription,
        audio: el.audio
      };
      gameArray.push(wordsObject);
    } else {
      const wordsObject = {
        word: el.word,
        wordTranslate: array[randomAnswer(array)].wordTranslate,
        wordTranslateRight: el.wordTranslate,
        transcription: el.transcription,
        audio: el.audio
      };
      gameArray.push(wordsObject);
    }
  });
  return gameArray;
}

export const timerFunc = (timer: number, setTimer: any) => {
  setTimeout(() => {
    if (timer !== 0) {
      setTimer(timer -= 1)
    }
  }, 1000)
}
export const dotsActive = (style: any, correctScore: number) => {
  const dots = document.querySelectorAll(`.${style.dot}`);
  dots.forEach((el, i) => {
    if (i < correctScore) el.classList.add('active-dot');
    if (i >= correctScore) el.classList.remove('active-dot');
  })
}

// export const counterSession = (session: number, setSession: any, resultArray: boolean[]) => {
//   if (resultArray[resultArray.length - 1] === true) {
//     setSession(session+=1);
//   } else {
//     setSession(0);
//   }
// }