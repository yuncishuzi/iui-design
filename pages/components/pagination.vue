<template>
  <Demo title="基础分页器" :padding="0">
    <iui-pagination :total="50" />
  </Demo>

  <Demo title="文字分页器" :padding="0">
    <iui-pagination :total="50" type="text" />
  </Demo>

  <Demo title="图标分页器" :padding="0">
    <iui-pagination :total="50" type="icon" />
  </Demo>

  <Demo title="居中" :padding="0">
    <iui-pagination :total="50" type="icon" :justify="false" />
  </Demo>

  <Demo title="插槽" :padding="0">
    <iui-pagination :total="50">
      <template #prev>
        <view class="circle">
          <iui-icon name="left"></iui-icon>
        </view>
      </template>

      <template #value="{ current }">
        <view class="value"> 第 {{ current }} 页 </view>
      </template>

      <template #next>
        <view class="circle">
          <iui-icon name="right"></iui-icon>
        </view>
      </template>
    </iui-pagination>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped>
.circle {
  background-color: rgb(229, 229, 229);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  text-align: center;
  color: gray;
}
.value {
  background-color: #165dff;
  border-radius: 4px;
  font-size: 13px;
  padding: 2px 8px;
  color: white;
}
</style>
