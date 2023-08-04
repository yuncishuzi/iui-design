<template>
  <Demo title="基本用法" padding="0">
    <iui-swipe-action
      :defaultOpen="open"
      :actions="[
        {
          icon: 'delete',
          text: '删除',
          style: { background: '#F53F3F' },
          onClick: onClick,
        },
      ]"
    >
      <iui-cell label="Single menu"></iui-cell>
    </iui-swipe-action>
  </Demo>

  <Demo title="多行内容" padding="0">
    <iui-swipe-action
      :defaultOpen="open"
      :actions="[
        {
          text: '置顶',
          style: { background: '#165DFF' },
          onClick: onClick,
        },
        { text: '删除', style: { background: '#F53F3F' }, onClick: onClick },
      ]"
    >
      <iui-cell label="Multipe content" desc="Description"></iui-cell>
    </iui-swipe-action>
  </Demo>

  <Demo title="插槽" padding="0">
    <iui-swipe-action :actions="[{ slotName: 'del' }]" :defaultOpen="open">
      <iui-cell label="Custom slot"></iui-cell>

      <template #del>
        <view
          style="
            background-color: #00b42a;
            height: 100%;
            width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 12px;
            white-space: nowrap;
            box-sizing: border-box;
          "
        >
          <iui-icon name="smile"></iui-icon>
          <view style="display: flex; align-items: center; padding-left: 5px"
            >通过Slot自定义内容</view
          >
        </view>
      </template>
    </iui-swipe-action>
  </Demo>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const open = ref(false);

const onClick = (e, i) => {
  console.log("click", e, i);
};

onMounted(() => {
  setTimeout(() => {
    open.value = true;
  }, 1000);
});
</script>

<style lang="scss" scoped></style>
