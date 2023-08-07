<template>
  <view :class="prefixCls">
    <iui-popup
      v-model="innerVisible"
      :containerStyle="{
        borderTopLeftRadius: `${sheet.radius}px`,
        borderTopRightRadius: `${sheet.radius}px`,
        height: 'auto',
      }"
      :contentStyle="{
        padding: 0,
      }"
      @close="close"
    >
      <view :class="`${prefixCls}-list`">
        <block v-for="(action, idx) in sheet.actions" :key="idx">
          <view
            :class="`${prefixCls}-list-item`"
            @click="handleActionClick(action, idx)"
          >
            <view v-if="!isObject(action)">
              {{ action }}
            </view>

            <view v-else-if="action.slotName">
              <slot :name="action.slotName" />
            </view>

            <view
              v-else
              :style="{
                color: action.color,
              }"
            >
              <view>{{ action.name }}</view>
            </view>
          </view>
        </block>
      </view>
      <!-- cancel -->
      <view :class="`${prefixCls}-cancel`" @click="close">
        <view :class="`${prefixCls}-list-item`">
          {{ sheet.cancelText }}
        </view>
      </view>
    </iui-popup>
  </view>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { isObject } from "../../helper/is";

const props = defineProps({
  /**
   * 可见
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * 标题
   */
  title: {
    type: String,
  },
  /**
   * 圆角
   */
  radius: {
    type: Number,
    default: 6,
  },
  /**
   * 动作列表
   * type : [String,Object]
   * 如果是字符串，则直接显示文字
   * 如果是对象，则显示对象的name和自定义颜色
   * 也可以通过slot来自定义内容，slot的名称为对象的slot属性
   */
  actions: {
    type: Array,
    default: () => [],
  },
  /**
   * 显示取消按钮
   */
  cancel: {
    type: Boolean,
    default: true,
  },
  /**
   * 取消文字
   */
  cancelText: {
    type: String,
    default: "取消",
  },
});

const prefixCls = "iui-action-sheet";
const emit = defineEmits(["update:modelValue", "open", "close", "click"]);

const innerVisible = ref(props.modelValue);

const sheet = ref({
  title: props.title,
  radius: props.radius,
  actions: props.actions,
  cancel: props.cancel,
  cancelText: props.cancelText,
});

const open = (params) => {
  sheet.value = Object.assign(sheet.value, params);

  innerVisible.value = true;
  emit("update:modelValue", true);
  emit("open");
};

const close = () => {
  innerVisible.value = false;
  emit("update:modelValue", false);
  emit("close");
};

const handleActionClick = (action, idx) => {
  emit("click", action, idx);

  close();
};

onMounted(() => {
  watch(
    () => props.modelValue,
    (value) => {
      innerVisible.value = value;
    },
    {
      immediate: true,
    }
  );
});

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";

.iui-action-sheet {
  &-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    :last-child {
      border: none;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60px;
      width: 100%;
      font-size: 17px;
      border-bottom: 1px solid $color-bg-secondary;
      :active {
        opacity: 0.5;
      }
    }
  }

  &-cancel {
    width: 100%;
    position: relative;
    border-top: 8px solid $color-bg-secondary;
  }
}
</style>
