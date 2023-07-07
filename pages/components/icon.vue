<template>
  <Demo title="图标大小">
    <iui-space size="large">
      <view>
        <iui-icon name="smile"></iui-icon>
      </view>
      <view>
        <iui-icon name="smile" size="24"></iui-icon>
      </view>
      <view>
        <iui-icon name="smile" size="30"></iui-icon>
      </view>
    </iui-space>
  </Demo>

  <Demo title="图标颜色" :style="{ marginBottom: '20px' }">
    <iui-space size="large">
      <view>
        <iui-icon name="smile" size="30" color="#27C346"></iui-icon>
      </view>
      <view>
        <iui-icon name="smile" size="30" color="#3C7EFF"></iui-icon>
      </view>
      <view>
        <iui-icon name="smile" size="30" color="#F76965"></iui-icon>
      </view>
    </iui-space>
  </Demo>

  <Demo title="旋转动画" :style="{ marginBottom: '20px' }">
    <iui-space size="large">
      <view>
        <iui-icon name="loading" size="30" color="#3C7EFF"></iui-icon>
      </view>
      <view>
        <iui-icon name="sync" size="30" spin></iui-icon>
      </view>
    </iui-space>
  </Demo>

  <Demo title="自定义旋转角度" :style="{ marginBottom: '20px' }">
    <view>
      <iui-icon name="send" size="30" color="#3C7EFF" :rotate="-45"></iui-icon>
    </view>
  </Demo>

  <Demo
    :title="group.title"
    v-for="(group, groupIdx) in iconGroup"
    :key="groupIdx"
  >
    <iui-grid :cols="cols" border>
      <iui-grid-row
        v-for="(_, rowIdx) in getRows(group.icons)"
        :key="`${groupIdx}-${rowIdx}`"
      >
        <iui-grid-item
          v-for="item in getRowData(group.icons, rowIdx)"
          @click="copyIcon(item)"
        >
          <view class="icon">
            <iui-icon :name="item" />
            <text>{{ item }}</text>
          </view>
        </iui-grid-item>
      </iui-grid-row>
    </iui-grid>
  </Demo>
</template>

<script setup>
const iconGroup = [
  {
    title: "方向指示类",
    icons: [
      "left",
      "right",
      "up",
      "down",
      "arrowleft",
      "arrowright",
      "arrowup",
      "arrowdown",
      "doubleleft",
      "doubleright",
      "verticalleft",
      "fullscreen",
      "fullscreen-exit",
      "swap-left",
      "swap-right",
      "left-circle",
      "right-circle",
      "up-circle",
      "down-circle",
      "left-circle-fill",
      "right-circle-fill",
      "up-circle-fill",
      "down-circle-fill",
      "caret-left",
      "caret-right",
      "caret-up",
      "caret-down",
    ],
  },
  {
    title: "提示建议类",
    icons: [
      "plus",
      "minus",
      "check",
      "close",
      "stop",
      "pushpin",
      "info-circle",
      "check-circle",
      "close-circle",
      "question-circle",
      "warning-circle",
      "minus-circle",
      "plus-circle",
      "check-circle-fill",
      "close-circle-fill",
      "question-circle-fill",
      "info-circle-fill",
      "warning-circle-fill",
      "minus-circle-fill",
      "plus-circle-fill",
      "stop-fill",
    ],
  },
  {
    title: "交互类",
    icons: [
      "heart",
      "like",
      "unlike",
      "star",
      "phone",
      "cloud-download",
      "upload",
      "file-add",
      "folder-add",
      "file-copy",
      "filesearch",
      "scissor",
      "delete",
      "switchuser",
      "adduser",
      "deleteuser",
      "addteam",
      "deleteteam",
      "edit",
      "attachment",
      "edit-square",
      "Import",
      "export",
      "formatpainter",
      "save",
      "translate",
      "filter",
      "send",
      "clear",
      "search",
      "scan",
      "number",
      "compass",
      "eye",
      "eye-close",
      "setting",
      "heart-fill",
      "like-fill",
      "unlike-fill",
      "star-fill",
      "formatpainter-fill",
      "setting-fill",
      "compass-fill",
      "eye-fill",
      "eyeclose-fill",
    ],
  },
  {
    title: "影音类",
    icons: [
      "play-circle",
      "timeout",
      "backward",
      "forward",
      "fast-backward",
      "fast-forward",
      "step-backward",
      "step-forward",
      "customerservice",
      "audio",
      "audiostatic",
      "audio-fill",
    ],
  },
  {
    title: "商标类",
    icons: [
      "alipay",
      "taobao",
      "zhihu",
      "facebook",
      "skype",
      "CodeSandbox",
      "chrome",
      "codepen",
      "apple",
      "android",
      "windows",
      "sketch",
      "Gitlab",
      "dribbble",
      "instagram",
      "appstore",
      "google",
      "QQ",
      "wechat-fill",
      "twitter",
      "Youtube-fill",
      "dropbox",
      "apple-fill",
      "android-fill",
      "windows-fill",
      "weibo",
      "alipay-circle-fill",
      "taobao-circle-fill",
      "zhihu-circle-fill",
      "weibo-circle-fill",
      "Gitlab-fill",
      "github-fill",
      "appstore-fill",
    ],
  },
  {
    title: "通用类",
    icons: [
      "key",
      "api",
      "link",
      "man",
      "woman",
      "tag",
      "tags",
      "branches",
      "crown",
      "gift",
      "fire",
      "thunderbolt",
      "robot",
      "bug",
      "message",
      "comment",
      "appstoreadd",
      "YUAN",
      "Dollar",
      "frown",
      "meh",
      "smile",
      "trademark",
      "copyright",
      "time-circle",
      "earth",
      "sync",
      "reloadtime",
      "dashboard",
      "poweroff",
      "location",
      "codelibrary",
      "border",
      "user",
      "team",
      "linechart",
      "barchart",
      "container",
      "database",
      "sever",
      "mobile",
      "tablet",
      "book",
      "file",
      "file-text",
      "safetycertificate",
      "alert",
      "bulb",
      "bell",
      "trophy",
      "experiment",
      "skin",
      "home",
      "lock",
      "unlock",
      "flag",
      "rocket",
      "shopping",
      "folder",
      "folder-open",
      "deploymentunit",
      "contacts",
      "carryout",
      "calendar",
      "calendar-check",
      "cloud",
      "notification",
      "sound",
      "qrcode",
      "image",
      "camera",
      "read",
      "mail",
      "idcard",
      "frown-fill",
      "meh-fill",
      "smile-fill",
      "crown-fill",
      "trophy-fill",
      "dashboard-fill",
      "message-fill",
      "mobile-fill",
      "safetycertificate-f",
      "fire-fill",
    ],
  },
];

const cols = 3;

const getRows = (icons) => {
  return Math.ceil(icons.length / cols);
};

const getRowData = (icons, rowIdx) => {
  const start = rowIdx * cols;
  const end = start + cols;
  return icons.slice(start, end);
};

const copyIcon = (name) => {
  const icon = `<iui-icon name="${name}" />`;

  uni.setClipboardData({
    data: icon,
    success: () => {
      uni.showToast({
        title: "复制成功",
        icon: "none",
      });
    },
    fail: () => {
      uni.showToast({
        title: "复制失败",
        icon: "none",
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.icon {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  text {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
}
</style>
