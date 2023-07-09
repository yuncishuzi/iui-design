<template>
  <Demo title="基本用法">
    <iui-spin></iui-spin>
  </Demo>

  <Demo title="尺寸">
    <iui-space size="large">
      <view>
        <iui-spin :size="10"></iui-spin>
      </view>
      <view>
        <iui-spin :size="15"></iui-spin>
      </view>
      <view>
        <iui-spin :size="20"></iui-spin>
      </view>
    </iui-space>
  </Demo>

  <Demo title="描述文案">
    <iui-spin tip="This may take a while"></iui-spin>
  </Demo>

  <Demo title="容器中">
    <iui-spin :loading="true" tip="loading">
      <view style="width: 100%">
        <iui-card title="Card" extra="More" shadow>
          <p>Hi</p>
          <text> This is a container</text>
        </iui-card>
      </view>
    </iui-spin>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped></style>
