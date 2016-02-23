import { Board, Led } from 'johnny-five';
import Promise from 'bluebird';

const board = new Board({
  port: '/dev/ttyACM0'
});

board.on('ready', function ready() {
  console.log('Board is ready');
  const red = new Led(13);
  const yellow = new Led(12);
  const green = new Led(8);

  const stop = () => {
    return new Promise((resolve, reject) => {
      green.off();
      yellow.off();
      red.on();
      setTimeout(() => {
        resolve();
      }, 4000);
    });

  }

  const amber = () => {
    return new Promise((resolve, reject) => {
      green.off();
      yellow.on();
      red.off();
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  const go = () => {
    return new Promise((resolve, reject) => {
      green.on();
      yellow.off();
      red.off();
      setTimeout(() => {
        resolve()
      }, 4000);
    });
  }

  stop().then(go).then(amber)
  this.loop(10000, () => {
    stop().then(go).then(amber);
  })

});