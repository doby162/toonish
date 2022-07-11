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
      case 'b': return 'b';//bat /b/
      case 'c': return 'ch';//chat /tʃ/
      case 'd': return 'd';//debt /d/
      case 'f': return 'f';//fret /f/

      case 'g': return 'g';//get /g/
      case 'h': return 'h';//hat /h/
      case 'j': return 'j';//jet /dʒ/
      case 'k': return 'k';//kid /k/

      case 'l': return 'l';//let /l/
      case 'm': return 'm';//met /m/
      case 'n': return 'n';//net /n/
      case 'a': return 'ng';//king /ŋ/

      case 'p': return 'p';//pet /p/
      case 'r': return 'r';//rat /r/
      case 's': return 's';//sat /s/
      case 'u': return 'sh';//ship /ʃ/

      case 't': return 't';//tent /t/
      case 'i': return 'th';//thin /θ/
      case 'o': return 'dh';//this /ð/
      case 'v': return 'v';//vet /v/

      case 'w': return 'w';//wet /w/
      case 'y': return 'y';//yet /j/
      case 'z': return 'z';//zit /z/
      case 'e': return 'zh';//casual /ʒ/

      case '.': return '-'; // maybe some of these ought to be inverters?
      case ',': return '-';
      case ';': return '-';

    }
    return '-'
  }
  let mapToShell = (char) => {
    switch (char) {
      case 'a': return 'a'; //hat /æ/
      case 'r': return 'ar'; //far /ar/
      case 'h': return 'ah'; //law /ɑ/
      case 'y': return 'ay'; //hey /e̩ɪ/

      case 'e': return 'e'; //pet /e/
      case 'd': return 'ee'; //meet /i/
      case 'f': return 'eer'; //beer /ir/
      case 'u': return 'u'; //sunny /ə~ʌ/

      case 's': return 'er'; //air /eɪr/
      case 'i': return 'i'; //hit /ɪ/
      case 'j': return 'ie'; //pie /aɪ/
      case 'k': return 'ir'; //bird /ɜr/

      case 'o': return 'o'; //toe /oʊ/
      case 'l': return 'oy'; //toy /oɪ/
      case 'q': return 'oo'; //toon /u/
      case 'w': return 'ou'; //book /ʊ/

      case 'p': return 'ow'; //how /aʊ/
      case 'g': return 'or'; //more /or/

      case '.': return '-'; // maybe some of these ought to be inverters?
      case ',': return '-'; // don't really need these as you can just move on to the next word
      case ';': return '-'; // but I hope it makes it feel consistent
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
        setIndex('core')
      } else if (key === 'Backspace') {
        setText('')
        setCurrentMod('')
        setCurrentShell('')
        setCurrentCore('')
        setIndex('core')
      } else if (key === 'Escape') {
        setCurrentMod('')
        setCurrentShell('')
        setCurrentCore('')
        setIndex('core')
      } else if (key === ' ') {
        setText(text + currentCore + currentShell + currentMod + ' ')
        setCurrentCore('')
        setCurrentMod('')
        setCurrentShell('')
        setIndex('core')
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
