import createLayoutServiceMetaFn from '../meta';
import layoutMock from '../../../mocks/layout';

describe('layout-service', () => {
  let layout: Layout;

  beforeEach(() => {
    layout = layoutMock.container;
  });

  it('should return correct meta', () => {
    const layoutServiceMeta = createLayoutServiceMetaFn();
    const { isSnapshot } = layoutServiceMeta({ layout });
    expect(isSnapshot).toEqual(false);
  });

  it('should return correct meta when is snapshot', () => {
    const layoutServiceMeta = createLayoutServiceMetaFn();
    layout.snapshotData = { key: 'snapshot-data' };
    const { isSnapshot } = layoutServiceMeta({ layout });
    expect(isSnapshot).toEqual(true);
  });
});
