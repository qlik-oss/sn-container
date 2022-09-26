import themeStyleMatrix from '../theme-style-matrix';

describe('theme-style-matrix', () => {
  it('should return correct theme matrix', () => {
    const matrix = themeStyleMatrix;
    expect(matrix[0][0]).toEqual('object.container');
    expect(matrix[0][2]).toEqual('fontFamily');
  });
});
