const sharp = require('sharp');
const path = require('path');

async function cropLogoRectangular() {
  try {
    const inputPath = path.join(__dirname, 'public', 'lejel-labs-logo.png');
    const outputPath = path.join(__dirname, 'public', 'lejel-labs-logo-rectangular.png');
    
    // Get image metadata first
    const metadata = await sharp(inputPath).metadata();
    console.log('Original image dimensions:', metadata.width, 'x', metadata.height);
    
    // Create a 2:1 rectangular crop (wider than tall)
    // Since the original is 500x500, we'll make it 400x200 (2:1 ratio)
    const cropWidth = 450;  // Keep more width
    const cropHeight = 250; // Less height for 2:1 ratio
    const left = Math.floor((metadata.width - cropWidth) / 2);   // Center horizontally
    const top = Math.floor((metadata.height - cropHeight) / 2);  // Center vertically
    
    console.log(`Cropping from ${left},${top} with size ${cropWidth}x${cropHeight}`);
    
    await sharp(inputPath)
      .extract({ 
        left: left, 
        top: top, 
        width: cropWidth, 
        height: cropHeight 
      })
      .png()
      .toFile(outputPath);
    
    console.log('Rectangular logo cropped successfully!');
    console.log('Output saved to:', outputPath);
    console.log('New dimensions: 400x200 (2:1 ratio)');
    
  } catch (error) {
    console.error('Error cropping logo:', error);
  }
}

cropLogoRectangular();
