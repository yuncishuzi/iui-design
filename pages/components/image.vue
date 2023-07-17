<template>
  <Demo title="基本用法">
    <iui-space>
      <view class="image">
        <iui-image
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
        ></iui-image>
      </view>
      <view class="image">
        <iui-image
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_3.jpg"
        ></iui-image>
      </view>
      <view class="image">
        <iui-image
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg"
        ></iui-image>
      </view>
    </iui-space>
  </Demo>

  <Demo title="状态">
    <iui-space>
      <view class="image">
        <iui-image
          :loading="true"
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg"
        ></iui-image>
      </view>
      <view class="image">
        <iui-image
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_6.jpg"
        ></iui-image>
      </view>
    </iui-space>
  </Demo>

  <Demo title="圆角">
    <iui-space>
      <view class="image">
        <iui-image
          :radius="6"
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_4.jpg"
        ></iui-image>
      </view>
      <view class="image">
        <iui-image
          radius="50%"
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg"
        ></iui-image>
      </view>
    </iui-space>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped>
.image {
  width: 110px;
  height: 110px;
}
</style>
