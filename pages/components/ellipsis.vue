<template>
  <Demo title="基本用法">
    <iui-ellipsis>
      This was long before digital audio: this was done with razor blades.
      Today, it's called sampling, and the influence of these bands is felt in
      nearly all branches of modern pop music.
    </iui-ellipsis>
  </Demo>

  <Demo title="多行省略">
    <iui-ellipsis :lines="2" action expandText="Expand" collapseText="Collapse">
      This was long before digital audio: this was done with razor blades.
      Today, it's called sampling, and the influence of these bands is felt in
      nearly all branches of modern pop music.
    </iui-ellipsis>
  </Demo>

  <Demo title="自定义操作文本">
    <iui-ellipsis :lines="2" action>
      This was long before digital audio: this was done with razor blades.
      Today, it's called sampling, and the influence of these bands is felt in
      nearly all branches of modern pop music.
    </iui-ellipsis>
  </Demo>
</template>

<script setup></script>

<style lang="scss" scoped></style>
