import fs from 'fs';
import inquirer from 'inquirer';

async function run() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "Shape",
            message: "What shape would you like your logo to be?",
            choices: ["Square", "Circle", "Triangle"],
        },
        {
            type: "input",
            name: "ShapeColor",
            message: "What color would you like your shape to be?",
        },
        {
            type: "input",
            name: "Text",
            message: "Type (3) characters for the logo name",
        },
        {
            type: "input",
            name: "TextColor",
            message: "What color would you like your text to be?",
        }
    ]);

    const Logo = generateSVGLogo(answers);
    console.log(Logo);

    fs.writeFileSync('logo.svg', Logo, 'utf-8');
    console.log('SVG Created');
}

function generateSVGLogo(answers) {
    const { Shape, ShapeColor, Text, TextColor } = answers;
    let shapeSVG = '';

    switch (Shape) {
        case 'Square':
            shapeSVG = `<rect width="100" height="100" fill="${ShapeColor}" />`;
            break;
        case 'Circle':
            shapeSVG = `<circle cx="50" cy="50" r="50" fill="${ShapeColor}" />`;
            break;
        case 'Triangle':
            shapeSVG = `<polygon points="50,15 100,100 0,100" fill="${ShapeColor}" />`;
            break;
        default:
            break;
    }

    const textSVG = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${TextColor}" font-size="20">${Text}</text>`;
    
    return `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">${shapeSVG}${textSVG}</svg>`;
}

run();