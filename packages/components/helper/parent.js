import { getCurrentInstance, computed } from "vue";
import { isEmpty } from "./is";
// 获取父组件
export function getParent(name, k1, k2) {
  const { proxy } = getCurrentInstance();

  const next = () => {
    let parent = proxy.$parent;

    while (parent) {
      // console.log(parent);

      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        if (!isEmpty(k2)) {
          nextTick(() => {
            const child = {};

            (k2 || []).map((key) => {
              if (proxy[key]) {
                child[key] = proxy[key];
              }
            });

            if (!parent.__children) {
              parent.__children = [];
            }

            if (!isEmpty(child)) {
              parent.__children.push(child);
            }
          });
        }

        return (k1 || []).reduce((res, key) => {
          res[key] = parent[key];
          return res;
        }, {});
      }
    }

    return parent;
  };

  return computed(() => next());
}
