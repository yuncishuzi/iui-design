<template>
  <Demo title="基本用法">
    <iui-switch></iui-switch>
  </Demo>

  <Demo title="禁用">
    <iui-switch disabled></iui-switch>
  </Demo>

  <Demo title="内嵌文字">
    <iui-space>
      <view>
        <iui-switch checkedText="开" uncheckedText="关"></iui-switch>
      </view>
      <view>
        <iui-switch checkedText="ON" uncheckedText="OFF"></iui-switch>
      </view>
    </iui-space>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped></style>
