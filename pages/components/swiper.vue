<template>
  <Demo title="基本用法">
    <iui-swiper :list="list"></iui-swiper>
  </Demo>

  <Demo title="前后间距">
    <iui-swiper :list="list" :margin="20" :width="90" :radius="4"></iui-swiper>
  </Demo>

  <Demo title="突出显示">
    <iui-swiper :list="list" margin="50" zoom :radius="4"></iui-swiper>
  </Demo>

  <Demo title="指示器样式">
    <iui-swiper :list="list" indicatorAlign="end"></iui-swiper>
    <view style="margin-top: 16px"></view>
    <iui-swiper :list="list" indicatorType="line"></iui-swiper>
    <view style="margin-top: 16px"></view>
    <iui-swiper :list="list">
      <template #indicator="{ current }">
        <view class="custom">
          <view class="indicator"> {{ current + 1 }}/{{ list.length }} </view>
        </view>
      </template>
    </iui-swiper>

    <view style="margin-top: 16px"></view>
    <iui-swiper :list="listWithContent.map((item) => item.image)">
      <template #indicator="{ current }">
        <view class="custom2">
          <view class="content">
            <view>{{ listWithContent[current].content }} </view>
            <view> {{ current + 1 }}/{{ listWithContent.length }} </view>
          </view>
        </view>
      </template>
    </iui-swiper>
  </Demo>

  <Demo title="垂直轮播图">
    <iui-swiper
      :list="list"
      direction="vertical"
      indicatorType="line"
    ></iui-swiper>
  </Demo>
</template>

<script setup>
const list = [
  "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg",
  "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg",
  "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_3.jpg",
];

// 带有内容的示例
const listWithContent = [
  {
    image:
      "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg",
    content: "This is content 1",
  },
  {
    image:
      "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg",
    content: "This is content 2",
  },
];
</script>

<style lang="scss" scoped>
.custom {
  display: flex;
  justify-content: flex-end;
  color: white;
  font-size: 14px;
}
.indicator {
  background-color: #00000030;
  padding: 0 10px;
  margin: 5px;
  border-radius: 10px;
}

.custom2 {
  width: 100%;
  color: white;
  font-size: 14px;
}
.content {
  display: flex;
  justify-content: space-between;
  background-color: #00000040;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}
</style>
