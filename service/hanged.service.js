class Service {
  constructor() {
    this.HTMLBody;
    this.arrayOfWords;
    this.selectedWord;
    this.discoveredLetters;
    this.maxAttempts = 7;
    this.failCounter;
    this.winCondition = '';
  }
  getAlphabet() {
    return [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];
  }

  setWord() {
    this.failCounter = -1;

    this.winCondition = '';
    let randomIndex = Math.floor(Math.random() * this.arrayOfWords.length);
    this.selectedWord = this.arrayOfWords[randomIndex].split('');
    this.arrayOfWords.splice(randomIndex, 1);

    this.discoveredLetters = [...this.selectedWord].fill('_');
  }

  getDiscoveredLetters() {
    return this.discoveredLetters;
  }

  checkIfLetterExists = selectedLetter => {
    let letterFound = false;

    this.discoveredLetters = this.selectedWord.map((letra, index, array) => {
      let letter = this.discoveredLetters[index];
      if (array[index] === selectedLetter) {
        letterFound = true;
        letter = letra;
      }
      return letter;
    });
    letterFound ? this.failCounter : this.failCounter++;
    if (this.failCounter === this.maxAttempts) {
      this.winCondition = 'loose';
      this.discoveredLetters = this.selectedWord;
    } else if (this.discoveredLetters.join() === this.selectedWord.join()) {
      this.winCondition = 'win';
    }

    return {
      lettersArray: this.discoveredLetters,
      isLetterFound: letterFound,
      failCounter: this.failCounter,
      winCondition: this.winCondition
    };
  };

  getSelectedWord() {
    return this.selectedWord;
  }

  getJSONFile() {
    return fetch('http://localhost:5000/resources/words.json')
      .then(function(response) {
        return response.json();
      })
      .then(arrayJSON => {
        this.arrayOfWords = arrayJSON.words;
      });
  }

  setHTMLBody() {
    return fetch('/view/body.html')
      .then(body => body.text())
      .then(body => (this.HTMLBody = body));
  }
  getHTMLBody() {
    return this.HTMLBody;
  }
}
