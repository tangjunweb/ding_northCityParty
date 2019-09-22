<template>
  <div class="progress-wrapper" :style="wrapStyle">
    <div class="progress" :style="pBarStyle">
      <div class="left" :style="leftStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    leftBg: String,
    bgc: String,
    height: String,
    width: String,
    percent: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      wrapStyle: {
        width: this.width
      },
      pBarStyle: {
        backgroundColor: this.bgc,
        height: this.height
      },
      leftStyle: {
        width: this.percent + "%",
        background: this.leftBg,
        height: this.height
      }
    };
  },
  computed: {
    progressElement() {
      return this.$el.getElementsByClassName("progress")[0];
    }
  },
  methods: {},
  watch: {
    percent: {
      immediate: true,
      handler(n) {
        this.leftStyle.width = n + "%";
      //  if (n > 70) {
          this.leftStyle = {
            background:'linear-gradient(90deg,rgba(57,225,109,1),rgba(137,255,91,1))',
          //  background: '-webkit-linear-gradient(left, #f30720, #f615be)',
            height: this.height
          };
        // } else {
        //   this.leftStyle = {
        //     background: '-webkit-linear-gradient(left, #5f16cf, #5879db, #4ce6e9)',
        //     height: this.height
        //   };
        // }
        this.leftStyle.width = n + "%";
      }
    }
  }
};
</script>

<style scoped>
.progress-wrapper {
  /*width:100%;*/
}
.progress {
  width: 100%;
  height: 20px;
  /* background-color: #3a3693; */
  background:rgba(255,255,255,0.2);
  overflow: hidden;
  cursor: pointer;
}
.left {
  height: 100%;
  width: 0;
  background: -webkit-linear-gradient(left, #5f16cf, #5879db, #4ce6e9);
  position: relative;
  transition: all 0.5s;
}
</style>