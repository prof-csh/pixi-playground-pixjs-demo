import * as PIXI from 'pixi.js';

const app = new PIXI.Application();

document.body.appendChild(app.view);

const datDot = new PIXI.Graphics();
datDot.beginFill(0xff0000);
datDot.drawCircle(0, 0, 20);
datDot.x = 100;
datDot.y = 100;
app.stage.addChild(datDot);

let xv = .1;
let yv = .1;
let mousePosition = getMousePosition();
const speed = 3;
const angle = 45;

app.ticker.add(() => {
  mousePosition = getMousePosition();
  
  const dx = mousePosition.x - datDot.x;
  const dy = mousePosition.y - datDot.y;

  angle = Math.atan2(dy, dx);
  xv = Math.cos(angle) * speed;
  yv = Math.sin(angle) * speed;

  datDot.x += xv;
  datDot.y += yv;
})

function getMousePosition() {
  return app.renderer.plugins.interaction.mouse.global;
}