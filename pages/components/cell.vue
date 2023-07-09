<template>
  <Demo title="单格单元格" :padding="0">
    <iui-cell label="Cell"></iui-cell>
  </Demo>

  <Demo title="列表" :padding="0">
    <iui-list arrow>
      <iui-cell label="List Cell" :arrow="false"></iui-cell>
      <iui-cell label="List Cell"></iui-cell>
      <iui-cell label="List Cell"></iui-cell>
    </iui-list>
  </Demo>

  <Demo title="数据渲染" :padding="0">
    <iui-list arrow :data="list"> </iui-list>
  </Demo>

  <Demo title="描述信息" :padding="0">
    <iui-list>
      <iui-cell label="List Cell" desc="Description"></iui-cell>
      <iui-cell label="List Cell" desc="Description" arrow></iui-cell>
    </iui-list>
  </Demo>

  <Demo title="额外信息" :padding="0">
    <iui-list>
      <iui-cell label="List Cell" extra="Information"></iui-cell>
      <iui-cell label="List Cell" extra="Information" arrow></iui-cell>
    </iui-list>
  </Demo>

  <Demo title="图标" :padding="0">
    <iui-list>
      <iui-cell label="List Cell" icon="user" arrow></iui-cell>
      <iui-cell label="List Cell" icon="setting" arrow></iui-cell>
    </iui-list>
  </Demo>

  <Demo title="插槽" :padding="0">
    <iui-list>
      <iui-cell label="List Cell">
        <template #icon>
          <iui-avatar size="small"></iui-avatar>
        </template>
      </iui-cell>
      <iui-cell label="List Cell">
        <template #extra>
          <iui-avatar size="small"></iui-avatar>
        </template>
      </iui-cell>

      <iui-cell label="List Cell">
        <template #extra>
          <iui-button size="mini" inline>Extra</iui-button>
        </template>
      </iui-cell>

      <iui-cell label="List Cell" desc="Description" extra="Information">
        <template #icon>
          <iui-avatar size="medium"></iui-avatar>
        </template>
      </iui-cell>
    </iui-list>
  </Demo>
</template>

<script setup>
const list = [
  {
    icon: "smile",
    label: "Data Cell",
    arrow: false,
  },
  {
    label: "Data Cell",
  },
  {
    label: "Data Cell",
    desc: "Description",
    extra: "Information",
  },
];
</script>

<style lang="scss" scoped></style>
