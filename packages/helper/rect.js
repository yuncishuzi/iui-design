export function getRect(context, selector, needAll = false) {
  return new Promise((resolve, reject) => {
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
