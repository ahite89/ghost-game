import { useState, useEffect } from 'react';
import { Container, Stack, Divider } from '@mui/material';

import allValidWordsFromDictionary from './api/dictionary';

import { getTwoRandomLetters } from './services/letter';
import { getValidWords, getRandomValidWord } from './services/words';

import { FULL_HP_ARRAY } from './constants/hitPoints';
import { Keys } from './constants/keyboard';
import { Winner } from './constants/player';
import { CPU_WORD_LIST } from './constants/cpuWordList';

import LetterString from './components/LetterString';
import Header from './components/Header';
import HitPoints from './components/HitPoints';
import Keyboard from './components/Keyboard';
import MessageCenter from './components/MessageCenter';
import Loader from './components/Loader';
import NewGame from './components/NewGame';
import Score from './components/Score';
import Snackbar from './components/Snackbar';

import { HitPointProps } from './interfaces/hitPoint';
import { SnackbarProps } from './interfaces/snackbar';

function App() {

  const defaultSnackbarState: SnackbarProps = { 
    showSnackbar: false,
    message: '',
    displayDuration: 0,
    closeSnackbar: () => {}
  };

  const [userHP, setUserHP] = useState<HitPointProps[]>(FULL_HP_ARRAY);
  const [message, setMessage] = useState<string>('');
  const [letterString, setLetterString] = useState<string[]>([]);
  const [cpuValidWordsList, setCpuValidWordsList] = useState<string[]>(['']);
  const [allValidWordsList, setAllValidWordsList] = useState<string[]>(['']);
  const [disableKeyboard, setDisableKeyboard] = useState<boolean>(false);
  const [roundsWon, setRoundsWon] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isLetterEntered, setIsLetterEntered] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<Winner>(Winner.None);
  const [cursorBlinking, setCursorBlinking] = useState<boolean>(true);
  const [snackbarState, setSnackbarState] = useState<SnackbarProps>(defaultSnackbarState);

  const handleCloseSnackbar = () => {
    setSnackbarState({...snackbarState, showSnackbar: false});
  };

  useEffect(() => {
    if (userHP.length === 0) {
      declareGameWinner(Winner.CPU);
    }
    else {
      startNewRound();
    }
  }, [userHP, roundsWon]);

  const startNewGame = (): void => {
    setUserHP(FULL_HP_ARRAY);
    setRoundsWon(0);
    setDisableKeyboard(false);
    setGameWinner(Winner.None);
    setGameOver(false);
    startNewRound();
  };

  const startNewRound = (): void => {
    const startingTwoLetters: string[] = getTwoRandomLetters(CPU_WORD_LIST);
    setLetterString([startingTwoLetters[0], startingTwoLetters[1]]);
    const allValidWords: string[] = getValidWords(allValidWordsFromDictionary, startingTwoLetters.join(''));
    const cpuValidWords: string[] = getValidWords(CPU_WORD_LIST, startingTwoLetters.join(''));
    setAllValidWordsList(allValidWords);
    setCpuValidWordsList(cpuValidWords);
  };

  const declareGameWinner = async (winner: Winner): Promise<void> => {
    setCursorBlinking(false);
    const gameWinnerCallback = () => {
      setGameWinner(winner);
      setDisableKeyboard(true);
      setGameOver(true);
    };
    await pauseGameplayThenCallback(gameWinnerCallback, 2000);
  };

  const declareRoundWinner = async (message: string, winner: Winner): Promise<void> => {
    setDisableKeyboard(false);
    setSnackbarState({...snackbarState, showSnackbar: true, message: message, displayDuration: 2000});
    const roundWinnerCallback = () => {
      transitionToUserTurn();
      winner === Winner.CPU ? setUserHP(userHP.slice(0, -1)) : setRoundsWon(roundsWon + 1);         
    };
    await pauseGameplayThenCallback(roundWinnerCallback, 2000);
  };

  const cpuGameplay = async (): Promise<void> => {
    debugger
    setCursorBlinking(false);
    let nextValidCpuWord: string, newValidCpuWords: string[];
    newValidCpuWords = getValidWords(cpuValidWordsList, letterString.join('')); 
    nextValidCpuWord = getRandomValidWord(newValidCpuWords, letterString);  
    
    if (!nextValidCpuWord) {
      // then look into the all valid words list
      newValidCpuWords = getValidWords(allValidWordsList, letterString.join(''));
      nextValidCpuWord = getRandomValidWord(newValidCpuWords, letterString);

      if (!nextValidCpuWord) {
        await declareRoundWinner("Nice try!", Winner.CPU);
      }
      else {
        await handleValidCpuWord(newValidCpuWords, nextValidCpuWord);
      }
    }
    else {
      await handleValidCpuWord(newValidCpuWords, nextValidCpuWord);
    }
  };

  const handleValidCpuWord = async (validWordsList: string[], nextValidWord: string): Promise<void> => {
    const nextLetter: string = nextValidWord[letterString.length];
    const newLetterString: string[] = letterString.concat(nextLetter.toUpperCase());  
    setLetterString(newLetterString);
    nextValidWord = getRandomValidWord(validWordsList, newLetterString);
    
    if (!nextValidWord) {
      // then look into the all valid words list
      validWordsList = getValidWords(allValidWordsList, letterString.join(''));
      nextValidWord = getRandomValidWord(validWordsList, letterString);
      
      if (!nextValidWord) {
        await declareRoundWinner("Well done!", Winner.User);
      }
      else {
        handleFinishCpuTurn(validWordsList, newLetterString);
      }
    }
    else {
      handleFinishCpuTurn(validWordsList, newLetterString);
    }
  }

  const handleFinishCpuTurn = (validWordsList: string[], newLetterString: string[]): void => {
    setDisableKeyboard(false);
    validWordsList = getValidWords(validWordsList, newLetterString.join(''));
    setCpuValidWordsList(validWordsList);
    transitionToUserTurn();
  };

  const transitionToUserTurn = ():void => {
    setIsLetterEntered(false);
    setCursorBlinking(true);
  };

  const checkWordValidity = async (): Promise<void> => {
    const newValidWords: string[] = getValidWords(allValidWordsList, letterString.join(''));
      if (newValidWords.length) {
        setDisableKeyboard(true);
        const validWordCallback = () => {
          setAllValidWordsList(newValidWords);
          cpuGameplay();
        };
        await pauseGameplayThenCallback(validWordCallback, 1000);
      }
      else {
        setSnackbarState({...snackbarState, showSnackbar: true, message: "Not in word list", displayDuration: 2000});
        const invalidWordCallback = () => {
          setLetterString(letterString.slice(0, -1));
          setIsLetterEntered(false);
          setCursorBlinking(true);
        };
        await pauseGameplayThenCallback(invalidWordCallback, 2000);
      }
  };

  const pauseGameplayThenCallback = async (callback: () => void, milliseconds: number): Promise<void> => {
    await setTimeout(callback, milliseconds);
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
      const newGuessString = letterString.concat(key);
      setLetterString(newGuessString);
      setIsLetterEntered(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{padding: "2rem", backgroundColor: "white"}}>
      <Stack alignItems="center">
        <Header />
      </Stack>
      <Divider sx={{ py: 2}} flexItem />
      {!gameOver &&
        <>
          <Stack sx={{ py: 3 }} direction="row" justifyContent="space-between">
            <Score roundsWon={roundsWon} />
            <HitPoints currentHP={userHP} />
          </Stack>
          <Stack sx={{ py: 3 }} alignItems="center">
            <MessageCenter message={message} />
            {(disableKeyboard && gameWinner === Winner.None) &&
              <Loader />
            }
          </Stack>
          <Stack sx={{ py: 3 }} alignItems="center">
            <LetterString letters={letterString} cursorBlinking={cursorBlinking} />
            {allValidWordsList.length} words remaining
          </Stack>
          <Keyboard disableKeyboard={disableKeyboard} handleKeySelected={handleKeySelected} />
        </>
      }
      {gameOver &&
        <NewGame onClick={startNewGame} message='Play again?' roundsWon={roundsWon} />
      }
      <Snackbar 
        showSnackbar={snackbarState.showSnackbar} 
        message={snackbarState.message}
        displayDuration={snackbarState.displayDuration} 
        closeSnackbar={handleCloseSnackbar} />
    </Container>
  );
}

export default App;
