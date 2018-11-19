const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = async () => {
  const fontFamilies = [
    'IBMPlexMono',
    'IBMPlexSans'
  ];

  const fontWeights = [
    'Thin',
    'ExtraLight',
    'Light',
    'Text',
    'Regular',
    'Medium',
    'SemiBold',
    'Bold'
  ];

  const fontface = random.pick(fontFamilies);
  const fontweight = random.pick(fontWeights);

  const fontName = `${fontface}-${fontweight}`
  const fontPath = `assets/fonts/${fontName}.woff2`;

  const font = new window.FontFace(
    fontName,
    `url(${fontPath})`
  );

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
    context.font = `200px ${fontName}`;
    context.fillText('SuperCollider', x, y + 400);
  };
};

canvasSketch(sketch, settings);
