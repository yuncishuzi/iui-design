export function getRect(context, selector, needAll = false) {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    setTimeout(() => {
    // #endif
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
    // #ifdef H5
    }, 5);
    // #endif
  });
}
