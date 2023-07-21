<template>
  <Demo title="基本用法">
    <iui-space>
      <view style="padding: 30px">
        <iui-popover content="This is a popover">
          <iui-button inline>White</iui-button>
        </iui-popover>
      </view>
      <view style="padding: 30px">
        <iui-popover content="This is a popover" position="bottom" theme="dark">
          <iui-button inline>Black</iui-button>
        </iui-popover>
      </view>
    </iui-space>
  </Demo>

  <Demo title="弹出位置" padding="20px 40px">
    <iui-space fill>
      <view>
        <iui-popover
          content="This is a popover on top left"
          position="tl"
          theme="dark"
        >
          <iui-button inline style="width: 120px">Top left</iui-button>
        </iui-popover>
      </view>
      <view>
        <iui-popover
          content="This is a popover on top right"
          position="tr"
          theme="dark"
        >
          <iui-button inline style="width: 120px">Top right</iui-button>
        </iui-popover>
      </view>
    </iui-space>
    <view style="height: 30px"></view>
    <iui-space fill>
      <view>
        <iui-popover
          content="This is a popover on bottom left"
          position="bl"
          theme="dark"
        >
          <iui-button inline style="width: 120px">Bottom left</iui-button>
        </iui-popover>
      </view>
      <view>
        <iui-popover
          content="This is a popover on bottom right"
          position="br"
          theme="dark"
        >
          <iui-button inline style="width: 120px">Bottom right</iui-button>
        </iui-popover>
      </view>
    </iui-space>
    <view style="height: 30px"></view>
    <iui-space fill>
      <view>
        <iui-popover
          content="This is a popover on top"
          position="top"
          theme="dark"
        >
          <iui-button inline style="width: 120px">Top center</iui-button>
        </iui-popover>
      </view>
      <view>
        <iui-popover
          content="This is a popover on bottom"
          position="bottom"
          theme="dark"
        >
          <iui-button inline style="width: 120px">Bottom center</iui-button>
        </iui-popover>
      </view>
    </iui-space>
  </Demo>

  <Demo title="防止超出屏幕" padding="20px 40px">
    <iui-space fill>
      <view>
        <iui-popover
          content="A long content text wouldn't make the popover overflow the screen"
          position="top"
          theme="dark"
        >
          <iui-button inline style="width: 120px">Top center</iui-button>
        </iui-popover>
      </view>
      <view>
        <iui-popover
          content="A long content text wouldn't make the popover overflow the screen"
          position="bottom"
          theme="dark"
        >
          <iui-button inline style="width: 120px">Bottom center</iui-button>
        </iui-popover>
      </view>
    </iui-space>
  </Demo>

  <Demo title="插槽" padding="20px 40px">
    <iui-space fill>
      <view>
        <iui-popover position="top" theme="dark">
          <iui-button inline style="width: 120px">Top center</iui-button>
          <template #content>
            <view
              :style="{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }"
            >
              <view>This is a single line of text with an action button</view>
              <iui-button inline size="small">Action</iui-button>
            </view>
          </template>
        </iui-popover>
      </view>
      <view>
        <iui-popover position="top">
          <iui-button inline style="width: 120px">List menu</iui-button>

          <template #content="{ close }">
            <view class="list">
              <view class="item" v-for="idx in 3" :key="idx" @click="close()">
                Option {{ idx }}
              </view>
            </view>
          </template>
        </iui-popover>
      </view>
    </iui-space>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  :not(:last-child) {
    border-bottom: 1rpx solid #dfdfdf;
  }

  .item {
    color: #165dff;
    font-size: 15px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    &:active {
      opacity: 0.5;
    }
  }
}
</style>
