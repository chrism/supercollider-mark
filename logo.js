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

  const createFont = async () => {
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

    return font;
  }

  const firstFont = await createFont();
  const secondFont = await createFont();


  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const x = width / 2;
    const y = height / 2;

    context.fillStyle = 'black';
    context.textAlign = 'right';
    context.textBaseline = 'middle';
    context.font = `200px ${firstFont.family}`;
    context.fillText('Super', x, y + 400);

    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.font = `200px ${secondFont.family}`;
    context.fillText('Collider', x, y + 400);
  };
};

canvasSketch(sketch, settings);
