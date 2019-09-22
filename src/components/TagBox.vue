<template>
  <div class="tag-box">
    <div v-if="position" class="title" :style="{height: height + 'px'}">{{title}}</div>
    <div class="inner" :style="{height: height + 'px'}">
      <slot></slot>
    </div>
    <div v-if="!position" class="title" :style="{height: height + 'px'}">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "tag-box",
  props: {
    title: {
      type: String,
      required: true
    },
    position: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang='scss' scoped>
.tag-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  .title {
    width: 50px;
    text-align: center;
    box-sizing: border-box;
    writing-mode: vertical-lr;
    writing-mode: tb-rl;
    line-height: 50px;
    letter-spacing: 2px;
    background-color: #363c7a;
    font-size: 16px;
  }
  .inner{
    flex:1;
    border: 1px solid #546acd;
    box-sizing: border-box;
    
  }
}
</style>
