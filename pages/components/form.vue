<template>
  <Demo title="基本用法" padding="0">
    <iui-form ref="form" :model="formData" :rules="rules">
      <iui-form-item label="Nickname" required field="nickname">
        <iui-input
          v-model="formData.nickname"
          placeholder="Please enter nickanme"
        />
      </iui-form-item>

      <iui-form-item label="Age" field="age" required>
        <iui-input
          v-model="formData.age"
          placeholder="Please enter age"
          type="number"
        />
      </iui-form-item>

      <iui-form-item label="Gender" field="gender">
        <iui-radio-group v-model="formData.gender" style="display: flex">
          <iui-space>
            <view>
              <iui-radio label="male"></iui-radio>
            </view>
            <view>
              <iui-radio label="female"></iui-radio>
            </view>
            <view>
              <iui-radio label="others"></iui-radio>
            </view>
          </iui-space>
        </iui-radio-group>
      </iui-form-item>

      <iui-form-item label="Favorite" field="favorite">
        <iui-checkbox-group v-model="formData.favorite">
          <iui-space direction="vertical">
            <view>
              <iui-checkbox label="Football"></iui-checkbox>
            </view>
            <view>
              <iui-checkbox label="Basketball"></iui-checkbox>
            </view>
            <view>
              <iui-checkbox label="Swim"></iui-checkbox>
            </view>
          </iui-space>
        </iui-checkbox-group>
      </iui-form-item>

      <iui-form-item label="Score" field="score">
        <iui-rate v-model="formData.score"></iui-rate>
      </iui-form-item>

      <iui-form-item label="Progress" field="progress">
        <iui-slider v-model="formData.progress"></iui-slider>
      </iui-form-item>

      <iui-form-item label="Subscribe" align="center" field="subscribe">
        <iui-switch v-model="formData.subscribe"></iui-switch>
      </iui-form-item>

      <iui-form-item label="Remark" field="remark">
        <iui-textarea
          v-model="formData.remark"
          placeholder="Please enter remark"
          showLimit
        ></iui-textarea>
      </iui-form-item>
    </iui-form>
    <view style="padding: 16px">
      <iui-button type="primary">Submit</iui-button>
    </view>
  </Demo>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = ref(null);

const formData = reactive({
  nickname: "",
  age: "",
  gender: "male",
  favorite: [],
  score: "",
  progress: 0,
  subscribe: "",
  remark: "",
});

const rules = {
  nickname: [
    { required: true, message: "Please enter nickname", trigger: "blur" },
    {
      min: 2,
      max: 10,
      message: "Nickname length should be 2-10",
      trigger: "blur",
    },
  ],
  age: [
    {
      type: "number",
      required: true,
      min: 6,
      max: 60,
      message: "Age should be 6-60",
      trigger: "blur",
    },
  ],
};
</script>

<style lang="scss" scoped></style>
