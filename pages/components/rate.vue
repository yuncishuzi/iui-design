<template>
  <Demo title="基本用法">
    <iui-rate v-model="defaultValue"></iui-rate>
  </Demo>

  <Demo title="图标尺寸">
    <iui-rate :size="size"></iui-rate>

    <view style="margin-top: 20px">
      <iui-space>
        <view>
          <iui-button
            inline
            @click="size = 24"
            :type="size === 24 ? 'primary' : ''"
            >24</iui-button
          >
        </view>
        <view>
          <iui-button
            inline
            @click="size = 36"
            :type="size === 36 ? 'primary' : ''"
            >36</iui-button
          >
        </view>
        <view>
          <iui-button
            inline
            @click="size = 48"
            :type="size === 48 ? 'primary' : ''"
            >48</iui-button
          >
        </view>
      </iui-space>
    </view>
  </Demo>

  <Demo title="自定义个数">
    <iui-rate :count="7"></iui-rate>
  </Demo>

  <Demo title="自定义颜色">
    <iui-rate
      v-model="defaultValue"
      color="#165DFF"
      normalColor="gray"
    ></iui-rate>
  </Demo>

  <Demo title="自定义分值">
    <iui-rate :count="5" :score="score" @change="onChange"></iui-rate>

    <view style="margin-top: 20px">
      <iui-space>
        <view>
          <iui-button
            inline
            @click="score = 1"
            :type="score === 1 ? 'primary' : ''"
            >1 point per star
          </iui-button>
        </view>
        <view>
          <iui-button
            inline
            @click="score = 20"
            :type="score === 20 ? 'primary' : ''"
            >20 points per star
          </iui-button>
        </view>
      </iui-space>
    </view>
  </Demo>

  <iui-toast ref="toast"></iui-toast>
</template>

<script setup>
import { ref } from "vue";

const defaultValue = ref(3);

const size = ref(24);
const toast = ref();

const score = ref(1);

const onChange = (value) => {
  toast.value.show(`评分：${value} 分`);
};
</script>

<style lang="scss" scoped></style>
