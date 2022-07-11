import logo from './logo.svg';
import React from "react";
import './App.css';

function App() {
  const [key, setKey] = React.useState('');
  const [currentShell, setCurrentShell] = React.useState('');
  const [currentCore, setCurrentCore] = React.useState('');
  const [currentMod, setCurrentMod] = React.useState('');
  const [index, setIndex] = React.useState('core');
  const [text, setText] = React.useState("");

  let mapToCore = (char) => {
    switch (char) {
      case 'q': return 'b';
      case 'w': return 'ch';
      case 'e': return 'd';
      case 'r': return 'f';

      case 'a': return 'g';
      case 's': return 'h';
      case 'd': return 'j';
      case 'f': return 'k';

      case 'z': return 'l';
      case 'x': return 'm';
      case 'c': return 'n';
      case 'v': return 'ng';

      case 'u': return 'p';
      case 'i': return 'r';
      case 'o': return 's';
      case 'p': return 'sh';

      case 'j': return 't';
      case 'k': return 'th';
      case 'l': return 'dh';
      case 'h': return 'v';

      case 'm': return 'w';
      case 'g': return 'y';
      case 't': return 'z';
      case 'y': return 'zh';

      case 'b': return '-';
      case 'n': return '-';

    }
    return '-'
  }
  let mapToShell = (char) => {
    switch (char) {
      case 'a': return 'a';
      case 's': return 'ar';
      case 'd': return 'ah';
      case 'f': return 'ay';

      case 'j': return 'e';
      case 'k': return 'ee';
      case 'l': return 'eer';
      case ';': return 'u';

      case 'q': return 'er';
      case 'w': return 'i';
      case 'e': return 'ie';
      case 'r': return 'ir';

      case 'u': return 'o';
      case 'i': return 'oy';
      case 'o': return 'oo';
      case 'p': return 'ou';

      case 'g': return 'ow';
      case 'h': return 'or';
    }
    return ''
  }

 const onKeyPress = (e) => {
    setKey(e.key)
 }
  let AddListener = () => {
    document.addEventListener('keydown', onKeyPress)
  }
  React.useEffect(AddListener, [])
  React.useEffect(()=>{
    console.log(key)
    if(key !== '') {
      if(key === '-') {
        if(currentMod) {
          setCurrentMod('')
        } else {
          setCurrentMod('_')
        }
      } else if (key === 'Enter') {
        setText(text + currentCore + currentShell + currentMod)
        setCurrentCore('')
        setCurrentMod('')
        setCurrentShell('')
      } else if (key === ' ') {
        setText(text + currentCore + currentShell + currentMod + ' ')
        setCurrentCore('')
        setCurrentMod('')
        setCurrentShell('')
      } else if(index === 'core') {
        setIndex('shell')
        setCurrentCore(mapToCore(key))
      } else {
        setIndex('core')
        setCurrentShell(mapToShell(key))
      }

      console.log(currentCore + currentShell + currentMod)
      setKey('')
    }
  }, [key])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          de_ti_ <code>src/App.js</code> na_d sayv too reelod.
        </p>
        <p>pleez enjoy</p>
        <p><code>----------------</code></p>
        <p>{currentCore}</p>
        <p>{currentShell}</p>
        <p>{currentCore}{currentShell}{currentMod}</p>
        <p>{text}</p>
      </header>
    </div>
  );
}

export default App;
