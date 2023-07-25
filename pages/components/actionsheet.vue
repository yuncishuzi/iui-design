<template>
  <Demo title="基本用法" bgColor="transparent">
    <iui-list style="border-radius: 6px">
      <view @click="visible = !visible">
        <iui-cell label="No Title" arrow></iui-cell>
      </view>

      <view @click="open">
        <iui-cell label="Custom color" arrow></iui-cell>
      </view>

      <view @click="useSlot">
        <iui-cell label="Use Slot" arrow></iui-cell>
      </view>
    </iui-list>
  </Demo>

  <iui-action-sheet
    v-model="visible"
    :actions="['Option 1', 'Option 2', 'Option 3']"
    cancelText="Cancel"
  >
  </iui-action-sheet>

  <iui-action-sheet ref="sheet"> </iui-action-sheet>

  <iui-action-sheet ref="slotSheet">
    <template #tip>
      <view class="tip">
        <view class="title">This is a line of header text</view>
        <view class="desc">
          This is one or two lines of descriptive information. This is one or
          two lines of description.</view
        >
      </view>
    </template>
  </iui-action-sheet>
</template>

<script setup>
import { ref } from "vue";

const sheet = ref(null);
const slotSheet = ref(null);

const visible = ref(false);

const open = () => {
  sheet.value.open({
    actions: [
      "Option 1",
      "Option 2",
      "Option 3",
      { name: "Delete", color: "red" },
    ],
    cancelText: "Cancel",
  });
};

const useSlot = () => {
  slotSheet.value.open({
    actions: [{ slotName: "tip" }, { name: "Confirm", color: "#165DFF" }],
    cancelText: "Cancel",
  });
};
</script>

<style lang="scss" scoped>
.tip {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 8px 0 16px 0;
  width: 100%;
  .title {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    width: 100%;
  }
  .desc {
    margin-top: 6px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
}
</style>
