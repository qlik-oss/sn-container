/* copied from sprout */
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const readGlyphs = require('./read-glyphs');
const generateReactComponents = require('./generate-react-components');

const iconsDir = path.resolve(__dirname, '../svg');
const distDir = path.resolve(__dirname, '../');
const glyphs = readGlyphs(iconsDir);

const reactComponents = generateReactComponents(glyphs);
const writeComponents = () => {
  reactComponents.forEach((component) => {
    const file = path.join(distDir, component.filename);
    fs.writeFileSync(file, component.code, 'utf8');
  });
};
writeComponents();

module.exports = {
  writeComponents,
};
