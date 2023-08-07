<template>
  <Demo title="默认">
    <iui-space size="large">
      <view><iui-avatar></iui-avatar></view>
      <view><iui-avatar shape="square"></iui-avatar></view>
      <view
        ><iui-avatar
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
        ></iui-avatar
      ></view>
    </iui-space>
  </Demo>
  <Demo title="大小">
    <iui-space size="large">
      <view><iui-avatar size="huge"></iui-avatar></view>
      <view><iui-avatar size="large"></iui-avatar></view>
      <view><iui-avatar size="medium"></iui-avatar></view>
      <view><iui-avatar size="small"></iui-avatar></view>
      <view><iui-avatar size="mini"></iui-avatar></view>
    </iui-space>
  </Demo>

  <Demo title="文字头像">
    <iui-space size="large">
      <view><iui-avatar size="large" bgColor="#4080FF">YC</iui-avatar></view>
      <view
        ><iui-avatar shape="square" size="large" bgColor="rgb(255, 125, 0)"
          >T</iui-avatar
        >
      </view>
    </iui-space>
  </Demo>

  <Demo title="用户信息">
    <view
      ><iui-avatar
        size="small"
        src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
        avatarName="Username"
      ></iui-avatar
    ></view>
  </Demo>

  <Demo title="对齐方式">
    <iui-space direction="vertical" size="large">
      <view
        ><iui-avatar
          size="small"
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
          avatarName="Auto fit size"
          avatarDesc="Auxiliary information"
          autoSize
        ></iui-avatar
      ></view>
      <view
        ><iui-avatar
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
          align="center"
          avatarName="Align center"
          avatarDesc="This is a long description, which is automatically adapted to the number of lines,set algin to start, it will be look better"
        ></iui-avatar
      ></view>
      <view
        ><iui-avatar
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
          align="start"
          avatarName="Align start"
          avatarDesc="This is a long description, which is automatically adapted to the number of lines,set algin to start, it will be look better"
        ></iui-avatar
      ></view>
    </iui-space>
  </Demo>

  <Demo title="插槽">
    <iui-space direction="vertical" size="large">
      <view
        ><iui-avatar
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
        >
          <template #avatarName>
            <text class="primary"> Slot AvatarName</text>
          </template>
        </iui-avatar></view
      >
      <view
        ><iui-avatar
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
          avatarName="Username"
          avatarDesc="Auxiliary information"
        >
          <template #avatarDesc>
            <text class="primary"> Slot AvatarDesc </text></template
          >
        </iui-avatar></view
      >
      <view
        ><iui-avatar
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
          align="start"
          avatarName="Username"
          avatarDesc="This is a long description, which is automatically adapted to the number of lines,set algin to start, it will be look better"
        >
          <template #extra>
            <iui-button size="small">Slot Extra</iui-button>
          </template>
        </iui-avatar></view
      >
    </iui-space>
  </Demo>
</template>

<script setup></script>

<style scoped>
.primary {
  color: var(--iui-primary-6);
}
</style>
