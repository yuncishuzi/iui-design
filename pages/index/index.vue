<template>
  <view class="menu">
    <view class="flex-col">
      <view class="logo" style="">
        <iui-image src="/static/logo.jpg" mode="aspectFit" />
      </view>

      <view class="index-title">
        <text class="text-bold">IUI DESIGN</text>

        <text class="doc" @click="copy">查看文档</text>
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

function copy() {
  uni.setClipboardData({
    data: "https://iyunci.cn/design/uni",
    success: function () {
      uni.showToast({
        title: "文档链接复制成功",
        icon: "none",
      });
    },
  });
}
</script>

<style lang="scss">
page {
  background-color: $color-bg;
}
.index-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .doc {
    font-size: 14px;
    color: $color-text-lighten;
  }
}
.logo {
  width: 60px;
  height: 60px;
  margin: 30px 0 10px;
  border-radius: 6px;
  overflow: hidden;
}
.flex-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.text-bold {
  font-weight: 800;
  font-size: 21px;
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
