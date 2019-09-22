<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    className: {
      type: String,
      default: "echart"
    },
    id: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "500px"
    },
    height: {
      type: String,
      default: "500px"
    },
    option: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption(this.option);
    }
  }
};
</script>