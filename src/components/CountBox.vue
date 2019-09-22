<template>
  <div class="count-box">
    <div class="count-top">
      <slot></slot>
    </div>
    <div class="count-bottom">
      <div class="count-num">
        <countTo
          class="nums"
          :style="{ color: color}"
          :startVal="startVal"
          :endVal="count"
          :duration="3000"
          :separator="separator"
        ></countTo>
        <div class="count-desc">{{title}}</div>
      </div>
      <div class="count-right">
        <div class="count-item">月环比
          <em v-show="parseFloat(rightNum) >= 0" class="icon icon-up"></em><em v-show="parseFloat(rightNum) < 0" class="icon icon-down"></em>
          {{rightNum}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "CountBox",
  props: {
    title: {
      type: String
    },
    color: {
      type: String,
      default: "#c6dffe"
    },
    separator: {
      type: String,
      default: ","
    },
    leftNum: {
      default: 0
    },
    rightNum: {
      type: String,
      default: '0'
    },
    count: {
      type: Number,
      default:0
    }
  },
  components: {
    countTo
  },
  data() {
    return {
      startVal: 0,
    };
  }
};
</script>

<style lang='scss'>
.count-box {
  width: 480px;
  height: 135px;
  padding: 0 25px;
  box-sizing: border-box;
  border: 1px solid #546acd;
  margin-bottom: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .count-top {
    height: 135px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .count-bottom {
    height: 135px;
    padding: 20px 0;
    box-sizing: border-box;
    .count-num {
      height: 70px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .nums {
        font-size: 20px;
        line-height: 40px;
      }
    }
    .count-desc {
      font-size: 13px;
      color: #d5e7fe;
    }
    .count-item {
      display: flex;
      align-items: center;
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
</style>
