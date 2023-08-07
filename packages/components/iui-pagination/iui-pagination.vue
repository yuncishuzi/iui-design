<template>
  <view
    :class="cls"
    :style="{
      justifyContent: justify ? 'space-between' : 'center',
    }"
  >
    <view
      :class="[`${prefixCls}-prev`, { disabled: isMin }]"
      @click="handleClickPrev"
    >
      <slot name="prev" v-if="$slots.prev"></slot>

      <iui-button :disabled="isMin" v-else-if="type === 'button'">{{
        prevText
      }}</iui-button>

      <view v-else-if="type === 'text'">{{ prevText }}</view>

      <view v-else>
        <iui-button :disabled="isMin" icon="left"></iui-button>
      </view>
    </view>

    <view :class="`${prefixCls}-statistic`">
      <slot
        name="value"
        :current="innerValue"
        :page="total / pageSize"
        :pageSize="pageSize"
        v-if="$slots.value"
      ></slot>
      <view v-else> {{ innerValue }} / {{ total / pageSize }} </view>
    </view>

    <view
      :class="[`${prefixCls}-next`, { disabled: isMax }]"
      @click="handleClickNext"
    >
      <slot name="next" v-if="$slots.next"></slot>

      <iui-button :disabled="isMax" v-else-if="type === 'button'">{{
        nextText
      }}</iui-button>

      <view v-else-if="type === 'text'">{{ nextText }}</view>

      <view v-else>
        <iui-button :disabled="isMax" icon="right"></iui-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  /**
   * 当前页码
   */
  modelValue: {
    type: Number,
    default: 1,
  },
  /**
   * 总数
   */
  total: {
    type: Number,
    default: 0,
  },
  /**
   * 每页条数
   */
  pageSize: {
    type: Number,
    default: 10,
  },
  /**
   * 上一页文本
   */
  prevText: {
    type: String,
    default: "上一页",
  },
  /**
   * 下一页文本
   */
  nextText: {
    type: String,
    default: "下一页",
  },
  /**
   * 类型
   * type: button | text | icon
   */
  type: {
    type: String,
    default: "button",
  },
  /**
   * 通栏
   *
   */
  justify: {
    type: Boolean,
    default: true,
  },
});

const prefixCls = "iui-pagination";

const cls = computed(() => [prefixCls]);

const innerValue = ref(props.modelValue);

const isMax = computed(() => innerValue.value === props.total / props.pageSize);
const isMin = computed(() => innerValue.value === 1);

const emit = defineEmits(["update:modelValue", "change"]);

const handleClickNext = () => {
  if (!isMax.value) {
    innerValue.value++;
    emit("update:modelValue", innerValue.value);
    emit("change", innerValue.value);
  }
};

const handleClickPrev = () => {
  if (!isMin.value) {
    innerValue.value--;
    emit("update:modelValue", innerValue.value);
    emit("change", innerValue.value);
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-pagination {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  box-sizing: border-box;
  color: $color-text;

  &-statistic {
    font-size: 17px;
    margin: 0 24px;
  }

  .disabled {
    // color: $color-text-lighten;
    opacity: 0.6;
  }
}
</style>
