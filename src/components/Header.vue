<template>
  <div class="header">
    <div class="header-wrapper">
      <!-- <p>重点工作监督即时</p> -->
      <img class="header-text" src="@/assets/title-bg.png" alt>
       <slot></slot>
      <!-- <span class="timer">{{times}}</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  data() {
    return {
      currentSrc: "",
      imgText: [
        {
          path: "/Education",
          src: require("../assets/head-text-1.png")
        },
        {
          path: "/Analysis",
          src: require("../assets/head-text-2.png")
        },
        {
          path: "/Server",
          src: require("../assets/head-text-3.png")
        },
        {
          path: "/Propaganda",
          src: require("../assets/head-text-4.png")
        },
        {
          path: "/Manage",
          src: require("../assets/head-text-5.png")
        },
        {
          path: "/Map",
          src: require("@/assets/banner-logo.png")
        }
      ],
      interval: '',
      times: ''
    };
  },
  watch: {
    $route(n) {
      this.imgText.map(e => {
        if (e.path == n.path) {
          this.currentSrc = e.src;
          return;
        }
      });
    }
  },
  mounted() {
    this.interval = setInterval(this.timer, 1000)
  },
  methods: {
    timer() {
      const date1 = new Date();
      const year = date1.getFullYear();
      const month = date1.getMonth();
      const day = date1.getDate();
      const hh = date1.getHours() > 9 ? date1.getHours() : '0' + date1.getHours();
      const mm = date1.getMinutes() > 9 ? date1.getMinutes() : '0' + date1.getMinutes();
      const ss = date1.getSeconds() > 9 ? date1.getSeconds() : '0' + date1.getSeconds();
      this.times = year + "年" + `${(parseInt(month) + 1)}` + "月" + day + "日   " + hh + ":" + mm + ":" + ss;
    }
  },
  destroyed() {
    clearInterval(this.interval)
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 107px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: #111623;
  .header-wrapper {
    width: 100%; // background: url("../assets/head-bg.png") no-repeat center;
    // background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    p {
      // width: 387px;
      // height: 34px;
      text-align: center;
      font-size: 41px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-shadow: 0px 6px 4px rgba(0, 9, 30, 1);
    }
    .header-text {
      display: block;
      width: 1170px;
      height: 107px;
      margin: 0 auto;
    }
    .timer {
      position: absolute;
      right: 100px;
      top: 16px;
      font-size: 13px;
    }
  }
}
</style>
