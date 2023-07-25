<template>
  <view class="menu">
    <view class="flex-col">
      <image
        src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
        mode="aspectFit"
        style="width: 80px; height: 80px; margin: 30px 0"
      /><text class="text-bold">iui Design</text></view
    >

    <block v-for="(group, gidx) in Object.keys(list)" :key="gidx">
      <view class="menu-title">{{ group }}</view>

      <view
        v-for="(item, index) in list[group]"
        :key="index"
        style="margin-bottom: 10px"
      >
        <view class="component" @click="go(item.path)">
          <text>
            {{ item.name }}
          </text>

          <iui-icon class="icon" name="right"></iui-icon>
        </view>
      </view>
    </block>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { pages } from "../../pages.json";

console.log(`你真棒！已经完成了 ${pages.slice(1).length} 个组件！`);

const list = computed(() => {
  const result = {};
  const pageList = pages.slice(1);

  pageList.forEach((page) => {
    const title = page.style.navigationBarTitleText;
    const [group, comName] = title.split("-");
    if (result[group]) {
      result[group].push({
        name: comName,
        path: page.path,
      });
    } else {
      result[group] = [
        {
          name: comName,
          path: page.path,
        },
      ];
    }
  });
  return result;
});

function go(path) {
  uni.navigateTo({
    url: "/" + path,
  });
}

function change() {
  const className = document.documentElement.className;
  if (className == "dark") {
    document.documentElement.setAttribute("class", "");
  } else {
    document.documentElement.setAttribute("class", "dark");
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: white;
}
.flex-col {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}
.text-bold {
  font-weight: bold;
  font-size: 24px;
  color: #165dff;
}

.component {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f8fa;
  padding: 12px;
  border-radius: 6px;

  .icon {
    color: #c9cdd4;
  }
}
</style>
