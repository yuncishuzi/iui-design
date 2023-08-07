<template>
  <view>
    <Demo title="基本用法">
      <iui-space size="large">
        <view>
          <iui-badge dot></iui-badge>
        </view>
        <view>
          <iui-badge text="2"></iui-badge>
        </view>
        <view>
          <iui-badge text="12"></iui-badge>
        </view>

        <view>
          <iui-badge text="100"></iui-badge>
        </view>
      </iui-space>
    </Demo>

    <Demo title="徽标位置">
      <iui-space size="large">
        <view class="">
          <iui-badge dot position="tl">
            <view class="demo-block"> </view>
          </iui-badge>
        </view>

        <view class="">
          <iui-badge text="6">
            <view class="demo-block"> </view>
          </iui-badge>
        </view>

        <view class="">
          <iui-badge text="12" position="bl">
            <view class="demo-block"> </view>
          </iui-badge>
        </view>

        <view class="">
          <iui-badge text="102" position="br">
            <view class="demo-block"> </view>
          </iui-badge>
        </view>
      </iui-space>
    </Demo>

    <Demo title="图标">
      <iui-space size="large">
        <view>
          <iui-badge position="br" icon="star">
            <view class="demo-block"> </view>
          </iui-badge>
        </view>
      </iui-space>
    </Demo>

    <Demo title="自定义位置 颜色">
      <iui-space size="large">
        <view>
          <iui-badge
            position="center"
            icon="plus"
            color="linear-gradient(277.15deg, rgb(6, 120, 255) -0.2%, rgb(20, 205, 255) 97.54%)"
          >
            <view class="demo-block"> </view>
          </iui-badge>
        </view>

        <view>
          <iui-badge icon="edit" :position="[35, 30]" color="#165DFF">
            <iui-avatar
              src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
              size="large"
            />
          </iui-badge>
        </view>
      </iui-space>
    </Demo>

    <Demo title="列表" :padding="0">
      <iui-list arrow>
        <iui-cell label="List Cell" :arrow="false">
          <template #extra>
            <iui-badge dot></iui-badge>
          </template>
        </iui-cell>
        <iui-cell label="List Cell">
          <template #extra>
            <iui-badge text="7"></iui-badge>
          </template>
        </iui-cell>
        <iui-cell label="List Cell">
          <template #extra>
            <iui-badge text="102"></iui-badge>
          </template>
        </iui-cell>
      </iui-list>
    </Demo>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.demo-block {
  padding: 10px;
  background-color: var(--iui-primary-2);
  border-radius: 4px;
  width: 20px;
  height: 20px;
}
</style>
