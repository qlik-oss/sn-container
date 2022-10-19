const getMergedChildrenList = (layout: Layout) => {
  const chartObjects: MergedLayoutChild[] = [];
  layout.children?.map((child: PropertiesChild) => {
    const childListItem = layout.qChildList?.qItems.find((innerItem: any) =>
      child.isMaster ? innerItem.qData.qExtendsId === child.refId : innerItem.qData.containerChildId === child.refId
    );
    if (childListItem) {
      chartObjects.push({ ...child, ...childListItem });
    }
  });

  return chartObjects;
};

const getMergedChild = (layout: Layout, refId: string) => {
  const [child] = layout.children.filter((item) => item.refId === refId);
  if (child) {
    const childInList = layout.qChildList?.qItems.find((innerItem: any) =>
      child.isMaster ? innerItem.qData.qExtendsId === child.refId : innerItem.qData.containerChildId === child.refId
    );
    if (childInList) {
      return { ...child, ...childInList };
    }
  }
  return undefined;
};

export { getMergedChildrenList, getMergedChild };
