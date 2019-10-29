class Controller {
  constructor(view, service) {
    this.view = view;
    this.service = service;

    this.service.getJSONFile().then(() => {
      this.service.setHTMLBody().then(() => {
        this.view.loadHTMLBody(this.handleHTMLBody);
        this.view.loadDOMElements();
        this.view.getAlphabet(this.handleAlphabet);
        this.view.startGame(
          this.bindStartGame,
          this.handleDiscoveredLetters,
          this.handleLetterComprobation
        );

        this.view.addButtonClickEvent(this.handleDiscoveredLetters);
      });
    });
  }

  bindStartGame = () => {
    this.service.setWord();
  };

  handleHTMLBody = () => {
    return this.service.getHTMLBody();
  };

  handleDiscoveredLetters = () => {
    return this.service.getDiscoveredLetters();
  };

  handleLetterComprobation = letter => {
    return this.service.checkIfLetterExists(letter);
  };

  handleAlphabet = () => {
    return this.service.getAlphabet();
  };

  checkLetter = letter => {
    return this.service.checkIfLetterExists(letter);
  };

  handleCorrectWord = () => {
    return this.service.getSelectedWord();
  };
}
