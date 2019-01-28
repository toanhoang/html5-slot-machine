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
      ['0', '0', '0'],
    ];

    this.nextSymbols = [
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
      ['0', '0', '0'],
    ]

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName('reel')).map((reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx]));

    this.spinButton = document.getElementById('spin');
    this.spinButton.addEventListener('click', () => this.spin());

    this.autoPlayCheckbox = document.getElementById('autoplay');

    if (config.inverted) {
      this.container.classList.add('inverted');
    } 
  }

  spin() {
    this.onSpinStart();

    // Get random symbols for all reels
    // Extract middle symbol and concat
    // Test against min/max number
    // Verify that number does not exists in array
    // If exists, do it again
    // Else show and add to array to avoid next pick to match

    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];

    return Promise.all(this.reels.map(reel => {
      reel.renderSymbols(this.currentSymbols[reel.idx], this.nextSymbols[reel.idx]);
      return reel.spin();
    })).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.spinButton.disabled = true;

    console.log('SPIN START');
  }

  onSpinEnd() {
    this.spinButton.disabled = false;

    console.log('SPIN END');
  }
}
