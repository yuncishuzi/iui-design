<template>
  <iui-page>
    <Demo title="基本用法">
      <iui-space>
        <view>
          <iui-tag>Default</iui-tag>
        </view>
        <view>
          <iui-tag>Tag1</iui-tag>
        </view>
        <view>
          <iui-tag>Tag2</iui-tag>
        </view>
        <view>
          <iui-tag icon="check-circle-fill">Compolete</iui-tag>
        </view>
      </iui-space>
    </Demo>

    <Demo title="标签大小">
      <iui-space>
        <view>
          <iui-tag size="large">Large</iui-tag>
        </view>

        <view>
          <iui-tag size="medium">Medium</iui-tag>
        </view>

        <view>
          <iui-tag size="small">small</iui-tag>
        </view>
      </iui-space>
    </Demo>

    <Demo title="自定义颜色">
      <iui-space wrap>
        <view v-for="(color, idx) in colors" :key="idx">
          <iui-tag :color="color">{{ color }}</iui-tag>
        </view>
      </iui-space>
    </Demo>

    <Demo title="标签图标">
      <iui-space>
        <view>
          <iui-tag icon="github-fill">Github</iui-tag>
        </view>

        <view>
          <iui-tag icon="QQ" color="#168cff">QQ</iui-tag>
        </view>

        <view>
          <iui-tag icon="wechat-fill" color="#00b42a">Wechat</iui-tag>
        </view>
      </iui-space>
    </Demo>

    <Demo title="可关闭标签">
      <iui-space>
        <view>
          <iui-tag closeable>Tag</iui-tag>
        </view>
        <view>
          <iui-tag icon="star" closeable>Tag</iui-tag>
        </view>
      </iui-space>
    </Demo>

    <Demo title="可选择中">
      <iui-space wrap>
        <view>
          <iui-tag checkable>Checkable</iui-tag>
        </view>
        <view>
          <iui-tag checkable checked>Default Checked</iui-tag>
        </view>

        <view>
          <iui-tag checkable checked checkedColor="#00B42A"
            >Custom CheckedColor</iui-tag
          >
        </view>
      </iui-space>
    </Demo>
  </iui-page>
</template>

<script setup>
const colors = [
  "#f53f3f",
  "#7816ff",
  "#00b42a",
  "#165dff",
  "#ff7d00",
  "#eb0aa4",
  "#7bc616",
  "#86909c",
  "#b71de8",
  "#0fc6c2",
  "#ffb400",
  "#168cff",
  "#ff5722",
];
</script>

<style scoped></style>
