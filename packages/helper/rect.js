// 获取元素节点信息
export function getRect(context, selector, needAll = false) {
  return new Promise((resolve, reject) => {
    // PC预览时，会将组件的高度设置为0，所以需要延迟获取
    setTimeout(() => {
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
    }, 5);
  });
}
