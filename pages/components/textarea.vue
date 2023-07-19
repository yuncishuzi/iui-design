<template>
  <Demo title="基本用法" :padding="0">
    <iui-textarea
      placeholder="Please enter the content of no less then 10 characters"
    ></iui-textarea>
  </Demo>

  <Demo title="禁用" :padding="0">
    <iui-textarea disabled placeholder="Disabled"></iui-textarea>
  </Demo>

  <Demo title="字数统计" :padding="0">
    <iui-textarea
      placeholder="Please enter the content of no less then 10 characters"
      showLimit
    ></iui-textarea>
  </Demo>

  <Demo title="高度限制" :padding="0">
    <iui-textarea
      placeholder="Please enter the content of no less then 10 characters"
      showLimit
      :height="50"
    ></iui-textarea>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped></style>
