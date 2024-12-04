import React, { useState, useEffect } from 'react';

import allWordsFromDictionary from './api/dictionary';

import { getRandomCharacter } from './services/character';
import { getValidWords, getRandomValidWord } from './services/words';

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
    //debugger
    let allWords: string[] = allWordsFromDictionary;
    let randomCharacter: string = getRandomCharacter();
    setCharacterString([randomCharacter]);
    let newValidWords: string[] = getValidWords(allWords, randomCharacter);
    setValidWordList(newValidWords);
  }, []);

  const cpuChoosesLetter = async (): Promise<void> => {
    debugger
    let newValidWords: string[] = getValidWords(validWordList, characterString.join('')); 
    let nextValidWord: string = getRandomValidWord(newValidWords, characterString.length);   
    if (!nextValidWord) {
      setMessage("You lose!");
    }
    else {
      let nextCharacter: string = nextValidWord[characterString.length];
      let newCharacterString: string[] = characterString.concat(nextCharacter.toUpperCase());  
      if (newCharacterString.join('') === nextValidWord) {
        setMessage("You win!");
      }
      else {
        setCharacterString(newCharacterString);
        newValidWords = getValidWords(newValidWords, newCharacterString.join(''));
        setValidWordList(newValidWords);
      }
    }
    setCpuTurn(false);
    setLetterAdded(false);
  };

  const handleKeySelected = async (key: string): Promise<void> => {
    //debugger
    if (letterAdded && key === Keys.Enter) {
      //debugger
      // Run logic to check if this letter combo is valid
      let newValidWords: string[] = getValidWords(validWordList, characterString.join(''));
      if (newValidWords.length) {
        setMessage("Valid combo!");
        await setTimeout(() => setMessage(""), 1000);
        setValidWordList(newValidWords);
        setCpuTurn(true);
        await setTimeout(() => cpuChoosesLetter(), 1000);
      }
      else {
        setMessage("Nope!");
        await setTimeout(() => setMessage(""), 1000);
        setCharacterString(characterString.slice(0, -1));
        setLetterAdded(false);
      }
    }
    else if (letterAdded && key === Keys.Delete) {
      // Remove newly-entered key from string
      setCharacterString(characterString.slice(0, -1));
      setLetterAdded(false);
    }
    else if (!letterAdded && key !== Keys.Delete && key !== Keys.Enter) {
      let newGuessString = characterString.concat(key);
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
