<template>
  <Demo title="基本用法" padding="0">
    <iui-list>
      <view @click="onClick">
        <iui-cell label="Default" arrow></iui-cell>
      </view>

      <view @click="maskSlot">
        <iui-cell label="Slot" arrow> </iui-cell>
      </view>
    </iui-list>
  </Demo>
  <iui-mask v-model="visible"></iui-mask>

  <iui-mask ref="mask">
    <view :style="{ width: '200px', height: '160px' }">
      <iui-image
        src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/get-prize.png"
      ></iui-image>
    </view>
  </iui-mask>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
const mask = ref();

const onClick = () => {
  visible.value = true;
};

const maskSlot = () => {
  mask.value.show();
};
</script>

<style lang="scss" scoped></style>
