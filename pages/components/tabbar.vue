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
            name: item.name,
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
      capsule
      activeColor="#00B42A"
      :list="list"
      @change="onChange"
    ></iui-tabbar>
  </Demo>
</template>

<script setup>
const onChange = (e) => {
  console.log(e);
};

const list = [
  {
    icon: "home",
    name: "Home",
  },
  {
    icon: "search",
    name: "Search",
  },
  {
    icon: "user",
    name: "User",
  },
  {
    icon: "setting",
    name: "Setting",
  },
];

const slot = [
  {
    icon: "home",
    name: "Home",
  },
  {
    icon: "search",
    name: "Search",
  },
  {
    name: "Send",
  },
  {
    icon: "user",
    name: "User",
  },
  {
    icon: "setting",
    name: "Setting",
  },
];

const badge = [
  {
    icon: "home",
    name: "Home",
  },
  {
    icon: "search",
    name: "Search",

    badge: {
      text: 100,
      max: 99,
    },
  },
  {
    icon: "user",
    name: "User",
    badge: {
      text: 2,
    },
  },
  {
    icon: "setting",
    name: "Setting",
    badge: {
      dot: true,
    },
  },
];
</script>

<style lang="scss" scoped></style>
