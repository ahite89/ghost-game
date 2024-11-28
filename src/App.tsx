import React, {useState, useEffect, useRef} from 'react';

import allWordsFromDictionary from './api/dictionary';

import CharacterString from './components/CharacterString';
import Header from './components/Header';
import HitPoints from './components/HitPoints';
import Keyboard from './components/Keyboard';
import MessageCenter from './components/MessageCenter';

import './App.css';

function App() {

  let allWords: string[];
  
  useEffect(() => {
    allWords = allWordsFromDictionary;
  }, []);

  return (
    <div className="App">
      <Header />
      <HitPoints />
      <HitPoints />
      <MessageCenter />
      <CharacterString />
      <Keyboard />
    </div>
  );
}

export default App;
