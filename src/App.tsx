import React, {useState, useEffect, useRef} from 'react';

import allWordsFromDictionary from './api/dictionary';

import { getRandomCharacter } from './services/character';

import { FULL_HP_ARRAY } from './constants/hitPoints';

import CharacterString from './components/CharacterString';
import Header from './components/Header';
import HitPoints from './components/HitPoints';
import Keyboard from './components/Keyboard';
import MessageCenter from './components/MessageCenter';

import { HitPointProps } from './interfaces/hitPoint';

import './App.css';

function App() {

  let allWords: string[];
  
  useEffect(() => {
    allWords = allWordsFromDictionary;
  }, []);

  const [cpuHP, setCpuHP] = useState<HitPointProps[]>(FULL_HP_ARRAY);
  const [userHP, setUserHP] = useState<HitPointProps[]>(FULL_HP_ARRAY);
  const [characterString, setCharacterString] = useState<string[]>([getRandomCharacter()]);
  const [message, setMessage] = useState<string>('Welcome!');
  const [validWordList, setValidWordList] = useState<string[]>(['']);
  const [activeKeyboard, setActiveKeyboard] = useState<boolean>(true);
  const [gameRound, setGameRound] = useState<number>(1);

  const handleKeySelected = (key: string): void => {
    console.log(key);
  };

  return (
    <div className="App">
      <Header />
      <HitPoints currentHP={cpuHP}/>
      <HitPoints currentHP={userHP}/>
      <MessageCenter message={message}/>
      <CharacterString characters={characterString} />
      <Keyboard handleKeySelected={handleKeySelected}/>
    </div>
  );
}

export default App;
