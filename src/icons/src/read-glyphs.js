/* copied from sprout */
const fs = require('fs');
const path = require('path');

const { DOMParser } = require('xmldom');

const parseSvgImage = (data, filename) => {
  const doc = new DOMParser().parseFromString(data, 'application/xml');
  if (!doc.getElementsByTagName('svg')[0]) {
    throw new Error(`Missing svg element in ${filename}`);
  }
  const svg = doc.getElementsByTagName('svg')[0];

  if (!svg.hasAttribute('viewBox')) {
    throw new Error(`Missing viewBoxt attribute in ${filename}`);
  }

  const viewBox = svg.getAttribute('viewBox').split(' ');
  const width = parseFloat(viewBox[2], 10);
  const height = parseFloat(viewBox[3], 10);

  let p = svg.getElementsByTagName('path');

  if (p.length > 1) {
    throw new Error(`Multiple paths not supported${filename ? ` (${filename} ` : ''}`);
  }
  if (p.length === 0) {
    throw new Error(`No path data fount${filename ? ` (${filename} ` : ''}`);
  }

  // eslint-disable-next-line prefer-destructuring
  p = p[0];

  const d = p
    .getAttribute('d')
    .replace(/\r\n\t/g, '')
    .replace(/\r\t/g, '')
    .replace(/\n\t/g, '');

  let transform = '';

  if (p.hasAttribute('transform')) {
    transform = p.getAttribute('transform');
  }

  return { height, width, d, transform };
};

/**
 * Read icons from the /icons directory
 */
module.exports = (iconsDir) => {
  const glyphs = [];

  const files = fs.readdirSync(iconsDir);
  files
    .filter((filename) => filename.indexOf('.svg') > -1)
    .forEach((filename) => {
      const data = fs.readFileSync(path.join(iconsDir, filename), 'utf8');
      const svgData = parseSvgImage(data, filename);
      const name = filename.replace(/-/g, '_').replace(/\.svg$/, '');
      glyphs.push({
        name,
        className: name.replace(/_/g, '-'),
        d: svgData.d,
        height: svgData.height,
        width: svgData.width,
      });
    });

  return glyphs;
};
