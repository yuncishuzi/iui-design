<template>
  <Demo title="基本用法" padding="0">
    <iui-tabbar :list="list"></iui-tabbar>
  </Demo>
  <Demo title="仅图标" padding="0">
    <iui-tabbar
      :list="
        list.map((item) => {
          return {
            icon: item.icon,
          };
        })
      "
    ></iui-tabbar>
  </Demo>

  <Demo title="仅标题" padding="0">
    <iui-tabbar
      :list="
        list.map((item) => {
          return {
            title: item.title,
          };
        })
      "
    ></iui-tabbar>
  </Demo>

  <Demo title="徽标" padding="0">
    <iui-tabbar :list="badge"></iui-tabbar>
  </Demo>

  <Demo title="插槽" padding="0">
    <iui-tabbar :list="slot">
      <template #Send>
        <iui-avatar
          src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_6.jpeg"
        ></iui-avatar>
      </template>
    </iui-tabbar>
  </Demo>

  <Demo title="悬浮胶囊标签栏" padding="10" bgColor="transparent">
    <iui-tabbar
      activeColor="#00B42A"
      capsule
      :list="
        list.map((item) => {
          return {
            icon: item.icon,
          };
        })
      "
    ></iui-tabbar>
  </Demo>
</template>

<script setup>
const list = [
  {
    icon: "home",
    title: "Home",
  },
  {
    icon: "search",
    title: "Search",
  },
  {
    icon: "user",
    title: "User",
  },
  {
    icon: "setting",
    title: "Setting",
  },
];

const slot = [
  {
    icon: "home",
    title: "Home",
  },
  {
    icon: "search",
    title: "Search",
  },
  {
    title: "Send",
  },
  {
    icon: "user",
    title: "User",
  },
  {
    icon: "setting",
    title: "Setting",
  },
];

const badge = [
  {
    icon: "home",
    title: "Home",
  },
  {
    icon: "search",
    title: "Search",

    badge: {
      text: 100,
      max: 99,
    },
  },
  {
    icon: "user",
    title: "User",
    badge: {
      text: 2,
    },
  },
  {
    icon: "setting",
    title: "Setting",
    badge: {
      dot: true,
    },
  },
];
</script>

<style lang="scss" scoped></style>
