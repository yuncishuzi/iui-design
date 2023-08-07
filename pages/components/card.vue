<template>
  <Demo title="基本用法">
    <iui-card title="Title" extra="More">
      <view>This is content</view>
      <view>This is content</view>
      <view>This is content</view>
    </iui-card>
  </Demo>

  <Demo title="阴影">
    <iui-card title="Title" extra="More" :shadow="true">
      <view>This is content</view>
      <view>This is content</view>
      <view>This is content</view>
    </iui-card>
  </Demo>

  <Demo title="无边框" bgColor="var(--bg-white)">
    <iui-card title="Title" extra="More" :border="false">
      <view>This is content</view>
      <view>This is content</view>
      <view>This is content</view>
    </iui-card>
  </Demo>

  <Demo title="仅显示内容">
    <iui-card>
      <view>This is content</view>
      <view>This is content</view>
    </iui-card>
  </Demo>

  <Demo title="封面图">
    <iui-card title="Title" extra="More" :headerStyle="{ border: 'none' }">
      <template #cover>
        <view style="overflow: hidden">
          <image
            mode="aspectFill"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
            style="width: 100%; height: 200px"
          ></image>
        </view>
      </template>

      <view>This is content</view>
      <view>This is content</view>
      <view>This is content</view>
    </iui-card>
  </Demo>

  <Demo title="底部">
    <iui-card>
      <view>This is content</view>
      <view>This is content</view>
      <view>This is content</view>

      <template #footer>
        <view>This is footer</view>
      </template>
    </iui-card>
    <view style="margin-top: 20px">
      <iui-card title="Title" extra="More">
        <view>This is content</view>
        <view>This is content</view>
        <view>This is content</view>

        <template #footer>
          <iui-avatar size="mini" avatarName="Username">
            <template #extra>
              <iui-space size="medium">
                <view><iui-icon name="like" :size="16"></iui-icon></view>
                <view><iui-icon name="star" :size="16"></iui-icon></view>
              </iui-space>
            </template>
          </iui-avatar>
        </template>
      </iui-card>
    </view>
  </Demo>

  <Demo title="卡片嵌套">
    <iui-card title="Parent Card">
      <view style="margin-bottom: 16px">This is Parent Content</view>
      <iui-card title="Child Card"> This is Child Content </iui-card>
    </iui-card>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped></style>
