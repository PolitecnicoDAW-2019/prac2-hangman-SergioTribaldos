class View {
  constructor() {
    this.rootElement = document.getElementById('body');

    this.arrButtons = [];

    this.alphabet;
    this.discoveredLetters;
    this.isLetterFound;

    this.deathSequence = [
      () => {
        this.ctx.moveTo(219, 440);
        this.ctx.lineTo(380, 440);
        this.ctx.stroke();
      },
      () => {
        this.ctx.moveTo(296, 440);
        this.ctx.lineTo(296, 150);
        this.ctx.stroke();
      },
      () => {
        this.ctx.moveTo(296, 150);
        this.ctx.lineTo(426, 150);
        this.ctx.stroke();
      },
      () => {
        this.ctx.moveTo(426, 150);
        this.ctx.lineTo(426, 182);
        this.ctx.stroke();
      },
      () => {
        this.ctx.beginPath();
        this.ctx.arc(426, 200, 20, 0, 2 * Math.PI);
        this.ctx.stroke();
      },
      () => {
        this.ctx.moveTo(426, 220);
        this.ctx.lineTo(426, 292);
        this.ctx.stroke();
      },
      () => {
        this.ctx.moveTo(397, 244);
        this.ctx.lineTo(467, 244);
        this.ctx.stroke();
      },
      () => {
        this.ctx.moveTo(426, 288);
        this.ctx.lineTo(398, 333);
        this.ctx.stroke();
        this.ctx.moveTo(426, 288);
        this.ctx.lineTo(451, 333);
        this.ctx.stroke();
      }
    ];
  }

  loadDOMElements() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.lettersContainer = document.getElementById('lettersContainer');
    this.startGameBtn = document.getElementById('startGameBtn');
  }

  startGame(startGame, getDiscoveredLetters, checkIfLetterExists) {
    this.startGameBtn.addEventListener('click', () => {
      this.clearScreen();
      startGame();
      this.getLettersButtons();
      this.addButtonClickEvent(checkIfLetterExists);
      this.discoveredLetters = getDiscoveredLetters();
      this.paintLetters();
      this.startGameBtn.disabled = true;
    });
  }

  getAlphabet(getAlphabet) {
    this.alphabet = getAlphabet();
  }

  getLettersButtons() {
    this.lettersContainer.innerHTML = '';
    for (let letter of this.alphabet) {
      let clickableDiv = document.createElement('div');
      clickableDiv.setAttribute('id', letter);
      clickableDiv.setAttribute('class', 'letter');
      clickableDiv.innerHTML = letter;
      this.lettersContainer.append(clickableDiv);

      this.arrButtons.push(clickableDiv);
    }
  }

  addButtonClickEvent(checkLetters) {
    for (let button of this.arrButtons) {
      button.addEventListener('click', () => {
        const infoFromService = checkLetters(button.innerHTML);
        this.discoveredLetters = infoFromService.lettersArray;
        this.winCondition = infoFromService.winCondition;

        this.checkWinCondition(this.winCondition);

        if (!infoFromService.isLetterFound) {
          this.deathSequence[infoFromService.failCounter]();
        }

        button.classList.add('button-pressed');
        button.style.pointerEvents = 'none';

        this.paintLetters();
      });
    }
  }

  paintLetters() {
    this.ctx.font = '30px Monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      this.discoveredLetters.join(' '),
      this.canvas.width / 2,
      60
    );
  }

  clearScreen() {
    this.canvas.width = 800;
    this.canvas.height = 500;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  loadHTMLBody(getHTMLBody) {
    this.rootElement.innerHTML = getHTMLBody();
  }

  checkWinCondition(winCondition) {
    if (winCondition === 'win') {
      alert('win');
      this.startGameBtn.disabled = false;
      this.lettersContainer.innerHTML = '';
    } else if (winCondition === 'loose') {
      alert('loose');
      this.paintLetters();
      this.startGameBtn.disabled = false;
      this.lettersContainer.innerHTML = '';
    }
  }
}
