<template>
  <Demo title="基本用法">
    <iui-radio label="Opiton Content" justify></iui-radio>
  </Demo>

  <Demo title="禁用">
    <iui-radio label="Opiton Content" justify disabled></iui-radio>
  </Demo>

  <Demo title="组合">
    <iui-radio-group>
      <iui-space size="medium" direction="vertical">
        <view>
          <iui-radio label="Option 1"></iui-radio>
        </view>
        <view>
          <iui-radio label="Option 2"></iui-radio>
        </view>
      </iui-space>
    </iui-radio-group>
  </Demo>

  <Demo title="列表" :padding="0">
    <iui-radio-group justify>
      <iui-list>
        <iui-cell>
          <iui-radio label="Option 1"></iui-radio>
        </iui-cell>
        <iui-cell>
          <iui-radio label="Option 2"></iui-radio>
        </iui-cell>
      </iui-list>
    </iui-radio-group>
  </Demo>

  <Demo title="自定义颜色">
    <iui-space size="large">
      <view>
        <iui-radio label="Option red" color="#F53F3F" checked></iui-radio>
      </view>

      <view>
        <iui-radio label="Option green" color="#00B42A" checked></iui-radio>
      </view>
    </iui-space>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped></style>
