const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = async () => {
  const font = new window.FontFace('IBMPlexMono-Regular', 'url(assets/fonts/IBMPlexMono-Regular.woff2)');

  await font.load();
  document.fonts.add(font);

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const x = width / 2;
    const y = height / 2;

    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `200px "IBMPlexMono-Regular"`;
    context.fillText('SuperCollider', x, y + 400);
  };
};

canvasSketch(sketch, settings);
