interface LayoutServiceMetaProps {
  layout: Layout;
}

export default function createLayoutServiceMetaFn() {
  return function layoutServiceMeta({ layout }: LayoutServiceMetaProps) {
    const isSnapshot = !!layout.snapshotData;

    return { isSnapshot };
  };
}
