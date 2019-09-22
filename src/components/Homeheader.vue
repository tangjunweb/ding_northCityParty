<template>
  <div class="header">
    <div class="header-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      interval: '',
      times: ''
    }
  },
  mounted() {
    this.interval = setInterval(this.timer, 1000)
  },
  methods: {
    timer() {
      const date1 = new Date();
      // const year = date1.getFullYear();
      // const month = date1.getMonth();
      // const day = date1.getDate();
      const hh = date1.getHours() > 9 ? date1.getHours() : '0' + date1.getHours();
      const mm = date1.getMinutes() > 9 ? date1.getMinutes() : '0' + date1.getMinutes();
      const ss = date1.getSeconds() > 9 ? date1.getSeconds() : '0' + date1.getSeconds();
      //  this.times = year + "年" + `${(parseInt(month) + 1)}` + "月" + day + "日   " + hh + ":" + mm + ":" + ss;
      this.times = hh + ":" + mm + ":" + ss;
    }
  },
  destroyed() {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 100px;
  position:absolute;
  width: 100%;
  margin: 0 auto;
  top: 0;
    z-index: 3;
  // background: #111623;
  .header-wrapper {
   // width: 100%; // background: url("../assets/head-bg.png") no-repeat center;
    // background-size: 100% 100%;
   // position: absolute;
   // left: 0;
   // top: 0;
    //  height: 123px;
   // overflow: hidden;
  }
}
</style>