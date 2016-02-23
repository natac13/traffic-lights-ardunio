import { Board, Led } from 'johnny-five';

const board = new Board({
  port: '/dev/ttyACM0'
});

board.on('ready', function ready() {
  console.log('Board is ready');
  const led = new Led(11);

  led.pulse({
    easing: 'linear',
    duration: 3000,
    cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
    keyFrames: [0, 10, 0, 50, 0, 255],
    onstop: () => console.log('Animation has stopped')
  });

  this.wait(12000, () => {
    led.stop().off()
  });

});