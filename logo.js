const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

// random.setSeed(random.getRandomSeed());
random.setSeed('965817');

const settings = {
  dimensions: [ 3000, 3000 ],
  suffix: random.getSeed()
};

const sketch = async ({ context, width }) => {
  const palette = random.pick(palettes);

  // This was added after a few seed options so hide for early ones
  const colors = random.shuffle(palette);
  
  const bgColor = colors.shift();
  const color1 = colors.shift();
  const color2 = colors.shift();

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

  const createFace = (context, gradient, barWidth = 80) => {
    const boxSize = 1024;
    context.fillStyle = gradient;
    context.fillRect(0, 0, boxSize, boxSize);
    context.fillStyle = bgColor;
    context.fillRect(barWidth, barWidth, boxSize - barWidth * 2, boxSize - barWidth * 2);
    context.fillStyle = gradient;
    context.fillRect(barWidth * 2, barWidth * 2, boxSize - barWidth * 4, boxSize - barWidth * 4);
    context.fillStyle = bgColor;
    context.fillRect(barWidth * 3, barWidth * 3, boxSize - barWidth * 6, boxSize - barWidth * 6);
  }

  const superFont = await createFont();
  const colliderFont = await createFont();

  // measure fonts
  const superText = 'Super';
  const fontSize = 320;
  context.font = `${fontSize}px ${superFont.family}`;
  const superWidth = context.measureText(superText).width;

  const colliderText = 'Collider';
  context.font = `${fontSize}px ${colliderFont.family}`;
  const colliderWidth = context.measureText(colliderText).width;

  const centerX = width / 2;
  const textOffset = (colliderWidth - superWidth) / 2;

  const textX = centerX - textOffset;
  const textY = 2000;

  const logoX = 1024;
  const logoY = 760;

  return ({ context, width, height }) => {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, width, height);

    // logo
    // Translate values from Julia code
    // Then made some changes to the final two translate values

    // B = [[0,0,1] [1024,0,1] [0,1024,1]]
    // o = [556,556]
    // s = [0,595]
    // e = [506,-119]
    // se = [424,207]
    // points = hcat(o+e,o,o+se+e,o+se,o+s,o+s+se+e,o+s+se)
    // rects = Vector[[4,3,7],[2,4,5],[1,3,2]]
    // for r = rects
    //     p = map(c -> vcat(points[:,c], [1]), r)
    //     p = hcat(p...)
    //     A = (B' \ p')'
    //     println(join(reshape(A[1:2,:], 6), ", "))
    // end

    const gradientSE = context.createLinearGradient(0, 0, 1024, 1024);
    gradientSE.addColorStop(0, color2);
    gradientSE.addColorStop(1, color1);

    const gradientNW = context.createLinearGradient(1024, 0, 0, 1024);
    gradientNW.addColorStop(0, color2);
    gradientNW.addColorStop(1, color1);

    const gradientN = context.createLinearGradient(0, 0, 1024, 1024);
    gradientN.addColorStop(1, color2);
    gradientN.addColorStop(0, color1);
    
    context.setTransform(0.494140625, -0.1162109375, 0.0, 0.5810546875, 424 + logoX, 326 + logoY);
    createFace(context, gradientSE);

    context.setTransform(0.4140625, 0.2021484375, 0.0, 0.5810546875, 0 + logoX, 119 + logoY);
    createFace(context, gradientNW);

    context.setTransform(0.4140625, 0.2021484375, -0.494140625, 0.1162109375, 506 + logoX, 0 + logoY);
    createFace(context, gradientN, 100);

    context.resetTransform();

    // logotype

    context.fillStyle = color1;
    context.textAlign = 'right';
    context.textBaseline = 'middle';
    context.font = `${fontSize}px ${superFont.family}`;
    context.fillText(superText, textX, textY);

    context.fillStyle = color2;
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.font = `${fontSize}px ${colliderFont.family}`;
    context.fillText(colliderText, textX, textY);
  };
};

canvasSketch(sketch, settings);
