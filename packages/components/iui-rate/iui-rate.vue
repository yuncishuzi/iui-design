<template>
  <view :class="prefixCls">
    <block v-for="(star, idx) in count" :key="idx">
      <view
        :class="[
          `${prefixCls}-star`,
          {
            active: star <= innerValue,
          },
        ]"
        :style="{
          width: `${size}px`,
          height: `${size}px`,
        }"
        @click="handleClick(star)"
      ></view>
    </block>
  </view>
</template>

<script setup>
import Base64 from "../../helper/base64";
import { computed, ref } from "vue";

const props = defineProps({
  /**
   * 值
   */
  modelValue: {
    type: Number,
  },
  /**
   * 选中时颜色
   */
  color: {
    type: String,
    default: "#FFB400",
  },
  /**
   * 未选中时颜色
   */
  normalColor: {
    type: String,
    default: "#E5E6EB",
  },
  /**
   * 图标数量
   */
  count: {
    type: Number,
    default: 5,
  },
  /**
   * 每个图标分值
   */
  score: {
    type: Number,
    default: 1,
  },
  /**
   * 尺寸
   */
  size: {
    type: Number,
    default: 24,
  },
});

const prefixCls = "iui-rate";

const iconTemplate = `<svg fill="currentColor" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M497.371 826.514L270.63 936.23c-18.286 7.314-40.229 0-47.543-18.286-3.657-3.657-7.315-10.972-3.657-18.286l25.6-248.686c0-10.971-3.658-18.285-7.315-29.257L69.486 435.2c-14.629-14.629-10.972-36.571 3.657-51.2 3.657-3.657 10.971-7.314 14.628-7.314l245.029-51.2c10.971-3.657 18.286-7.315 21.943-18.286l128-219.429C490.057 73.143 512 65.83 530.286 76.8c3.657 3.657 10.971 7.314 14.628 14.629l128 219.428c3.657 7.314 14.629 14.629 21.943 18.286l245.029 51.2c18.285 3.657 32.914 21.943 25.6 43.886 0 7.314-3.657 10.971-7.315 14.628L789.943 621.714c-7.314 7.315-10.972 18.286-7.314 29.257l25.6 248.686c3.657 18.286-10.972 36.572-32.915 40.229-7.314 0-14.628 0-18.285-3.657L530.286 826.514c-10.972-7.314-25.6-7.314-32.915 0z"></path></svg>`;

const normalIcon = computed(() => {
  const svg = iconTemplate.replace("currentColor", props.normalColor);
  const result = `url(data:image/svg+xml;base64,${Base64.encode(svg)})`;
  return result;
});

const activeIcon = computed(() => {
  const svg = iconTemplate.replace("currentColor", props.color);
  const result = `url(data:image/svg+xml;base64,${Base64.encode(svg)})`;
  return result;
});

const emit = defineEmits(["update:modelValue", "change"]);

const innerValue = ref(props.modelValue);

const handleClick = (count) => {
  innerValue.value = count;
  const score = count * props.score;
  emit("update:modelValue", count);
  emit("change", score);
};
</script>

<style lang="scss" scoped>
.iui-rate {
  display: flex;
  align-items: center;
  :not(:last-child) {
    margin-right: 10px;
  }

  &-star {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-image: v-bind(normalIcon);

    &.active {
      background-image: v-bind(activeIcon);
    }
  }
}
</style>
