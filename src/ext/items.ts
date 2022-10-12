function getItemPos(items: any, itemId: string) {
  let pos = -1;
  items.forEach((tab: any, index: number) => {
    if (tab.childId === itemId) {
      pos = index;
    }
  });
  return pos;
}

const containerItems = (_options: any) => {
  //   const activePos = getItemPos(items, itemId);
  //   return {
  //   };
};

export default containerItems;
