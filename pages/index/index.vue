<template>
  <view class="menu">
    <view class="flex-col">
      <!-- <view style="width: 80px; height: 80px; margin: 30px 0 20px">
        <iui-image src="/static/hi.jpeg" mode="aspectFit" radius="50%" />
      </view> -->
      <view
        style="
          width: 60px;
          height: 60px;
          background-color: #165dff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          margin: 30px 10px 0;
          transform: rotate(45deg);
        "
      >
        <image
          src="/static/comet.svg"
          style="width: 70%; transform: rotate(180deg)"
          mode="widthFix"
        >
        </image>
      </view>

      <view style="display: flex; align-items: center; margin-top: 20px">
        <!-- <view
          style="
            background: #165dff;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            margin-right: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: rotate(180deg);
          "
        >
          <image src="/static/comet.svg" style="width: 70%" mode="widthFix">
          </image>
        </view> -->

        <text class="text-bold">iui Design</text>
      </view>
    </view>

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

// console.log(`你真棒！已经完成了 ${pages.slice(1).length} 个组件！`);

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
</script>

<style lang="scss">
page {
  background-color: $color-bg;
}
.flex-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
  background-color: $color-bg-light;
  padding: 12px;
  border-radius: 6px;
  text {
    color: $color-text;
  }

  .icon {
    color: $color-text-lighten;
  }
}
</style>
