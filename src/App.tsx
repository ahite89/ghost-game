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

  let allWords: string[];

  const [cpuHP, setCpuHP] = useState<HitPointProps[]>(FULL_HP_ARRAY);
  const [userHP, setUserHP] = useState<HitPointProps[]>(FULL_HP_ARRAY);
  const [characterString, setCharacterString] = useState<string[]>([getRandomCharacter()]);
  const [guessString, setGuessString] = useState<string[]>([getRandomCharacter()]);
  const [message, setMessage] = useState<string>('Welcome!');
  const [validWordList, setValidWordList] = useState<string[]>(['']);
  const [activeKeyboard, setActiveKeyboard] = useState<boolean>(true);
  const [gameRound, setGameRound] = useState<number>(1);
  const [letterAdded, setLetterAdded] = useState<boolean>(false);

  useEffect(() => {
    //allWords = allWordsFromDictionary;
  }, []);

  const handleKeySelected = (key: string): void => {
    if (letterAdded && key === Keys.Enter) {
      // Run logic to check if this letter combo is valid
      let newValidWords = getValidWords(guessString.join(''));
      alert(newValidWords);
    }
    else if (letterAdded && key === Keys.Delete) {
      // Remove entered key from string
      let originalGuessString = guessString.slice(0, -1);
      setGuessString(originalGuessString!);
      setLetterAdded(false);
    }
    else if (!letterAdded && key !== Keys.Delete && key !== Keys.Enter) {
      let newGuessString = guessString.concat(key);
      setGuessString(newGuessString);
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
        <CharacterString characters={guessString} />
      </Stack>
      <Keyboard handleKeySelected={handleKeySelected}/>
    </Container>
  );
}

export default App;
