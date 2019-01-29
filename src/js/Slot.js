import Symbol from './Symbol.js';
import Reel from './Reel.js';

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.currentSymbols = [
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ];

    this.nextSymbols = [
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName('reel')).map((reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx]));

    this.spinButton = document.getElementById('spin');
    this.spinButton.addEventListener('click', () => this.spin());

    if (config.inverted) {
      this.container.classList.add('inverted');
    } 
  }

  spin(alreadyDrawed) {
    this.onSpinStart();

    console.log("Already drawed number: " + alreadyDrawed);

    var minAllowedNumber = 1;
    var maxAllowedNumber = 1000;
    var drawed = [];

    // Populate unique random numbers
    var notAllowedNumber = true;
    while(notAllowedNumber) {
      drawed[1] = [Symbol.random(), Symbol.random(), Symbol.random(), Symbol.random()];
      var drawedNumber = "";
      drawed[1].forEach(function(value) {
        drawedNumber += String(value)
      });
      // Must be within allowed range
      if (drawedNumber >= minAllowedNumber && drawedNumber <= maxAllowedNumber) {
        // Check if the number has already been drawed (or even just drawed)
        if (!alreadyDrawed.includes(drawedNumber)) {
          alreadyDrawed.push(drawedNumber);
          notAllowedNumber = false;
          drawed = this.getAllNumbers(drawed, drawedNumber);
        }
      }
    }
    
    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [drawed[0][0], drawed[1][0], drawed[2][0]],
      [drawed[0][1], drawed[1][1], drawed[2][1]],
      [drawed[0][2], drawed[1][2], drawed[2][2]],
      [drawed[0][3], drawed[1][3], drawed[2][3]],
    ];

    return Promise.all(this.reels.map(reel => {
      reel.renderSymbols(this.currentSymbols[reel.idx], this.nextSymbols[reel.idx]);
      return reel.spin();
    })).then(() => this.onSpinEnd(alreadyDrawed));
  }

  onSpinStart() {
    this.spinButton.disabled = true;

    console.log('SPIN START');
  }

  onSpinEnd(alreadyDrawed) {
    this.spinButton.disabled = false;
    return alreadyDrawed;
    console.log('SPIN END');
  }

  getAllNumbers(drawedArray, drawedNumber) {
    var previousNumber = (drawedNumber == 0 ? "1000" : parseInt(drawedNumber)-1);
    var nextNumber = (drawedNumber == 1000 ? "0001" : parseInt(drawedNumber)+1);
    drawedArray[0] = String(previousNumber).padStart(4, '0');
    drawedArray[2] = String(nextNumber).padStart(4, '0');
    return drawedArray;
  }

}
