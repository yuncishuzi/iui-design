<template>
  <view :class="cls">
    <block v-for="(tab, idx) in list" :key="idx">
      <view
        :class="[
          `${prefixCls}-item`,
          { active: tab.name === innerValue || idx === innerValue },
        ]"
        @click="handleChange(tab, idx)"
      >
        <iui-badge v-bind="tab.badge" :position="[30, 0]">
          <view class="tab" v-if="!$slots[tab.name]">
            <view
              :class="[`${prefixCls}-icon`, { 'icon-only': !tab.name }]"
              v-if="tab.icon"
            >
              <iui-icon :name="tab.icon"></iui-icon>
            </view>
            <view
              :class="[`${prefixCls}-name`, { 'name-only': !tab.icon }]"
              v-if="!capsule && tab.name"
              >{{ tab.name }}</view
            >
          </view>
          <view class="tab" v-else>
            <slot :name="tab.name"></slot>
          </view>
        </iui-badge>
      </view>
    </block>
  </view>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  /**
   * 当前选中
   */
  current: {
    type: [Number, String],
    default: 0,
  },
  /**
   * 列表
   * list: [{icon: 'home', name: 'Home', badge: BadgeProps}]
   * name可以为slot
   */
  list: {
    type: Array,
    default: () => [],
  },
  /**
   * 激活颜色
   */
  activeColor: {
    type: String,
    default: "#165DFF",
  },
  /**
   * 悬浮胶囊
   */
  capsule: {
    type: Boolean,
    default: false,
  },
});
const prefixCls = "iui-tabbar";
const cls = computed(() => [
  prefixCls,
  {
    [`${prefixCls}-capsule`]: props.capsule,
  },
]);

const innerValue = ref(props.current);

const emit = defineEmits(["change"]);

const handleChange = (tab, idx) => {
  innerValue.value = tab.name || idx;
  emit("change", tab.name || idx);
};

const capsuleBackground = computed(() => {
  if (!props.capsule) return;

  return props.activeColor + "1A";
});
</script>

<style lang="scss" scoped>
.iui-tabbar {
  display: flex;
  align-items: stretch;
  width: 100%;
  //   overflow: hidden;
  min-height: 48px;
  color: #86909c;

  &-capsule {
    background-color: $color-bg;
    border-radius: 36px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    min-height: 54px;
    padding: 8px;
    .iui-tabbar-icon {
      margin: 0;
    }

    .iui-tabbar-item {
      &.active {
        border-radius: 36px;
        background: v-bind(capsuleBackground);
        color: v-bind(activeColor);
      }
    }
  }

  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-item {
    flex: 1;
    display: flex;
    justify-content: center;

    &.active {
      color: v-bind(activeColor);
    }
  }

  &-icon {
    font-size: 20px;
    line-height: 20px;
    margin: 7px 0 2px;

    &.icon-only {
      margin: 0;
    }
  }

  &-name {
    font-size: 12px;
    margin-bottom: 5px;

    &.name-only {
      margin-bottom: 0;
      font-size: 14px;
    }
  }
}
</style>
