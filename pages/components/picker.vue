<template>
  <Demo title="基本用法" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="visible = true">
        <iui-cell label="Single selection" arrow></iui-cell>
      </view>
      <view @click="multiplePicker">
        <iui-cell label="Multiple selection" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="标题样式" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="titleStyle">
        <iui-cell label="Title style" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <Demo title="级联选择" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="cascadePicker">
        <iui-cell label="Choose a location" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <iui-picker v-model:visible="visible" :options="single"></iui-picker>

  <iui-picker ref="picker"></iui-picker>

  <iui-picker ref="cascade" @change="onChange"></iui-picker>
</template>

<script setup>
import { ref } from "vue";
const visible = ref(false);

const picker = ref();
const cascade = ref();

const single = [
  "Beijing",
  "Shanghai",
  "Guangdong",
  "Fujian",
  "Hebei",
  "Shandong",
  "Shanxi",
  "Henan",
  "Hubei",
  "Hunan",
  "Jiangsu",
  "Zhejiang",
  "Jiangxi",
];

const multiple = [
  [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  ["Morning", "Afternoon", "Evening"],
];

// 级联选择
const cascadeOptions = ["Fujian", "Sichuan", "Hainan"];

const cities = [
  [
    "Fuzhou",
    "Xiamen",
    "Quanzhou",
    "Putian",
    "Sanming",
    "Nanping",
    "Zhangzhou",
    "Longyan",
    "Ningde",
  ],
  [
    "Chengdu",
    "Zigong",
    "Panzhihua",
    "Luzhou",
    "Deyang",
    "Mianyang",
    "Guangyuan",
    "Suining",
    "Neijiang",
    "Leshan",
    "Nanchong",
    "Meishan",
    "Yibin",
  ],
  ["Haikou", "Sanya", "Sansha", "Wuzhishan", "Qionghai", "Wenchang", "Wanning"],
];

const multiplePicker = () => {
  picker.value.open({
    options: multiple,
  });
};

const titleStyle = () => {
  picker.value.open({
    options: single,
    title: "Select City",
  });
};

const cascadePicker = () => {
  cascade.value.open({
    options: cascadeOptions,
  });
};

const onChange = (e) => {
  if (e.changedCol == 0) {
    cascade.value.setOptions(1, cities[e.index[0]]);
  }
};
</script>

<style lang="scss" scoped></style>
