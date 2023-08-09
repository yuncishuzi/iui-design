<template>
  <view>
    <Demo title="主要按钮">
      <!-- iui-space 在H5下可以对任意子元素进行间距控制，在小程序下只能对view控制 -->
      <iui-space size="medium" direction="vertical">
        <!-- 渲染到小程序时会创建同名组件，导致样式失效,例如width，需要使用view包裹 , H5下不需要-->
        <view>
          <iui-button type="primary">Primary</iui-button>
        </view>
        <view>
          <iui-button type="primary" :disabled="true">Disabled</iui-button>
        </view>
      </iui-space>
    </Demo>

    <Demo title="辅助按钮">
      <iui-space size="medium" direction="vertical">
        <view>
          <iui-button>Secondary</iui-button>
        </view>

        <view>
          <iui-button :disabled="true">Disabled</iui-button>
        </view>
      </iui-space>
    </Demo>

    <Demo title="线框按钮">
      <iui-space size="medium" direction="vertical">
        <view>
          <iui-button type="outline">Outline</iui-button>
        </view>
        <view>
          <iui-button type="outline" :disabled="true">Disabled</iui-button>
        </view>
      </iui-space>
    </Demo>

    <Demo title="按钮尺寸">
      <iui-space size="medium" direction="vertical">
        <view>
          <iui-button type="primary" size="huge">Huge</iui-button>
        </view>

        <view>
          <iui-space fill>
            <iui-button type="primary" inline>Regular</iui-button>
            <iui-button type="primary" size="medium" inline>Medium</iui-button>
            <iui-button type="primary" size="small" inline>Small</iui-button>
            <iui-button type="primary" size="mini" inline>Mini</iui-button>
          </iui-space>
        </view>

        <view>
          <iui-button type="primary" :size="50">Custom size</iui-button>
        </view>
      </iui-space>
    </Demo>

    <Demo title="按钮形状">
      <iui-space size="medium" direction="vertical">
        <view>
          <iui-button type="primary">Square</iui-button>
        </view>

        <view>
          <iui-button type="primary" shape="round">Round</iui-button>
        </view>

        <view
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <iui-button type="primary" shape="circle" icon="check"> </iui-button>
          <iui-button type="outline" shape="circle" icon="edit"> </iui-button>
          <iui-button status="danger" shape="circle" icon="delete">
          </iui-button>
          <iui-button
            status="warning"
            type="primary"
            shape="circle"
            icon="star"
          >
          </iui-button>
          <iui-button
            status="success"
            type="primary"
            shape="circle"
            icon="plus"
          >
          </iui-button>
        </view>
      </iui-space>
    </Demo>

    <Demo title="加载中图标">
      <iui-space size="small">
        <view>
          <iui-button type="primary" loading>Submit</iui-button>
        </view>
      </iui-space>
    </Demo>

    <Demo title="图标按钮">
      <iui-space size="small" fill>
        <view>
          <iui-button inline type="primary" icon="plus">Add</iui-button>
        </view>

        <view>
          <iui-button inline type="primary" shape="round" icon="export"
            >Exit</iui-button
          >
        </view>

        <view>
          <iui-button inline type="primary">
            <template #icon>
              <iui-icon name="upload" size="20"></iui-icon>
            </template>
          </iui-button>
        </view>
      </iui-space>
    </Demo>

    <Demo title="按钮状态">
      <iui-space size="medium" direction="vertical">
        <view class="flex-between">
          <iui-button type="primary" inline style="width: 100px"
            >Normal</iui-button
          >
          <iui-button inline style="width: 100px">Normal</iui-button>
          <iui-button type="outline" inline style="width: 100px"
            >Normal</iui-button
          >
        </view>

        <view class="flex-between">
          <iui-button
            inline
            type="primary"
            status="success"
            style="width: 100px"
            >Success</iui-button
          >
          <iui-button inline status="success" style="width: 100px"
            >Success</iui-button
          >
          <iui-button
            inline
            type="outline"
            status="success"
            style="width: 100px"
            >Success</iui-button
          >
        </view>
        <view class="flex-between">
          <iui-button inline type="primary" status="danger" style="width: 100px"
            >Danger</iui-button
          >
          <iui-button inline status="danger" style="width: 100px"
            >Danger</iui-button
          >
          <iui-button inline type="outline" status="danger" style="width: 100px"
            >Danger</iui-button
          >
        </view>
        <view class="flex-between">
          <iui-button
            inline
            type="primary"
            status="warning"
            style="width: 100px"
            >Warning</iui-button
          >
          <iui-button inline status="warning" style="width: 100px"
            >Warning</iui-button
          >
          <iui-button
            inline
            type="outline"
            status="warning"
            style="width: 100px"
            >Warning</iui-button
          >
        </view>
      </iui-space>
    </Demo>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped>
view {
  width: 100%;
}
</style>
