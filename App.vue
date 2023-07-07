<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
@import "./packages/components/style/index.scss";
/*每个页面公共css */

page {
  background-color: $color-bg-secondary;
  font-family: -apple-system, PingFang SC, Helvetica Neue;
  height: 100%;
  overflow: scroll;
}

// 演示demo
/* #ifdef MP */
demo {
  & > view:last-child {
    margin-bottom: 32px;
  }
}

/* #endif */

.menu {
  padding: 0 16px 28px;

  &-title {
    font-size: 14px;
    color: rgb(147, 154, 163);
    line-height: 20px;
    margin-bottom: 12px;
    padding-left: 16px;
    position: relative;

    &::before {
      content: " ";
      display: inline-block;
      width: 2px;
      height: 12px;
      border-radius: 2px;
      background: #165dff;
      margin: 0 8px 0 8px;
      position: absolute;
      left: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
  }
}

.demo {
  &-title {
    font-size: 14px;
    font-weight: 400;
    padding: 8px 16px;
    color: rgb(147, 154, 163);

    /* #ifndef MP */
    &:not(:first-of-type) {
      padding-top: 32px;
    }
    /* #endif */
  }

  &-content {
    padding: 16px;
    background: $color-bg;
  }
}

.flex {
  &-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
}

.w {
  &-full {
    width: 100%;
  }
}
</style>
