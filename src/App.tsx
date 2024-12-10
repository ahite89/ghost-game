import React, { useState, useEffect } from 'react';

import allWordsFromDictionary from './api/dictionary';

import { getTwoRandomLetters } from './services/letter';
import { getValidWords, getRandomValidWord } from './services/words';

import { FULL_HP_ARRAY, STARTING_HP_COUNT } from './constants/hitPoints';
import { Keys } from './constants/keyboard';
import { Winner } from './constants/player';

import LetterString from './components/LetterString';
import Header from './components/Header';
import HitPoints from './components/HitPoints';
import Keyboard from './components/Keyboard';
import MessageCenter from './components/MessageCenter';
import Loader from './components/Loader';

import { HitPointProps } from './interfaces/hitPoint';

import { Container, Stack } from '@mui/material';

function App() {

  const [cpuHP, setCpuHP] = useState<HitPointProps[]>(FULL_HP_ARRAY);
  const [userHP, setUserHP] = useState<HitPointProps[]>(FULL_HP_ARRAY);
  const [message, setMessage] = useState<string>('');
  const [letterString, setLetterString] = useState<string[]>([]);
  const [validWordList, setValidWordList] = useState<string[]>(['']);
  const [disableKeyboard, setDisableKeyboard] = useState<boolean>(false);
  const [gameRound, setGameRound] = useState<number>(1);
  const [isLetterEntered, setIsLetterEntered] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<Winner>(Winner.None);

  useEffect(() => {
    debugger
    if (userHP.length === 0) {
      declareGameWinner(Winner.CPU);
    }
    else if (cpuHP.length === 0) {
      declareGameWinner(Winner.User);
    }
    else {
      startNewRound();
    }
  }, [cpuHP, userHP]);

  const startNewGame = (): void => {
    setUserHP(FULL_HP_ARRAY);
    setCpuHP(FULL_HP_ARRAY);
    startNewRound();
  };

  const startNewRound = (): void => {
    const startingTwoLetters: string[] = getTwoRandomLetters(allWordsFromDictionary);
    setLetterString([startingTwoLetters[0], startingTwoLetters[1]]);
    const newValidWords: string[] = getValidWords(allWordsFromDictionary, startingTwoLetters.join(''));
    setValidWordList(newValidWords);
  };

  const declareGameWinner = (winner: Winner): void => {
    setGameWinner(winner);
    setDisableKeyboard(true);
    if (winner === Winner.CPU) {
      setMessage("Better luck next time!");
    }
    else if (winner === Winner.User) {
      setMessage("You're a winner!");
    }
  };

  const declareRoundWinner = async (message: string, winner: Winner): Promise<void> => {
    setMessage(message);
    await setTimeout(() => setMessage(""), 2000);
    winner == Winner.CPU ? setUserHP(userHP.slice(0, -1)) : setCpuHP(cpuHP.slice(0, -1));
    // await setTimeout(() => startNewRound(), 2000);
  };

  const cpuGameplay = async (): Promise<void> => {
    debugger
    
    let nextValidWord: string, newValidWords: string[];
    newValidWords = getValidWords(validWordList, letterString.join('')); 
    nextValidWord = getRandomValidWord(newValidWords, letterString.length);  
    
    if (!nextValidWord) {
      await declareRoundWinner("Nice try!", Winner.CPU);
    }
    else {
      const nextLetter: string = nextValidWord[letterString.length];
      const newLetterString: string[] = letterString.concat(nextLetter.toUpperCase());  
      setLetterString(newLetterString);
      nextValidWord = getRandomValidWord(newValidWords, newLetterString.length);
      if (!nextValidWord) {
        await declareRoundWinner("Well done!", Winner.User);
      }
      else {
        newValidWords = getValidWords(newValidWords, newLetterString.join(''));
        setValidWordList(newValidWords);
      }
    }
    setDisableKeyboard(false);
    setIsLetterEntered(false);
  };

  const userGameplay = async (): Promise<void> => {
    const newValidWords: string[] = getValidWords(validWordList, letterString.join(''));
      if (newValidWords.length) {
        await setTimeout(() => setMessage(""), 1000);
        setValidWordList(newValidWords);
        setDisableKeyboard(true);
        await setTimeout(() => cpuGameplay(), 1000);
      }
      else {
        setMessage("Not in word list");
        await setTimeout(() => setMessage(""), 1000);
        await setTimeout(() => setLetterString(letterString.slice(0, -1)), 1000);
        setIsLetterEntered(false);
      }
  };

  const handleKeySelected = async (key: string): Promise<void> => {
    if (isLetterEntered && key === Keys.Enter) {
      // Run logic to check if this letter combo is valid
      await userGameplay();
    }
    else if (isLetterEntered && key === Keys.Delete) {
      // Remove newly-entered key from string
      setLetterString(letterString.slice(0, -1));
      setIsLetterEntered(false);
    }
    else if (!isLetterEntered && key !== Keys.Delete && key !== Keys.Enter) {
      const newGuessString = letterString.concat(key);
      setLetterString(newGuessString);
      setIsLetterEntered(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Stack alignItems="center">
        <Header />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <HitPoints currentHP={cpuHP}/>
        <Stack>
          <MessageCenter message={message}/>
          {disableKeyboard && gameWinner === Winner.None && <Loader />}
        </Stack>
        <HitPoints currentHP={userHP}/>
      </Stack>
      <Stack alignItems="center">
        <LetterString letters={letterString} />
        {validWordList[0]}
      </Stack>
      <Keyboard disableKeyboard={disableKeyboard} handleKeySelected={handleKeySelected}/>
    </Container>
  );
}

export default App;
