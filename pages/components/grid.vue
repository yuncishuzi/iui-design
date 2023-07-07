<template>
  <Demo title="基本用法">
    <iui-grid>
      <iui-grid-row>
        <iui-grid-item>
          <view class="item">
            <view class="demo-block"> </view>
            <text>Title Text</text>
          </view>
        </iui-grid-item>
        <iui-grid-item>
          <view class="item">
            <view class="demo-block"> </view>
            <text>Title Text</text>
          </view>
        </iui-grid-item>
        <iui-grid-item>
          <view class="item">
            <view class="demo-block"> </view>
            <text>Title Text</text>
          </view>
        </iui-grid-item>
      </iui-grid-row>
      <iui-grid-row>
        <iui-grid-item>
          <view class="item">
            <view class="demo-block"> </view>
            <text>Title Text</text>
          </view>
        </iui-grid-item>
        <iui-grid-item>
          <view class="item">
            <view class="demo-block"> </view>
            <text>Title Text</text>
          </view>
        </iui-grid-item>
      </iui-grid-row>
    </iui-grid>
  </Demo>

  <Demo title="数据渲染">
    <iui-grid :data="data" :cols="4"></iui-grid>
  </Demo>

  <Demo title="图标大小">
    <iui-grid :data="data" :cols="4" :iconSize="24"></iui-grid>
  </Demo>

  <Demo title="横向布局">
    <iui-grid :data="data" :cols="2" direction="horizontal"></iui-grid>
  </Demo>

  <Demo title="宫格滚动">
    <iui-grid :data="data" :cols="2" scroll></iui-grid>
  </Demo>

  <Demo title="对齐方式">
    <iui-grid :data="data" :cols="2" align="start"></iui-grid>
    <iui-grid :data="data" :cols="2" align="center"></iui-grid>
    <iui-grid :data="data" :cols="2" align="end"></iui-grid>

    <iui-grid
      :data="data"
      :cols="2"
      direction="horizontal"
      align="start"
    ></iui-grid>
    <iui-grid
      :data="data"
      :cols="2"
      direction="horizontal"
      align="center"
    ></iui-grid>
    <iui-grid
      :data="data"
      :cols="2"
      direction="horizontal"
      align="end"
    ></iui-grid>
  </Demo>

  <Demo title="边框">
    <iui-space direction="vertical" size="large">
      <view class="w-full">
        <iui-grid :data="data" :cols="2" border></iui-grid>
      </view>
      <view class="w-full">
        <iui-grid
          :data="data"
          :cols="2"
          direction="horizontal"
          border
        ></iui-grid>
      </view>
    </iui-space>
  </Demo>

  <Demo title="间距">
    <iui-grid
      :data="data"
      :cols="2"
      border
      :colGap="20"
      :rowGap="20"
    ></iui-grid>
    <iui-grid
      :data="data"
      :cols="2"
      direction="horizontal"
      border
      :colGap="20"
      :rowGap="20"
    ></iui-grid>
  </Demo>
</template>

<script setup>
const data = [
  {
    icon: "",
    title: "Title Text1",
    desc: "Description",
  },
  {
    icon: "",
    title: "Title Text2",
    desc: "Description",
  },
  {
    icon: "",
    title: "Title Text3",
    desc: "Description",
  },
  {
    icon: "",
    title: "Title Text4",
    desc: "Description",
  },
];
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 10px 5px;
}

.demo-block {
  padding: 10px;
  background-color: var(--iui-blue-2);
  border-radius: 4px;
  width: 20px;
  height: 20px;
  margin-bottom: 10px;
}
</style>
