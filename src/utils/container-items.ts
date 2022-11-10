import containerUtil from './container-util';

const getMergedChildrenList = (layout: Layout, ignoreInvisible?: boolean) => {
  const chartObjects: MergedLayoutChild[] = [];
  layout.children?.map((child: LayoutChild) => {
    const childListItem = layout.qChildList?.qItems.find((innerItem: any) =>
      child.isMaster ? innerItem.qData.qExtendsId === child.refId : innerItem.qData.containerChildId === child.refId
    );
    if (childListItem) {
      const visible = containerUtil.evaluateCondition(child.condition);
      if (!ignoreInvisible || visible) {
        chartObjects.push({ ...child, ...childListItem, visible: containerUtil.evaluateCondition(child.condition) });
      }
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
