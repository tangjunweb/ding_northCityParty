<template>
  <div class="bar" ref="bar" style="width:100%;height:100%"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    renderData:{
        type: Array,
        default: () => []
    },
    gridBg: {
        type: String,
        default: '#0C0C3C'
    },
    xLineColor: {
        type: String,
        default: 'rgba(255,255,255,0.12)'
        
    },
    xLabelColor: {
        type:String,
        default: '#D1F5F8'
    },
    xLabelSize: {
        type:Number,
        default: 12
    },
    barWidth: {
        type:Number,
        default: 10
    },
    options: {
      type: Object,
      default: ()=> {}
    },
    color: {
      type: Array,
      default: () => ['#00C0FF','#2A4CD8','#22E1B4']
    }
  },
  data() {
    return {
      raceChart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
        this.raceChart = echarts.init(this.$refs.bar);
        this.setOptions();
    })
  },
  methods: {
    setOptions() {
    let _this = this
      let optionDefault = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          show: true,
          left: "3%",
          right: "3%",
          top: "5%",
          bottom: 0,
          containLabel: true,
          borderColor: "transparent",
          backgroundColor: this.gridBg
        },
        xAxis: [
          {
            type: "category",
            data: this.renderData.map(item => item.name),
            axisLine: {
              lineStyle: {
                color: this.xLineColor
              }
            },
            axisLabel: {
              textStyle: {
                color: this.xLabelColor,
                fontSize: this.xLabelSize
              },
              rotate: 30
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
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
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: this.barWidth,
            data: this.renderData,
              color: [
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FB5741" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#FFDA18" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            ],
            // itemStyle: {
            //   normal: {
            //     color: function(params) {
            //       let index = params.dataIndex % _this.color.length;
            //       return _this.color[index];
            //     }
            //   }
            // }
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