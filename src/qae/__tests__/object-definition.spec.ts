import objectDefinition from '../object-definition';

describe('qae object-definition', () => {
  it('should return proper structure of object-definition', () => {
    const object = objectDefinition();
    const expected = {
      showTitles: true,
      subtitle: '',
      title: '',
    };
    expect(object).toMatchObject(expected);
  });
});
