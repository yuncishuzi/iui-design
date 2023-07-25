<template>
  <Demo title="基本使用" padding="0">
    <iui-list>
      <iui-cell label="Default">
        <iui-stepper></iui-stepper>
      </iui-cell>
      <iui-cell label="Disabled">
        <iui-stepper disabled></iui-stepper>
      </iui-cell>
    </iui-list>
  </Demo>

  <Demo title="设置最大/最小值" padding="0">
    <iui-list>
      <iui-cell label="Max/Min">
        <iui-stepper :min="0" :max="7"></iui-stepper>
      </iui-cell>
    </iui-list>
  </Demo>

  <Demo title="步长" padding="0">
    <iui-list>
      <iui-cell label="Step">
        <iui-stepper v-model="stepValue" :step="5"></iui-stepper>
      </iui-cell>
    </iui-list>
  </Demo>

  <Demo title="小数点" padding="0">
    <iui-list>
      <iui-cell label="Decimal">
        <iui-stepper :decimal="1" :step="0.1"></iui-stepper>
      </iui-cell>
    </iui-list>
  </Demo>

  <Demo title="边框风格" padding="0">
    <iui-list>
      <iui-cell label="Outline">
        <iui-stepper type="outline"></iui-stepper>
      </iui-cell>
    </iui-list>
  </Demo>

  <Demo title="圆角风格" padding="0">
    <iui-list>
      <iui-cell label="Round">
        <iui-stepper type="round"></iui-stepper>
      </iui-cell>
    </iui-list>
  </Demo>
</template>

<script setup>
import { ref } from "vue";

const stepValue = ref(5);
</script>

<style lang="scss" scoped></style>
