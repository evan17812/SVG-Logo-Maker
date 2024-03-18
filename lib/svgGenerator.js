const fs = require('fs');

class SvgGenerator {
  constructor(text, textColor, shape, shapeColor, existingSvgPath) {
    this.text = text;
    this.textColor = textColor;
    this.shape = shape;
    this.shapeColor = shapeColor;
    this.existingSvgPath = existingSvgPath;
  }

  generateSvg() {
    let svgContent;

    if (this.existingSvgPath) {
      svgContent = fs.readFileSync(this.existingSvgPath, 'utf8');
    } else {
      const shapeInstance = new this.shape();
      shapeInstance.setColor(this.shapeColor);

      svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          ${shapeInstance.render()}
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${this.textColor}">
            ${this.text}
          </text>
        </svg>
      `;
    }

    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
  }
}

module.exports = SvgGenerator;