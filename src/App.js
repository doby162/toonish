import logo from './logo.svg';
import React from "react";
import './App.css';

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return '';
}

function App() {
  const [key, setKey] = React.useState('');
  const [pkey, setpKey] = React.useState('');
  const [i, seti] = React.useState(0);
  const [currentShell, setCurrentShell] = React.useState('');
  const [currentCore, setCurrentCore] = React.useState('-');
  const [currentMod, setCurrentMod] = React.useState('');
  const [text, setText] = React.useState("");

  // all letters are mapped to a set of runes that make logical sense to an english speaker
  // most vowels are overloaded, most consonants are not
  // when there is a single canonical IPA character, it is used
  // when the IPA defines a symbol from tunish as having multiple characters (AKA are being ar)
  // an otherwise unused character is picked at random.
  // this step already had to be done for the original font to work based on ligatures.
  // vowels that are 1 rune in tunish but multiple in IPA are almost always "R colored"
  // but are also sometimes other diphthongs
  // I think they were included because they dramatically increase the number of single rune words
  // if you "fear" the eyes of the "far" "shore" you know why this might be helpful
  let mapChars = {
    'a': [
        'æ', 'Â', 'ɑ', 'é' // Â = 'ar'; é == eɪ
    ],
  'b': ['b'],
  'c': ['ʧ'],
  'd': ['d'],
  'e': ['ɛ', 'i', 'Î', 'Ê'], // Î = ɪr; Ê = ɛr
  'f': ['f'],
  'g': ['g'],
  'h': ['h'],
  'i': ['I', 'á', 'ɝ'], // á = aɪ
  'j': ['ʤ'],
  'k': ['k'],
  'l': ['ɫ'],
  'm': ['m'],
  'n': ['n', 'ŋ'],
  'o': ['o', 'ó', 'å', 'ú', 'ʊ', 'Ô'], // o = oʊ ó = ɔɪ ú = u ʊ ?= oʊ (unclear) Ô = ʊə å = aʊ
  'p': ['p'],
  'r': ['ɹ'],
  's': ['s', 'ʃ'],
  't': ['t', 'θ', 'ð'],
  'u': ['ə'],
  'v': ['v'],
  'w': ['w'],
  'y': ['j'],
  'z': ['z', 'ʒ']}

  let isVowel = (char) => {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    if (vowels.includes(char)) return true
    return false;
  }

 const onKeyPress = (e) => {
    e.preventDefault()
    setKey(e.key)
 }
  let AddListener = () => {
    document.addEventListener('keydown', onKeyPress)
  }
  React.useEffect(AddListener, [])
  React.useEffect(()=>{setText(decodeURI(getQueryVariable('msg')))}, [])
  React.useEffect(()=>{
    if(key !== '') {
      if(key === 'q' || key === '.' || key === ';' || key === ',') {
        if(currentMod) {
          setCurrentMod('')
        } else {
          setCurrentMod('_')
        }
      } else if (key === 'Enter') {
        setpKey('')
        setText(text + currentCore + currentShell + currentMod)
        setCurrentCore('-')
        setCurrentMod('')
        setCurrentShell('')
      } else if (key === 'Backspace') {
        setpKey('')
        setText('')
        setCurrentMod('')
        setCurrentShell('')
        setCurrentCore('-')
      }
      else if (key === 'Alt') {
        navigator.clipboard.writeText("http://localhost:3000?msg=" + encodeURI(text));
      }
      else if (key === 'Escape') {
        setpKey('')
        setCurrentMod('')
        setCurrentShell('')
        setCurrentCore('-')
      } else if (key === ' ') {
        setpKey('')
        setText(text + currentCore + currentShell + currentMod + ' ')
        setCurrentCore('-')
        setCurrentMod('')
        setCurrentShell('')
      } else if (key === pkey) { // check if is repeat for t-9 like behavior
        let char = mapChars[key][i+1]
        if (undefined === char) {
          setpKey('')
          char = '-'
          if (isVowel(key)) {
            char = '' // vowels have '' as blank, not -
          }
        } else {
          seti(i+1)
        }
        if (isVowel(key)) {
          setCurrentShell(char)
        } else {
          setCurrentCore(char)
        }
      } else if (Object.keys(mapChars).includes(key)) {
        seti(0)
        setpKey(key)
        let char = mapChars[key][0]
        if (isVowel(key)) {
          setCurrentShell(char)
        } else {
          setCurrentCore(char)
        }
      }

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