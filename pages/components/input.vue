<template>
  <iui-page>
    <Demo title="基础用法" :padding="0" bgColor="transparent">
      <iui-space direction="vertical">
        <view>
          <iui-input
            label="Nickname"
            placeholder="Please enter nickname"
            clearable
          ></iui-input>
        </view>
        <view>
          <iui-input
            label="Nickname"
            placeholder="Align right"
            clearable
            align="right"
          ></iui-input>
        </view>
      </iui-space>
    </Demo>

    <Demo title="禁用状态" :padding="0" bgColor="transparent">
      <iui-space direction="vertical">
        <view>
          <iui-input
            label="Title Text"
            placeholder="Input is disabled"
            disabled
          ></iui-input>
        </view>
        <view>
          <iui-input
            modelValue="Input is readonly"
            label="Title Text"
            placeholder="Align right"
            readonly
          ></iui-input>
        </view>
      </iui-space>
    </Demo>

    <Demo title="字数限制" :padding="0" bgColor="transparent">
      <iui-space direction="vertical">
        <view>
          <iui-input
            label="Title Text"
            placeholder="Up to 10 characters"
            :maxlength="10"
          ></iui-input>
        </view>
        <view>
          <iui-input
            v-model="inputValue"
            label="Title Text"
            placeholder="Up to 10 characters"
            :maxlength="10"
          >
            <template #suffix>
              <view style="color: var(--iui-gray-5); font-size: 15px">
                {{ inputValue.length }}/10
              </view>
            </template>
          </iui-input>
        </view>
      </iui-space>
    </Demo>

    <Demo title="错误提示" :padding="0" bgColor="transparent">
      <iui-space direction="vertical">
        <view>
          <iui-input
            label="Nickname"
            placeholder="Please enter nickname"
            required
            :rules="{
              type: 'string',
              required: true,
              message: 'Nickname is required',
              trigger: 'blur',
            }"
          ></iui-input>
        </view>
        <view>
          <iui-input
            label="Nickname"
            placeholder="Please enter nickname"
            required
            :rules="{
              type: 'string',
              required: true,
              message: 'Custom error hint',
              trigger: 'blur',
            }"
          >
            <template #error="{ message }">
              <view style="display: flex; align-items: center; width: 100%">
                <iui-icon
                  name="minus-circle-fill"
                  style="margin-right: 4px"
                ></iui-icon>
                <text>{{ message }}</text>
              </view>
            </template>
          </iui-input>
        </view>
      </iui-space>
    </Demo>

    <Demo title="使用图标" :padding="0" bgColor="transparent">
      <view>
        <iui-input
          label="Nickname"
          placeholder="Please enter nickname"
          clearable
          icon="user"
        >
        </iui-input>
      </view>
    </Demo>

    <Demo title="使用按钮" :padding="0" bgColor="transparent">
      <view>
        <iui-input
          label="Verification code"
          placeholder="Enter code"
          clearable
          type="number"
        >
          <template #suffix>
            <iui-button shape="circle" inline type="primary">Send</iui-button>
          </template>
        </iui-input>
      </view>
    </Demo>

    <Demo title="垂直布局" :padding="0" bgColor="transparent">
      <view>
        <iui-input
          label="Nickname"
          placeholder="Please enter nickname"
          clearable
          direction="vertical"
        >
        </iui-input>
      </view>
    </Demo>

    <Demo title="特殊输入格式" :padding="0" bgColor="transparent">
      <iui-space direction="vertical">
        <view>
          <iui-input placeholder="0.00" clearable type="number">
            <template #prefix>
              <text
                style="
                  font-weight: 600;
                  font-size: 22px;
                  color: var(--iui-gray-8);
                "
                >¥</text
              >
            </template>
          </iui-input>
        </view>
        <view>
          <iui-input
            label="Password"
            placeholder="Please enter password"
            clearable
            type="password"
          >
          </iui-input>
        </view>

        <!-- #ifdef MP -->
        <view>
          <iui-input
            label="ID Card"
            placeholder="Please enter ID card number"
            clearable
            type="idcard"
          >
          </iui-input>
        </view>
        <!-- #endif -->
      </iui-space>
    </Demo>
  </iui-page>
</template>

<script setup>
import { ref } from "vue";
const inputValue = ref("");
</script>

<style lang="scss" scoped>
view {
  width: 100%;
  box-sizing: border-box;
}
</style>
