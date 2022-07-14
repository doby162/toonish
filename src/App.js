import logo from './logo.svg';
import React from "react";
import './App.css';

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
  'o': ['o', 'ó', 'ó', 'ú', 'ʊ', 'Ô'], // o = oʊ ó = ɔɪ ú = aʊ ʊ ?= oʊ (unclear) Ô = ʊə
  'p': ['p'],
  // 'q': ['k'],
  'r': ['ɹ'],
  's': ['s', 'ʃ'],
  't': ['t', 'θ', 'ð'],
  'u': ['ə'], // switch with e in the font
  'v': ['v'],
  'w': ['w'],
  // 'x': ['ks'],
  'y': ['j'],
  'z': ['z', 'ʒ']}

  let isVowel = (char) => {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    if (vowels.includes(char)) return true
    return false;
  }
  let vowelRunes = mapChars['a'].concat(mapChars['e']).concat(mapChars['i'])
      .concat(mapChars['o']).concat(mapChars['u'])
  vowelRunes = vowelRunes.flat()
  let isVowelRune = (char) => {
    if (vowelRunes.includes(char)) return true
    return false
  }

 const onKeyPress = (e) => {
    setKey(e.key)
 }
  let AddListener = () => {
    document.addEventListener('keydown', onKeyPress)
  }
  React.useEffect(AddListener, [])
  React.useEffect(()=>{
    if(key !== '') {
      if(key === 'q') {
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
      // for debugging the font itself
      // else if (key === 'Alt') {
      //   let allPossibleRunes = []
      //   let testStrings = Object.values(mapChars).flat()
      //   testStrings.map((rune1) => {
      //     if (!isVowelRune(rune1)) {
      //       testStrings.map((rune2) => {
      //         if (isVowelRune(rune2)) {
      //           allPossibleRunes.push(rune1+rune2)
      //         }
      //       })
      //     }
      //   })
      //   let allPossibleRuneCombos = []
      //   allPossibleRunes.map((rune1) => {
      //     allPossibleRunes.map((rune2) => {
      //       allPossibleRuneCombos.push(rune1)
      //       allPossibleRuneCombos.push(rune2)
      //       allPossibleRuneCombos.push(rune1+rune2)
      //     })
      //   })
      //   let bigString = ''
      //   allPossibleRuneCombos.forEach((c) => bigString = bigString + c + ' ')
      //   setText(bigString)
      // }
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
      } else if (key == pkey) { // check if is repeat for t-9 like behavior
        let char = mapChars[key][i+1]
        if (undefined == char) {
          setpKey('')
          char = '-'
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

// shell mods
// top left: w
// top right: r
// bottom left: s
// bottom right: f
// left: d
// inverter: e
// fill all: a
//
// core mods
// top left: u
// top middle: i
// top right: o
// bottom left: j
// bottom middle: k
// bottom right: l
// fill all: ;
//
// enter: copy finished rune to word and end word
// space: copy  finished rune to word
// tab: finish word without copying a rune, basically space tab is equivilant to enter.
// escape: delete sentence
// backspace: remove a rune or symbol. Or for simplicity, delete back to the most recent space char.
// punctuation: enters actual punctuation ahead of the current rune
// numbers: actual numbers ahead of the current rune
// @ sign: is a weird one because the font just straight up displays the word at lol. I _think_ that's ok as is- kind of nifty
//
// it is possible via this method to specify an impossible rune, IE by only having the leftmost shell segment or by only having 1 core segment.
// ideally I would just display these symbols anyway but I think invalid vowels should be omitted and invalid consanants replaced with a -
// the "final" solution would be to enhance the font but that's out of scope for now. Or I could display the runes without the font!
// that reminds me, it would be smart to block underscores and dashes from being entered, since they are going to screw up the ligatures.
// a key to toggle code tags would also be a really interesting addition.
// also, I think it would make sense to modify the rune in one piece, rather than in two pieces. Maybe the rune could be really big in the middle while you work on it, complete with the horizontal line
//
// ideally the rune you are working on would also have the phonetic symbols to tell you what it sounds like

// a glass arm swan bay
// b baby
// c chat
// d dog
// e end bee beer air
// f fox
// g gun
// h hop
// i bit guy bird
// j jam
// k kart
// l live
// m man
// n net rink
// o toe toy too wolf how ore
// p pop
// q (k and w ?)
// r run
// s sit shut
// t tunic thick the
// u the
// v vine
// w wit
// x (could do a k and s rune)
// y you
// z zit azure