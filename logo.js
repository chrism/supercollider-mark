const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = async ({ context, width }) => {  
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

  const superFont = await createFont();
  const colliderFont = await createFont();

  // measure fonts
  const superText = 'Super';
  const fontSize = 200;
  context.font = `${fontSize}px ${superFont.family}`;
  const superWidth = context.measureText(superText).width;

  const colliderText = 'Collider';
  context.font = `${fontSize}px ${colliderFont.family}`;
  const colliderWidth = context.measureText(colliderText).width;

  const centerX = width / 2;
  const textOffset = (colliderWidth - superWidth) / 2; 


  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    const textX = centerX - textOffset;
    const textY = 1500;
    context.fillStyle = 'black';    

    context.textAlign = 'right';
    context.textBaseline = 'middle';
    context.font = `${fontSize}px ${superFont.family}`;
    context.fillText(superText, textX, textY);

    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.font = `${fontSize}px ${colliderFont.family}`;
    context.fillText(colliderText, textX, textY);
  };
};

canvasSketch(sketch, settings);
