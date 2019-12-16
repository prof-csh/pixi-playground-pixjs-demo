import * as PIXI from 'pixi.js';
import * as Howler from 'howler';

const app = new PIXI.Application();
const buttonsContainer = new PIXI.Container();

document.body.appendChild(app.view);

buttonsContainer.scale.set(0.3);
app.stage.addChild(buttonsContainer);

for (let i = 0; i < 10; i++) {
  makeImageButton(
  'https://cdn-images-1.medium.com/max/1600/1*DTZk1_3ih9F4rGkayz7wxg.png',
  'https://archive.org/download/Mp3Songs_175/knockout01www.songs.pk.mp3',
  'https://archive.org/download/Mp3Songs_175/rakhtcharitra01www.songs.pk.ogg',
  i * 200
  );
}

function makeImageButton(image, audioMP3, audioOGG, x = 0, y = 0) {
  const button = PIXI.Sprite.from(image);
  const sound = new Howler.Howl({
    src: [audioMP3, audioOGG]
  });

  button.x = x;
  button.y = y;
  button.interactive = true;
  button.play = true;
  button.on('pointerdown', e => {
    button.play ? sound.play() : sound.stop();
    button.play ? button.y += 20 : button.y -= 20;
    button.play = !button.play;
  });

  buttonsContainer.addChild(button);
  return button;
}