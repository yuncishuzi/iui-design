// 获取元素节点信息
export function getRect(context, selector, needAll = false) {
  return new Promise((resolve, reject) => {
    uni
      .createSelectorQuery()
      .in(context)
      [needAll ? "selectAll" : "select"](selector)
      .boundingClientRect((rect) => {
        if (rect) {
          resolve(rect);
        } else {
          reject(rect);
        }
      })
      .exec();
  });
}
