<template>
  <view class="menu">
    <view class="menu-title" @click="change">通用</view>
    <view
      v-for="(item, index) in pages"
      :key="index"
      style="margin-bottom: 10px"
    >
      <iui-button @click="go(item)" type="outline">{{
        item.style.navigationBarTitleText
      }}</iui-button>
    </view>
  </view>
</template>

<script setup>
import { pages } from "../../pages.json";

function go(item) {
  uni.navigateTo({
    url: "/" + item.path,
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

<style></style>
