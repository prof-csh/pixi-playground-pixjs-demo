import * as PIXI from 'pixi.js';

import Duck from './duck.js';

const appOptions = {
  width: window.innerWidth,
  height: window.innerHeight
};
const app = new PIXI.Application(appOptions);
document.body.appendChild(app.view);

window.onresize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
};

const lake = createLake();
const ducks = [];
const breads = [];
app.stage.addChild(lake);

for(let i = 0; i < 15; i++) {
  const duck = new Duck(lake);

  duck.x = getRandomNumber(0, app.renderer.width - 150);
  duck.y = getRandomNumber(0, app.renderer.height - 150);
  ducks.push(duck);
}

app.ticker.add(delta => {
  ducks.forEach(duck => duck.tick(delta));
});

function createLake() {
  const lake = new PIXI.Graphics();

  lake.interactive = true;
  lake.beginFill(0x09bac0);
  lake.drawRect(0, 0, app.renderer.width, app.renderer.height);

  lake.on('pointerdown', e => {
    const { x, y } = e.data.global;
    const bread = createBread(lake, x,  y);
    
    breads.push(bread);
    ducks.forEach(duck => duck.target = bread);
  });

  return lake;
}

function createBread(container, x, y) {
  const bread = new PIXI.Sprite.from('https://preview.ibb.co/f45O0p/purepng_com_bread_vectorfood_bread_cartoon_clipart_vector_941524600327e9k0l.png');

  bread.x = x;
  bread.y = y;
  bread.hitPoints = 3;
  bread.scale.set(0.07);

  bread.timeout = setTimeout(() => {
    container.removeChild(bread);
  }, 2000)

  container.addChild(bread);
  container.setChildIndex(bread, 0);

  return bread;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}