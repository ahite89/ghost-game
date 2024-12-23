import { useState, useEffect, useMemo } from 'react';

import allWordsFromDictionary from './api/dictionary';

import { getTwoRandomLetters } from './services/letter';
import { getValidWords, getRandomValidWord } from './services/words';

import { FULL_HP_ARRAY } from './constants/hitPoints';
import { Keys } from './constants/keyboard';
import { Player, Winner } from './constants/player';

import LetterString from './components/LetterString';
import Header from './components/Header';
import HitPoints from './components/HitPoints';
import Keyboard from './components/Keyboard';
import MessageCenter from './components/MessageCenter';
import Loader from './components/Loader';
import NewGame from './components/NewGame';

import { HitPointProps } from './interfaces/hitPoint';

import { Container, Stack } from '@mui/material';

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
    const startingTwoLetters: string[] = getTwoRandomLetters(allWordsFromDictionary);
    setLetterString([startingTwoLetters[0], startingTwoLetters[1]]);
    const newValidWords: string[] = getValidWords(allWordsFromDictionary, startingTwoLetters.join(''));
    setValidWordList(newValidWords);
  };

  const declareGameWinner = async (winner: Winner): Promise<void> => {
    setGameWinner(winner);
    setDisableKeyboard(true);
    // if (winner === Winner.CPU) {
    //   setMessage("Better luck next time!");
    // }
    await setTimeout(() => setGameOver(true), 2000);
  };

  const declareRoundWinner = async (message: string, winner: Winner): Promise<void> => {
    setMessage(message);
    await setTimeout(() => setMessage(""), 2000);
    if (winner === Winner.CPU) {
      await setTimeout(() => setUserHP(userHP.slice(0, -1)), 2000);     
    }
    else {
      await setTimeout(() => setRoundsWon(roundsWon + 1), 2000);    
    }
  };

  const cpuGameplay = async (): Promise<void> => {
    debugger
    
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
    <Container maxWidth="md" sx={{padding: "2rem", backgroundColor: "white"}}>
      <Stack alignItems="center">
        <Header />
      </Stack>    
      {!gameOver &&
        <>
          <Stack direction="row" justifyContent="space-between">
            Rounds won: {roundsWon}
            <HitPoints currentHP={userHP}/>
          </Stack>
          <Stack sx={{ py: 3 }} alignItems="center">
            <MessageCenter message={message}/>
            {(disableKeyboard && gameWinner === Winner.None) &&
              <Loader />
            }
          </Stack>
          <Stack sx={{ py: 3 }} alignItems="center">
            <LetterString letters={letterString} />
            {validWordList.length} words remaining
          </Stack>
          <Keyboard disableKeyboard={disableKeyboard} handleKeySelected={handleKeySelected}/>
        </>
      }
      {gameOver &&
        <NewGame onClick={startNewGame} message='Play again?' roundsWon={roundsWon}/>
      }
    </Container>
  );
}

export default App;
