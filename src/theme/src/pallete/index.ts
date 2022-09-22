import lightPalette from './light';

const getPalette = (variant: string) => {
  switch (variant) {
    case 'light':
    default:
      return lightPalette;
  }
};

export default getPalette;
