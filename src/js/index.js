import Slot from './Slot.js';

const config = {
  inverted: true // true: reels spin from top to bottom; false: reels spin from bottom to top
}

const slot = new Slot(document.getElementById('slot'), config);

// Array of drawed numbers
let drawedNumbers = [];

// Avoid hitting multiple enter-keys
let hittedEnter = false;

// Hit enter to spin the wheels
document.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13 && !hittedEnter) {
    const result = slot.spin(drawedNumbers);
    hittedEnter = true;
    result.then(function(value) {
      console.log("Drawed numbers: " + value);
      hittedEnter = false;
    });
  }
});
