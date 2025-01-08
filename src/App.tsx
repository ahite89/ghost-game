import { useState, useEffect } from 'react';
import { Container, Stack } from '@mui/material';

import allValidWordsFromDictionary from './api/dictionary';

import { getTwoRandomLetters } from './services/letter';
import { getValidWords, getRandomValidWord } from './services/words';

import { FULL_HP_ARRAY } from './constants/hitPoints';
import { Keys } from './constants/keyboard';
import { Winner } from './constants/player';

import LetterString from './components/LetterString';
import Header from './components/Header';
import HitPoints from './components/HitPoints';
import Keyboard from './components/Keyboard';
import MessageCenter from './components/MessageCenter';
import Loader from './components/Loader';
import NewGame from './components/NewGame';
import Score from './components/Score';

import { HitPointProps } from './interfaces/hitPoint';

function App() {

  const [userHP, setUserHP] = useState<HitPointProps[]>(FULL_HP_ARRAY);
  const [message, setMessage] = useState<string>('');
  const [letterString, setLetterString] = useState<string[]>([]);
  const [validWordList, setValidWordList] = useState<string[]>(['']);
  const [disableKeyboard, setDisableKeyboard] = useState<boolean>(false);
  const [roundsWon, setRoundsWon] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isLetterEntered, setIsLetterEntered] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<Winner>(Winner.None);
  const [cursorBlinking, setCursorBlinking] = useState<boolean>(true);

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
    const startingTwoLetters: string[] = getTwoRandomLetters(allValidWordsFromDictionary);
    setLetterString([startingTwoLetters[0], startingTwoLetters[1]]);
    const newValidWords: string[] = getValidWords(allValidWordsFromDictionary, startingTwoLetters.join(''));
    setValidWordList(newValidWords);
  };

  const declareGameWinner = async (winner: Winner): Promise<void> => {
    const gameWinnerCallback = () => {
      setGameWinner(winner);
      setDisableKeyboard(true);
      setGameOver(true);
    };
    await pauseGameplayThenCallback(gameWinnerCallback, 2000);
  };

  const declareRoundWinner = async (message: string, winner: Winner): Promise<void> => {
    setDisableKeyboard(false);
    setMessage(message);
    const roundWinnerCallback = () => {
      transitionToUserTurn();
      setMessage("");
      winner === Winner.CPU ? setUserHP(userHP.slice(0, -1)) : setRoundsWon(roundsWon + 1);         
    };
    await pauseGameplayThenCallback(roundWinnerCallback, 2000);
  };

  const cpuGameplay = async (): Promise<void> => {
    setCursorBlinking(false);
    let nextValidWord: string, newValidWords: string[];
    newValidWords = getValidWords(validWordList, letterString.join('')); 
    nextValidWord = getRandomValidWord(newValidWords, letterString);  
    
    if (!nextValidWord) {
      await declareRoundWinner("Nice try!", Winner.CPU);
    }
    else {
      const nextLetter: string = nextValidWord[letterString.length];
      const newLetterString: string[] = letterString.concat(nextLetter.toUpperCase());  
      setLetterString(newLetterString);
      nextValidWord = getRandomValidWord(newValidWords, newLetterString);
      if (!nextValidWord) {
        await declareRoundWinner("Well done!", Winner.User);
      }
      else {
        setDisableKeyboard(false);
        newValidWords = getValidWords(newValidWords, newLetterString.join(''));
        setValidWordList(newValidWords);
        transitionToUserTurn();
      }
    }
  };

  const transitionToUserTurn = ():void => {
    setIsLetterEntered(false);
    setCursorBlinking(true);
  };

  const checkWordValidity = async (): Promise<void> => {
    const newValidWords: string[] = getValidWords(validWordList, letterString.join(''));
      if (newValidWords.length) {
        setDisableKeyboard(true);
        const validWordCallback = () => {
          setMessage("");
          setValidWordList(newValidWords);
          cpuGameplay();
        };
        await pauseGameplayThenCallback(validWordCallback, 1000);
      }
      else {
        setMessage("Not in word list");
        const invalidWordCallback = () => {
          setMessage("");
          setLetterString(letterString.slice(0, -1));
          setIsLetterEntered(false);
          setCursorBlinking(true);
        };
        await pauseGameplayThenCallback(invalidWordCallback, 1000);
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
      {!gameOver &&
        <>
          <Stack direction="row" justifyContent="space-between">
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
            {validWordList.length} words remaining
          </Stack>
          <Keyboard disableKeyboard={disableKeyboard} handleKeySelected={handleKeySelected} />
        </>
      }
      {gameOver &&
        <NewGame onClick={startNewGame} message='Play again?' roundsWon={roundsWon} />
      }
    </Container>
  );
}

export default App;
