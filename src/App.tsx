import { useState, useEffect, useRef } from 'react';
import { Container, Stack, Divider } from '@mui/material';

import allValidWordsFromDictionary from './api/dictionary';

import { getTwoRandomLetters, getLettersFromLetterPropsArray } from './services/letter';
import { getValidWords, getRandomValidWord, findNextValidCpuWord } from './services/words';
import { getPointsFromRound } from './services/score';

import { FULL_HP_ARRAY } from './constants/hitPoints';
import { Keys } from './constants/keyboard';
import { Player } from './constants/player';
import { CPU_WORD_LIST } from './constants/cpuWordList';
import { letterToPointsMap } from './constants/letter';
import { INITIAL_HINT_COUNT, STARTING_POINT_VALUE, STARTING_HIGH_SCORE_VALUE } from './constants/game';
import { DEFAULT_SNACKBAR_STATE } from './constants/snackbar';

import LetterString from './components/LetterString';
import Header from './components/Header';
import HitPoints from './components/HitPoints';
import Keyboard from './components/Keyboard';
import MessageCenter from './components/MessageCenter';
import Loader from './components/Loader';
import NewGame from './components/NewGame';
import Score from './components/Score';
import Snackbar from './components/Snackbar';
import Hint from './components/Hint';

import { HitPointProps } from './interfaces/hitPoint';
import { SnackbarProps } from './interfaces/snackbar';
import { LetterProps } from './interfaces/letter';

function App() {

  const highScore = useRef<number>(localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')!) : STARTING_HIGH_SCORE_VALUE);

  const [userHP, setUserHP] = useState<HitPointProps[]>(FULL_HP_ARRAY);
  const [message, setMessage] = useState<string>('');
  const [letterString, setLetterString] = useState<LetterProps[]>([]);
  const [cpuValidWordsList, setCpuValidWordsList] = useState<string[]>(['']);
  const [allValidWordsList, setAllValidWordsList] = useState<string[]>(['']);
  const [disableKeyboard, setDisableKeyboard] = useState<boolean>(false);
  const [pointsWon, setPointsWon] = useState<number>(STARTING_POINT_VALUE);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isLetterEntered, setIsLetterEntered] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<Player>(Player.None);
  const [cursorBlinking, setCursorBlinking] = useState<boolean>(true);
  const [snackbarState, setSnackbarState] = useState<SnackbarProps>(DEFAULT_SNACKBAR_STATE);
  const [hintCount, setHintCount] = useState<number>(INITIAL_HINT_COUNT);
  const [animatePoints, setAnimatePoints] = useState<boolean>(false);

  const handleCloseSnackbar = () => {
    setSnackbarState({...snackbarState, showSnackbar: false});
  };

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (userHP.length === 0) {
      declareGameWinner(Player.CPU);
    }
    else {
      startNewRound();
    }
  }, [userHP]);

  const startNewGame = async (): Promise<void> => {
    setUserHP(FULL_HP_ARRAY);
    setPointsWon(STARTING_POINT_VALUE);
    setHintCount(INITIAL_HINT_COUNT);
    setDisableKeyboard(false);
    setGameWinner(Player.None);
    setGameOver(false);
    await startNewRound();
  };

  const pauseGameplayThenCallback = async (callback: () => void, milliseconds: number): Promise<void> => {
    await setTimeout(callback, milliseconds);
  };

  const startNewRound = async (): Promise<void> => {
    setLetterString([]);
    setAnimatePoints(false);
    const startingTwoLetters: LetterProps[] = getTwoRandomLetters(CPU_WORD_LIST);
    setLetterString(startingTwoLetters);
    const allValidWords: string[] = getValidWords(allValidWordsFromDictionary, getLettersFromLetterPropsArray(startingTwoLetters).join(''));
    const cpuValidWords: string[] = getValidWords(CPU_WORD_LIST, getLettersFromLetterPropsArray(startingTwoLetters).join(''));
    setAllValidWordsList(allValidWords);
    setCpuValidWordsList(cpuValidWords);
    setCursorBlinking(true);
  };

  const declareGameWinner = async (winner: Player): Promise<void> => {
    setCursorBlinking(false);
    const gameWinnerCallback = () => {
      setGameWinner(winner);
      setDisableKeyboard(true);
      setGameOver(true);
      setHighScore();
    };
    await pauseGameplayThenCallback(gameWinnerCallback, 2000);
  };

  const accumulatePoints = async (): Promise<void> => {
    const pointsFromRound = getPointsFromRound(letterString, pointsWon);
    setPointsWon(pointsFromRound);
  }

  const setHighScore = (): void => {
    const currentHighScore = localStorage.getItem('highScore');
    if (currentHighScore) {
      if (pointsWon > parseInt(currentHighScore)) {
        localStorage.setItem('highScore', pointsWon.toString());
        highScore.current = pointsWon;
      }
    }
    else {
      localStorage.setItem('highScore', pointsWon.toString());
      highScore.current = pointsWon;
    }
  }

  const animatePointsAtRoundEnd = async (): Promise<void> => {
    setAnimatePoints(true);
  }

  const declareRoundWinner = async (message: string, winner: Player): Promise<void> => {
    setDisableKeyboard(false);
    setSnackbarState({...snackbarState, showSnackbar: true, message: message, displayDuration: 1500});
    if (winner === Player.User) {
      const pointsAccumulationWaitTime = letterString.length * 500;
      await pauseGameplayThenCallback(() => animatePointsAtRoundEnd(), 1500);
      await pauseGameplayThenCallback(() => accumulatePoints(), pointsAccumulationWaitTime);
      await pauseGameplayThenCallback(() => startNewRound(), pointsAccumulationWaitTime);
    }
    else {
      setUserHP(userHP.slice(0, -1));
    }
    transitionToUserTurn();  
  };

  const beginCpuGameplay = async (): Promise<void> => {
    setCursorBlinking(false);
    const wordsFromValidCpuWordsList = getValidWords(cpuValidWordsList, getLettersFromLetterPropsArray(letterString).join(''));
    const wordsFromAllValidWordsList = getValidWords(allValidWordsList, getLettersFromLetterPropsArray(letterString).join(''));
    
    const newValidCpuWord = findNextValidCpuWord(getLettersFromLetterPropsArray(letterString), 
      wordsFromValidCpuWordsList, wordsFromAllValidWordsList);

    if (!newValidCpuWord) {
      await declareRoundWinner("Nice try!", Player.CPU);
    }
    else {
      await handleValidCpuWord(wordsFromValidCpuWordsList, wordsFromAllValidWordsList, newValidCpuWord);
    }
  };

  const handleValidCpuWord = async (wordsFromValidCpuWordsList: string[], wordsFromAllValidWordsList: string[], nextValidWord: string): Promise<void> => {
    const nextLetter: string = nextValidWord[letterString.length];
    const newLetterString: LetterProps[] = letterString.concat(
      { letter: nextLetter.toUpperCase(), pointValue: letterToPointsMap[nextLetter.toUpperCase()] , playedBy: Player.CPU }
    );
    setLetterString(newLetterString);
    const newValidCpuWord = findNextValidCpuWord(getLettersFromLetterPropsArray(newLetterString), 
      wordsFromValidCpuWordsList, wordsFromAllValidWordsList);
    
    if (!newValidCpuWord) {
      await declareRoundWinner("Well done!", Player.User);
    }
    else {
      handleFinishCpuTurn(wordsFromValidCpuWordsList, wordsFromAllValidWordsList, newLetterString);
    }
  }

  const handleFinishCpuTurn = (wordsFromValidCpuWordsList: string[], wordsFromAllValidWordsList: string[], newLetterString: LetterProps[]): void => {
    setDisableKeyboard(false);
    let newValidWordsList: string[] = [];
    if (wordsFromValidCpuWordsList.length) {
      newValidWordsList = getValidWords(wordsFromValidCpuWordsList, getLettersFromLetterPropsArray(newLetterString).join(''));
    }
    else {
      newValidWordsList = getValidWords(wordsFromAllValidWordsList, getLettersFromLetterPropsArray(newLetterString).join(''));
    }
    setCpuValidWordsList(newValidWordsList);
    transitionToUserTurn();
  };

  const transitionToUserTurn = ():void => {
    setIsLetterEntered(false);
    setCursorBlinking(true);
  };

  const checkWordValidity = async (): Promise<void> => {
    const newValidWords: string[] = getValidWords(allValidWordsList, getLettersFromLetterPropsArray(letterString).join(''));
      if (newValidWords.length) {
        setDisableKeyboard(true);
        const validWordCallback = () => {
          setAllValidWordsList(newValidWords);
          beginCpuGameplay();
        };
        await pauseGameplayThenCallback(validWordCallback, 1000);
      }
      else {
        setSnackbarState({...snackbarState, showSnackbar: true, message: "Not in word list", displayDuration: 1500});
        const invalidWordCallback = () => {
          setLetterString(letterString.slice(0, -1));
          setIsLetterEntered(false);
          setCursorBlinking(true);
        };
        await pauseGameplayThenCallback(invalidWordCallback, 2000);
      }
  };

  const handleKeySelected = async (key: string): Promise<void> => {
    if (isLetterEntered && key === Keys.Enter) {
      // Run logic to check if this letter combo is valid
      await checkWordValidity();
    }
    else if (isLetterEntered && key === Keys.Delete) {
      // Remove newly-entered key from string
      setLetterString(letterString.slice(0, -1));
      setIsLetterEntered(false);
      setCursorBlinking(true);
    }
    else if (!isLetterEntered && key !== Keys.Delete && key !== Keys.Enter) {
      setCursorBlinking(false);
      const newGuessString = letterString.concat(
        { letter: key, pointValue: letterToPointsMap[key], playedBy: Player.User }
      );
      setLetterString(newGuessString);
      setIsLetterEntered(true);
    }
  };

  const handleHintButtonClick = (): void => {
    if (hintCount > 0 && !isLetterEntered) {
      setCursorBlinking(false);
      const validWordsList: string[] = getValidWords(allValidWordsList, getLettersFromLetterPropsArray(letterString).join(''));
      const nextValidWord: string = getRandomValidWord(validWordsList, getLettersFromLetterPropsArray(letterString));
      if (!nextValidWord) {
        setSnackbarState({...snackbarState, showSnackbar: true, message: "No hints available", displayDuration: 1500});
        setCursorBlinking(true);
      }
      else {
        const hintLetter: string = nextValidWord[letterString.length].toUpperCase();
        const newGuessString = letterString.concat(
          { letter: hintLetter, pointValue: letterToPointsMap[hintLetter], playedBy: Player.User }
        );
        
        setLetterString(newGuessString);
        setIsLetterEntered(true);
        setHintCount(hintCount - 1);
      }
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{padding: "0 2rem 2rem 2rem", backgroundColor: "white"}}>
        {!gameOver &&
          <>
            <Stack sx={{ py: 3 }} direction="row" justifyContent="space-between">
              <Score pointsWon={pointsWon} />
              <HitPoints currentHP={userHP} />
              <Hint hintCount={hintCount} onClick={handleHintButtonClick} />
            </Stack>
            <Stack sx={{ py: 4 }} alignItems="center">
              <MessageCenter message={message} />
              {(disableKeyboard && gameWinner === Player.None) &&
                <Loader />
              }
            </Stack>
            <Stack sx={{ py: 3 }} alignItems="center">
              <LetterString letters={letterString} cursorBlinking={cursorBlinking} animating={animatePoints} />
            </Stack>
            <Keyboard disableKeyboard={disableKeyboard} handleKeySelected={handleKeySelected} />
          </>
        }
        {gameOver &&
          <NewGame onClick={startNewGame} message='Play again?' pointsWon={pointsWon} highScore={highScore.current} />
        }
        <Snackbar 
          showSnackbar={snackbarState.showSnackbar} 
          message={snackbarState.message}
          displayDuration={snackbarState.displayDuration} 
          closeSnackbar={handleCloseSnackbar} />
      </Container>
    </>
  );
}

export default App;
