export default function createLayoutServiceMetaFn() {
  return function layoutServiceMeta({ layout }) {
    const isSnapshot = !!layout.snapshotData;

    return {
      isSnapshot,
    };
  };
}
