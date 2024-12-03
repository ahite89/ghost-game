import React, {useState, useEffect, useRef} from 'react';

import allWordsFromDictionary from './api/dictionary';

import { getRandomCharacter } from './services/character';
import { getValidWords } from './services/words';

import { FULL_HP_ARRAY } from './constants/hitPoints';
import { Keys } from './constants/keyboard';

import CharacterString from './components/CharacterString';
import Header from './components/Header';
import HitPoints from './components/HitPoints';
import Keyboard from './components/Keyboard';
import MessageCenter from './components/MessageCenter';

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



  const handleKeySelected = (key: string): void => {
    if (letterAdded && key === Keys.Enter) {
      // Run logic to check if this letter combo is valid
      let newValidWords: string[] = getValidWords(validWordList, characterString.join(''));
      if (newValidWords.length) {
        setMessage("Valid combo!");
        setTimeout(() => setMessage(""), 1000)
        setCpuTurn(true);
      }
      else {
        setMessage("Nope!");
        setTimeout(() => setMessage(""), 1000)
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
    <Container maxWidth="sm">
      <Stack alignItems="center">
        <Header />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <HitPoints currentHP={cpuHP}/>        
        <MessageCenter message={message}/>
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
