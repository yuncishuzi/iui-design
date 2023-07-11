<template>
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
    <iui-noticebar closeable animation>
      Note that this is a reminder message. The message is long, but I can
      choose to have it scroll or wrap, as it does now.
    </iui-noticebar>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped></style>
