import Slot from './Slot.js';

const config = {
  inverted: true // true: reels spin from top to bottom; false: reels spin from bottom to top
}

const slot = new Slot(document.getElementById('slot'), config);

// Hit enter to spin the wheels
document.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    slot.spin();
  }
});
