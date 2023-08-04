<template>
  <iui-page>
    <template #navbar>
      <iui-navbar
        title="Fixed Navbar"
        back
        fixed
        hideStatusBar
        :customStyle="{
          background:
            'url(https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '50% 60%',
          color: '#333',
        }"
      ></iui-navbar>
    </template>
    <Demo title="基本用法" :padding="0" bgColor="transparent">
      <iui-space direction="vertical" size="medium">
        <view>
          <iui-navbar title="Title"></iui-navbar>
        </view>
        <view>
          <iui-navbar title="Title" back></iui-navbar>
        </view>

        <view>
          <iui-navbar
            title="Background Color"
            back
            hideStatusBar
            :customStyle="{
              backgroundColor: '#165DFF',
              color: '#fff',
            }"
          ></iui-navbar>
        </view>
      </iui-space>
    </Demo>

    <Demo title="自定义样式" :padding="0" bgColor="transparent">
      <iui-space direction="vertical" size="medium">
        <view>
          <iui-navbar hideStatusBar>
            <template #left>
              <view class="search">
                <iui-icon style="display: contents" name="search"></iui-icon>
                <input
                  style="font-size: small; margin-left: 4px"
                  placeholder="搜索"
                />
              </view>
            </template>
          </iui-navbar>
        </view>

        <view>
          <iui-navbar
            title="Background Image"
            back
            hideStatusBar
            :customStyle="{
              background:
                'url(https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/navbar-demo-bg.png)',
              backgroundSize: 'cover',
              color: '#fff',
              height: '160px',
              padding: '10px 0',
            }"
          ></iui-navbar>
        </view>
      </iui-space>
    </Demo>

    <Demo title="异步返回" :padding="0" bgColor="transparent">
      <view>
        <iui-navbar title="Title" :beforeBack="beforeBack" back></iui-navbar>
      </view>
    </Demo>
  </iui-page>
</template>

<script setup>
const beforeBack = (done) => {
  uni.showModal({
    title: "确认返回吗",
    content: "",
    showCancel: true,
    success: ({ confirm }) => {
      if (confirm) {
        done();
      }
    },
  });
};
</script>

<style scoped>
view {
  width: 100%;
}

.search {
  background: var(--iui-gray-1);
  padding: 2px 4px 2px 8px;
  border-radius: 20px;
  color: var(--iui-gray-6);
  display: flex;
  align-items: center;
  width: 180px;
}
</style>
