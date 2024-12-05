import React, { useState, useEffect } from 'react';

import allWordsFromDictionary from './api/dictionary';

import { getTwoRandomCharacters } from './services/character';
import { getValidWords, getRandomValidWord, getLongestValidWordLength } from './services/words';

import { FULL_HP_ARRAY } from './constants/hitPoints';
import { Keys } from './constants/keyboard';

import CharacterString from './components/CharacterString';
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
  const [characterString, setCharacterString] = useState<string[]>([]);
  const [validWordList, setValidWordList] = useState<string[]>(['']);
  const [activeKeyboard, setActiveKeyboard] = useState<boolean>(true);
  const [gameRound, setGameRound] = useState<number>(1);
  const [cpuTurn, setCpuTurn] = useState<boolean>(false);
  const [letterAdded, setLetterAdded] = useState<boolean>(false);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = (): void => {
    const startingTwoCharacters: string[] = getTwoRandomCharacters(allWordsFromDictionary);
    setCharacterString([startingTwoCharacters[0], startingTwoCharacters[1]]);
    const newValidWords: string[] = getValidWords(allWordsFromDictionary, startingTwoCharacters.join(''));
    setValidWordList(newValidWords);
  };

  const cpuChoosesLetter = async (): Promise<void> => {
    debugger
    let nextValidWord: string, newValidWords: string[];

    newValidWords = getValidWords(validWordList, characterString.join('')); 
    nextValidWord = getRandomValidWord(newValidWords, characterString.length);  
    if (!nextValidWord) {
      setMessage("You lose!");
      await setTimeout(() => setMessage(""), 2000);
      setUserHP(userHP.slice(0, -1));
      await setTimeout(() => startNewRound(), 2000);
    }
    else {
      const nextCharacter: string = nextValidWord[characterString.length];
      const newCharacterString: string[] = characterString.concat(nextCharacter.toUpperCase());  
      setCharacterString(newCharacterString);
      // const longestValidWordLength = getLongestValidWordLength(newValidWords);
      nextValidWord = getRandomValidWord(newValidWords, newCharacterString.length);
      if (!nextValidWord) {
        setMessage("You win!");
        await setTimeout(() => setMessage(""), 2000);
        setCpuHP(cpuHP.slice(0, -1));
        await setTimeout(() => startNewRound(), 2000);
      }
      else {
        newValidWords = getValidWords(newValidWords, newCharacterString.join(''));
        setValidWordList(newValidWords);
      }
    }
    setCpuTurn(false);
    setLetterAdded(false);
  };

  const handleKeySelected = async (key: string): Promise<void> => {
    if (letterAdded && key === Keys.Enter) {
      // Run logic to check if this letter combo is valid
      const newValidWords: string[] = getValidWords(validWordList, characterString.join(''));
      if (newValidWords.length) {
        await setTimeout(() => setMessage(""), 1000);
        setValidWordList(newValidWords);
        setCpuTurn(true);
        await setTimeout(() => cpuChoosesLetter(), 1000);
      }
      else {
        setMessage("Not in word list");
        await setTimeout(() => setMessage(""), 1000);
        await setTimeout(() => setCharacterString(characterString.slice(0, -1)), 1000);
        setLetterAdded(false);
      }
    }
    else if (letterAdded && key === Keys.Delete) {
      // Remove newly-entered key from string
      setCharacterString(characterString.slice(0, -1));
      setLetterAdded(false);
    }
    else if (!letterAdded && key !== Keys.Delete && key !== Keys.Enter) {
      const newGuessString = characterString.concat(key);
      setCharacterString(newGuessString);
      setLetterAdded(true);
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
          {cpuTurn && <Loader />}
        </Stack>
        <HitPoints currentHP={userHP}/>
      </Stack>
      <Stack alignItems="center">
        <CharacterString characters={characterString} />
        {validWordList[0]}
      </Stack>
      <Keyboard cpuTurn={cpuTurn} handleKeySelected={handleKeySelected}/>
    </Container>
  );
}

export default App;
