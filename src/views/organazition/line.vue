<template>
  <div class="line" ref="line" style="width:100%;height:100%"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    renderlineData1: {
      type: Array,
      default: () => []
    },
    renderlineData2: {
      type: Array,
      default: () => []
    },
    gridBg: {
      type: String,
      default: "#0C0C3C"
    },
    xLineColor: {
      type: String,
      default: "rgba(255,255,255,0.12)"
    },
    xLabelColor: {
      type: String,
      default: "#D1F5F8"
    },
    xLabelSize: {
      type: Number,
      default: 12
    },
    // barWidth: {
    //     type: Number,
    //     default: 10
    // },
    options: {
      type: Object,
      default: () => {}
    }
    // color: {
    //     type: Array,
    //     default: () => ['#00C0FF', '#2A4CD8', '#22E1B4']
    // }
  },
  data() {
    return {
      raceChart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.raceChart = echarts.init(this.$refs.line);
      this.setOptions();
    });
  },
  methods: {
    setOptions() {
      let _this = this;
      let optionDefault = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          show: true,
          left: "7%",
          right: "8%",
          top: "8%",
          bottom: -5,
          containLabel: true,
          borderColor: "transparent"
          //  backgroundColor: this.gridBg
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 20,
          top: 0,
          bottom: 20,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 6,
          borderRadius: 50,
          data: ["党支部委员会", "党小组会"],
          textStyle: {
            color: "#D1F5F8",
            fontSize: 12
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.renderlineData1.map(item => item.name),
          axisLine: {
            lineStyle: {
              color: "transparent"
            }
          },
          axisLabel: {
            textStyle: {
              color: this.xLabelColor,
              fontSize: this.xLabelSize
            },
            rotate: 30
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "transparent"
            }
          },
          axisLabel: {
            textStyle: {
              color: this.xLabelColor,
              fontSize: this.xLabelSize
            }
          },
          splitLine: {
            lineStyle: {
              color: "transparent"
            }
          }
        },
        series: [
          {
            name: "党支部委员会",
            type: "line",
            data: this.renderlineData1,
            color: "#F6A520"
          },
          {
            name: "党小组会",
            type: "line",
            data: this.renderlineData2,
            color: "#E3071D",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#E3071D" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "transparent" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      };
      let realOption = Object.assign(optionDefault, this.options);
      this.raceChart.setOption(realOption);
    }
  }
};
</script>
<style lang="">
</style>