<template>
  <Demo title="基本用法">
    <iui-space size="large">
      <view>
        <iui-checkbox
          label="Option"
          v-model="checked"
          @change="handleChange"
        ></iui-checkbox>
      </view>

      <view>
        <iui-checkbox label="Option" checked></iui-checkbox>
      </view>
    </iui-space>
  </Demo>

  <Demo title="禁用状态">
    <iui-space size="large">
      <view>
        <iui-checkbox label="Disabled" disabled></iui-checkbox>
      </view>

      <view>
        <iui-checkbox
          label="Checked but disabled"
          disabled
          checked
        ></iui-checkbox>
      </view>
    </iui-space>
  </Demo>

  <Demo title="复选框组">
    <iui-checkbox-group @change="handleGroupChange">
      <iui-space size="medium" direction="vertical">
        <view v-for="item in 4" :key="item">
          <iui-checkbox :label="`Option ${item}`"></iui-checkbox>
        </view>
      </iui-space>
    </iui-checkbox-group>
  </Demo>

  <Demo title="全选/反选">
    <iui-checkbox-group ref="group">
      <iui-space size="medium" direction="vertical">
        <view v-for="item in 4" :key="item">
          <iui-checkbox :label="`Option ${item}`"></iui-checkbox>
        </view>
      </iui-space>
    </iui-checkbox-group>

    <view style="margin-top: 20px">
      <iui-space size="medium">
        <view>
          <iui-button @click="group?.checkAll">{{
            isCheckedAll ? "Uncheck all" : "Check all"
          }}</iui-button>
        </view>

        <view>
          <iui-button @click="group?.reverseChecked"
            >Reversely select</iui-button
          >
        </view>
      </iui-space>
    </view>
  </Demo>

  <Demo title="在列表中使用" :padding="0">
    <iui-checkbox-group>
      <iui-list>
        <iui-cell v-for="item in 4" :key="item">
          <iui-checkbox :label="`Option ${item}`"></iui-checkbox>
        </iui-cell>
      </iui-list>
    </iui-checkbox-group>
  </Demo>

  <Demo title="右侧勾选" :padding="0">
    <iui-checkbox-group justify>
      <iui-list>
        <iui-cell v-for="item in 4" :key="item">
          <iui-checkbox :label="`Option ${item}`"></iui-checkbox>
        </iui-cell>
      </iui-list>
    </iui-checkbox-group>
  </Demo>

  <Demo title="自定义颜色">
    <iui-space size="large">
      <view>
        <iui-checkbox label="Option red" color="#F53F3F" checked></iui-checkbox>
      </view>

      <view>
        <iui-checkbox
          label="Option green"
          color="#00B42A"
          checked
        ></iui-checkbox>
      </view>
    </iui-space>
  </Demo>
</template>

<script setup>
import { computed, ref } from "vue";

const group = ref();

const checked = ref(false);

const isCheckedAll = computed(() => group.value?.isCheckedAll);

const handleChange = () => {
  console.log(checked.value);
};

const handleGroupChange = (e) => {
  console.log(e);
};
</script>

<style lang="scss" scoped></style>
