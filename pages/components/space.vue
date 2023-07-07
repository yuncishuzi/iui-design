<template>
  <Demo title="基本用法">
    <iui-space>
      <view>
        <iui-button inline type="primary">Item1</iui-button>
      </view>
      <view>
        <iui-button inline type="primary">Item2</iui-button>
      </view>
      <view>
        <iui-button inline type="primary">Item3</iui-button>
      </view>
    </iui-space>
  </Demo>

  <Demo title="垂直间距">
    <iui-space direction="vertical">
      <view class="w-full">
        <iui-button type="primary">Item1</iui-button>
      </view>
      <view class="w-full">
        <iui-button type="primary">Item2</iui-button>
      </view>
      <view class="w-full">
        <iui-button type="primary">Item3</iui-button>
      </view>
    </iui-space>
  </Demo>

  <Demo title="间距大小">
    <iui-space direction="vertical" size="small">
      <view>
        <iui-space size="mini">
          <view><iui-button inline type="primary">mini</iui-button></view>
          <view>
            <iui-button inline type="primary">mini</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">mini</iui-button>
          </view>
        </iui-space>
      </view>
      <view>
        <iui-space size="small">
          <view>
            <iui-button inline type="primary">small</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">small</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">small</iui-button>
          </view>
        </iui-space>
      </view>
      <view>
        <iui-space size="medium">
          <view>
            <iui-button inline type="primary">medium</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">medium</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">medium</iui-button>
          </view>
        </iui-space>
      </view>
      <view>
        <iui-space size="large">
          <view>
            <iui-button inline type="primary">large</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">large</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">large</iui-button>
          </view>
        </iui-space>
      </view>
    </iui-space>
  </Demo>

  <Demo title="水平对齐">
    <iui-space direction="vertical" size="large">
      <view>
        <iui-space align="start" size="large">
          <view>
            <iui-button type="primary" size="mini">start</iui-button>
          </view>
          <view>
            <iui-button type="primary" size="small">start</iui-button>
          </view>
          <view>
            <iui-button type="primary" size="large">start</iui-button>
          </view>
        </iui-space>
      </view>

      <view>
        <iui-space align="center" size="large">
          <view>
            <iui-button type="primary" size="mini">center</iui-button>
          </view>
          <view>
            <iui-button type="primary" size="small">center</iui-button>
          </view>
          <view>
            <iui-button type="primary" size="large">center</iui-button>
          </view>
        </iui-space>
      </view>

      <view>
        <iui-space align="end" size="large">
          <view>
            <iui-button type="primary" size="mini">end</iui-button>
          </view>
          <view>
            <iui-button type="primary" size="small">end</iui-button>
          </view>
          <view><iui-button type="primary" size="large">end</iui-button></view>
        </iui-space>
      </view>
    </iui-space>
  </Demo>

  <Demo title="垂直对齐">
    <view class="flex-between">
      <iui-space align="start" direction="vertical">
        <view>
          <iui-button inline type="primary" size="mini">start</iui-button>
        </view>
        <view>
          <iui-button inline type="primary" size="small">start</iui-button>
        </view>
        <view>
          <iui-button inline type="primary" size="large">start</iui-button>
        </view>
      </iui-space>

      <iui-space align="center" direction="vertical">
        <view>
          <iui-button inline type="primary" size="mini">center</iui-button>
        </view>
        <view>
          <iui-button inline type="primary" size="small">center</iui-button>
        </view>
        <view>
          <iui-button inline type="primary" size="large">center</iui-button>
        </view>
      </iui-space>

      <iui-space align="end" direction="vertical">
        <view>
          <iui-button inline type="primary" size="mini">end</iui-button>
        </view>
        <view>
          <iui-button inline type="primary" size="small">end</iui-button>
        </view>
        <view>
          <iui-button inline type="primary" size="large">end</iui-button>
        </view>
      </iui-space>
    </view>
  </Demo>

  <Demo title="间距换行">
    <iui-space wrap>
      <view>
        <iui-button inline type="primary">Item1</iui-button>
      </view>
      <view>
        <iui-button inline type="primary">Item2</iui-button>
      </view>
      <view>
        <iui-button inline type="primary">Item3</iui-button>
      </view>
      <view>
        <iui-button inline type="primary">Item4</iui-button>
      </view>
      <view>
        <iui-button inline type="primary">Item5</iui-button>
      </view>
      <view>
        <iui-button inline type="primary">Item6</iui-button>
      </view>
      <view>
        <iui-button inline type="primary">Item7</iui-button>
      </view>
    </iui-space>
  </Demo>

  <Demo title="间距自适应">
    <iui-space direction="vertical">
      <view class="w-full">
        <iui-space fill>
          <view>
            <iui-button inline type="primary">Item1</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">Item2</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">Item3</iui-button>
          </view>
        </iui-space>
      </view>

      <view class="w-full">
        <iui-space fill>
          <view>
            <iui-button inline type="primary">Item1</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">Item2</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">Item3</iui-button>
          </view>
          <view>
            <iui-button inline type="primary">Item4</iui-button>
          </view>
        </iui-space>
      </view>
    </iui-space>
  </Demo>
</template>

<script setup></script>

<style scoped></style>
