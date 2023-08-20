<template>
  <iui-page>
    <Demo title="基本用法" padding="16px 0">
      <iui-noticebar> Note that this is a reminder message. </iui-noticebar>
    </Demo>

    <Demo title="使用图标" padding="16px 0">
      <iui-noticebar icon="sound" closeable>
        Note that this is a reminder message.
      </iui-noticebar>
    </Demo>

    <Demo title="多行样式" padding="16px 0">
      <iui-noticebar closeable wrapable>
        Note that this is a reminder message. The message is long, but I can
        choose to have it scroll or wrap, as it does now.
      </iui-noticebar>
    </Demo>

    <Demo title="滚动播放" padding="16px 0">
      <iui-noticebar icon="sound" closeable animation>
        Note that this is a reminder message. The message is long, but I can
        choose to have it scroll or wrap, as it does now.
      </iui-noticebar>
    </Demo>

    <Demo title="点击更多" padding="16px 0">
      <iui-noticebar icon="sound">
        <template #suffix>
          <iui-icon name="right" size="18" />
        </template>
        Note that this is a reminder message.
      </iui-noticebar>

      <view style="margin-top: 10px">
        <iui-noticebar>
          <template #suffix>
            <iui-icon name="right" size="18" />
          </template>
          Note that this is a reminder message. The message is long, but I can
          choose to have it scroll or wrap, as it does now.
        </iui-noticebar>
      </view>
    </Demo>

    <Demo title="自定义" padding="16px 0">
      <iui-noticebar color="danger" animation>
        Note that this is a notification message. The background color is
        customized here, and the gradient theme color will also be automatically
        set as the background color changes.

        <template #suffix>
          <iui-button size="mini" status="danger" type="primary" shape="round"
            >Turn on</iui-button
          >
        </template>
      </iui-noticebar>

      <view style="margin-top: 10px">
        <iui-noticebar
          :color="{
            background: '#d5c0f1',
            color: '#722ED1',
          }"
        >
          Custom Background and Font Color
        </iui-noticebar>
      </view>

      <view style="margin-top: 10px">
        <iui-noticebar color="success">
          <template #prefix>
            <iui-icon name="check-circle" size="18" />
          </template>
          File is uploaded successfully!
        </iui-noticebar>
      </view>

      <view style="margin-top: 10px; padding: 0 10px">
        <iui-noticebar color="primary" closeable style="border-radius: 6px">
          <template #prefix>
            <iui-icon name="smile" size="18" />
          </template>
          Card style
        </iui-noticebar>
      </view>
    </Demo>
  </iui-page>
</template>

<script setup></script>

<style lang="scss" scoped></style>
