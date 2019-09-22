<template>
  <div class="pie" ref="pie" style="width:100%;height:100%"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    pieData: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    },
    color: {
      type: Array,
      default: () => ["#FB5741", "#4EE3C3", "#FFDA18"]
    }
  },
  data() {
    return {
      raceChart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.raceChart = echarts.init(this.$refs.pie);
      this.setOptions();
    });
  },
  methods: {
    setOptions() {
      let _this = this;
      let optionDefault = {
        tooltip: {
          trigger: "item",
          formatter: "{b}:{d}%"
        },
        calculable: true,
        series: [
          {
            type: "pie",
            center: ["50%", "53%"],
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{abg|}\n{hr|}\n  {b|{b}} \n {per|{d}%}  ",
                rich: {
                  b: {
                    color: "#B8EAFF",
                    lineHeight: 22,
                    align: "center",
                    fontSize: 14
                  },
                  //   hr: {
                  //     width: "100%",
                  //     borderWidth: 0.5,
                  //     height: 0
                  //   },
                  per: {
                    color: "#fff",
                    fontSize: 14,
                    padding: [2, 4]
                    // borderRadius: 2
                  }
                }
              }
            },
            labelLine: {
              lineStyle: {
                color: "#5494D1"
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  let index = params.dataIndex % _this.color.length;
                  return _this.color[index];
                }
              }
            },
            data: this.pieData
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