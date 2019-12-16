import * as PIXI from 'pixi.js';

const log = console.log;
const app = new PIXI.Application();

document.body.appendChild(app.view);

const button = PIXI.Sprite.from('https://cdn-images-1.medium.com/max/1600/1*DTZk1_3ih9F4rGkayz7wxg.png');
button.interactive = true;
button.buttonMode = true;
button.anchor.set(0.5);
button.x = button.y = 150;;

app.stage.addChild(button);

button
  .on('pointerdown', onDragStart)
  .on('pointerup', onDragEnd)
  .on('pointerupoutside', onDragEnd)
  .on('pointermove', onDragMove);


app.ticker.add(delta => {
  if (button.dragging) {
    button.rotation += 0.1 * delta;
  }
})


function onDragStart(e) {
  log('Hi');
  button.data = e.data;
  button.dragging = true;
}

function onDragEnd(e) {
  delete button.data;
  button.dragging = false;
}

function onDragMove(e) {
  if (button.dragging) {
    const newPosition = button.data.getLocalPosition(button.parent);

    button.x = newPosition.x;
    button.y = newPosition.y;
  }
}