<template>
  <div :class="['count-box2', backgroundShow ? 'count-box2-bg': ''] ">
    <div class="top">
      <slot></slot>
      <countTo
        class="nums"
        :style="{ color: color}"
        :startVal="0"
        :endVal="num"
        :duration="4000"
        :separator="separator"
      ></countTo>
    </div>
    <div class="count-bottom">
      <div class="count-item">
        <span v-if="showLeftNum">月环比</span>
        <em v-if="showLeftNum"  v-show="leftNum >= 0" class="icon icon-up"></em>
        <em v-if="showLeftNum" v-show="leftNum < 0" class="icon icon-down"></em>
        <span v-if="showLeftNum">{{leftNum}}%</span>
      </div>
      <div class="count-right">{{title}}</div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "count-box-2",
  props: {
    backgroundShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    num: {
      type: Number,
      default: 0
    },
    separator: {
      type: String,
      default: ","
    },
    color: {
      type: String,
      default: "#fd9e61"
    },
    showLeftNum: {
      type:Boolean,
      default:true,
    },
    leftNum: {
      default: 0
    }
  },
  components: {
    countTo
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.count-box2 {
  width: 390px;
  height: 140px;
  background-size: 100% 100%;
  padding: 20px;
  box-sizing: border-box;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .nums{
      font-size: 56px;
      font-family: 'Tith';  
      letter-spacing: 3px;
    }
  }
  .count-bottom {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .count-item {
      display: flex;
      align-items: center;
    }
    .count-right{
      font-size: 16px;
      font-weight: 400;
    }
    .icon {
      width: 8px;
      height: 14px;
      display: inline-block;
      margin: 0 10px;
    }
    .icon-up {
      background: url("../assets/up.png") no-repeat center;
      background-size: cover;
    }
    .icon-down {
      background: url("../assets/down.png") no-repeat center;
      background-size: cover;
    }
  }
}
.count-box2-bg {
  background: url("../assets/bg4.png") no-repeat center;
  background-size: 100% 100%;
  margin-bottom: 20px;
}
</style>
