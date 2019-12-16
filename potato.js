import * as PIXI from 'pixi.js';
import * as Howler from 'howler';

const appOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x222222
};
const app = new PIXI.Application(appOptions);

document.body.appendChild(app.view);

let score = 0;
const scoreText = new PIXI.Text('Score: 0');

scoreText.style = new PIXI.TextStyle({ fill: 0xffffff });
setScorePosition();

app.stage.addChild(scoreText);


for (let i = 0; i < 50; i++) {
  setTimeout(() => {
    app.stage.addChild(createButton(...getRandomPotatoProps()))
  }, i * 800)
}


function setScore(val) {
  score = val;
  scoreText.setText(`Score: ${val}`);
  setScorePosition();
}

function setScorePosition() {
  scoreText.x = app.screen.width - scoreText.width - 10;
}

function createButton(img, mp3, points, x = 0, y = 0, rotation = 0, scale = 1) {
  const button = PIXI.Sprite.from(img);
  const sound = new Howler.Howl({ src: mp3 });

  button.x = x;
  button.y = y;
  button.rotation = rotation;
  button.scale.set(scale);
  button.anchor.set(0.5);
  button.interactive = button.buttonMode = true;

  button.interval = setInterval(() => {
    button.y += 1;

    if (button.y > window.innerHeight) {
      setScore(score -= points);
      button.parent.removeChild(button);
      clearInterval(button.interval);
    }
  }, 10)

  button.on('pointerdown', e => {
    sound.play();
    button.parent.removeChild(button);
    setScore(score + points);
    clearInterval(button.interval);
  });

  return button;
}

function getRandomPotatoProps() {
  return [
    'https://vignette.wikia.nocookie.net/central/images/c/c2/Potato.png/revision/latest?cb=20171007181904',
    'https://www.freesfx.co.uk/rx2/mp3s/4/16640_1460665329.mp3',
    100,
    getRandomNumber(100, window.innerWidth - 100),
    0,
    getRandomNumber(0, 360),
    0.2
  ];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min); 
}

window.onresize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  setScorePosition();
}