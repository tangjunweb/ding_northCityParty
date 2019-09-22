<template>
  <div class="server">
    <div class="left">
      <tag-box :height="170" title="培训类型">
        <div class="education-chart"></div>
      </tag-box>
      <tag-box :height="310" title="参训人员年龄分布">
        <div class="people-chart"></div>
      </tag-box>
      <tag-box :height="350" title="参训人员民族分布">
        <div class="national-chart"></div>
      </tag-box>
    </div>
    <div class="center">
      <div class="map-wrapper">
        <div class="map-count">
          <div class="m-t">组织调训开展次数
            <countTo
              class="nums-1"
              :startVal="0"
              :endVal="organizationTrainCount"
              :duration="3000"
              separator=","
            ></countTo>次
          </div>
          <div class="m-t">参与培训人数
            <countTo
              class="nums-2"
              :startVal="0"
              :endVal="organizationTrainUserCount"
              :duration="3000"
              separator=","
            ></countTo>人
          </div>
        </div>
        <div class="map"></div>
      </div>
      <div class="gav-chart"></div>
    </div>
    <div class="right">
      <tag-box :height="170" :position="true" title="问卷调查">
        <div class="wrapper-box">
          <count-box2 :num="questionUserCount" :showLeftNum="false" title="参与人数">
            <img src="../../assets/wenjuantiaocha-xuanzhong.png" alt>
          </count-box2>
        </div>
      </tag-box>
      <tag-box :height="680" :position="true" title="墨香书苑">
        <div class="book-box">
          <count-box2 :num="61094" :backgroundShow="true" left-num="-6.5" title="页面浏览量">
            <img src="../../assets/shuju.png" alt>
          </count-box2>
          <count-box2 :num="59150" :backgroundShow="true" left-num="-6.3" title="阅读页面数">
            <img src="../../assets/yuedu.png" alt>
          </count-box2>
          <count-box2 :num="3502" :backgroundShow="true" left-num="-7.7" title="分享次数">
            <img src="../../assets/time_icon_share.png" alt>
          </count-box2>
          <count-box2 :num="48894" :backgroundShow="true" left-num="3.3" title="访问人次">
            <img src="../../assets/fangwenlujing.png" alt>
          </count-box2>
        </div>
      </tag-box>
    </div>
  </div>
</template>

<script>
import { mapData } from "@/mock/city.js";
import TagBox from "@/components/TagBox";
import CountBox2 from "@/components/CountBox2";
import countTo from "vue-count-to";
import echarts from "echarts";
import { GetSmartServiceData } from "@/api/api";
export default {
  name: "server",
  components: {
    TagBox,
    CountBox2,
    countTo
  },
  data() {
    return {
      questionUserCount: 0,
      organizationTrainCount: 0,
      organizationTrainUserCount: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      GetSmartServiceData().then(res => {
        const response = res.Data;
        this.questionUserCount = response.QuestionUserCount;
        this.organizationTrainUserCount = response.OrganizationTrainUserCount;
        this.organizationTrainCount = response.OrganizationTrainCount;
        this.mapInit(response.AreaUsers);
        this.eduEchartInit(response.TrainTypes);
        this.peopleEchartInit(response.AgeRanges);
        this.initNationalChar(response.Nations);
        this.initGavChart(response.ProfessionLevels);
      });
    },
    converData(data, geoCoordMap) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name.slice(3),
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    },
    mapInit(response) {
      const that = this;
      this.map = echarts.init(document.querySelector(".map"));
      var geoCoordMap = {
        西宁市城北区: [101.7526892214, 36.6964427372],
        西宁市城东区: [101.8597482168, 36.5855775416],
        西宁市城西区: [101.6822654013, 36.6345433714],
        西宁市城中区: [101.7025216642, 36.5328365621],
        西宁市大通县: [101.5020057563, 37.1026349658],
        西宁市湟源县: [101.1628615742, 36.5886023118],
        西宁市湟中县: [101.4082145489, 36.5005670552]
      };
      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;
      var data = [];
      data = response.map(e => {
        return {
          name: e.UnitName,
          value: e.UserCount
        };
      });
      echarts.registerMap("xining", mapData);
      var option = {
        geo: {
          top: 50,
          bottom: 20,
          map: "xining",
          itemStyle: {
            // 定义样式
            normal: {
              // 普通状态下的样式
              areaColor: "#1b1751",
              borderColor: "#546acd",
              borderWidth: 2,
              shadowColor: "rgba(0, 0, 0, 1)",
              shadowBlur: 15,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            },
            emphasis: {
              // 高亮状态下的样式
              areaColor: "#546acd",
              shadowColor: "rgba(0, 0, 0, 1)",
              shadowBlur: 15,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            }
          },
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          }
        },
        series: [
          {
            name: "地图",
            type: "map",
            //控制共享使用同一个geo组件
            geoIndex: 0
            //默认为0
            //zlevel: 0
          },
          {
            name: "西宁市",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: that.converData(
              data.sort(function(a, b) {
                return b.value - a.value;
              }),
              geoCoordMap
            ),
            symbolSize: function(val) {
              return 10 + val[2] / 10;
            },
            //配置何时显示特效'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
            showEffectOn: "render",
            //目前只有ripple这一种
            effectType: "ripple",
            //涟漪特效相关配置。
            rippleEffect: {
              //动画的时间
              period: 3,
              //动画中波纹的最大缩放比例
              scale: 7.5,
              //波纹的绘制方式可选 'stroke' 和 'fill'
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#05C3F9",
                shadowBlur: 10,
                shadowColor: "#05C3F9"
              }
            },
            zlevel: 1
          },

          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin",
            symbolSize: function(val) {
              var a = (maxSize4Pin - minSize4Pin) / (max - min);
              var b = minSize4Pin - a * min;
              b = maxSize4Pin - a * max;
              return a * val[2] + b;
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 9
                },
                formatter: function(params) {
                  return params.data.value[2];
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#F62157" //标志颜色
              }
            },
            zlevel: 6,
            data: that.converData(data, geoCoordMap)
          }
        ]
      };
      this.map.setOption(option);
    },
    eduEchartInit(response) {
      let data = [];
      data = response.map(e => {
        return {
          name: e.TrainTypeName,
          value: e.TypeCount,
          persent: e.Percentage
        };
      });
      var serios = []
      serios = data.map((e , index) => {
        return {
          name: e.name,
          type: "pie",
          clockwise: false,
          hoverAnimation: false,
          center: ["20%", "40%"],
          radius: radius,
          x: "20%", // for funnel
          itemStyle: labelFromatter,
          data: [
            {
              value: 100 - e.persent.slice(0, -1),
              itemStyle: labelBottom,
              label: { show: false, position: "inside" }
            },
            {
              name: e.name,
              persent: e.persent,
              value: data[0].persent.slice(0, -1),
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#f74037" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#fd9f5e" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            }
          ]
        }
      })
      this.eDuEchart = echarts.init(document.querySelector(".education-chart"));
      var labelFromatter = {
        normal: {
          label: {
            formatter: function(params) {
              return params.data.persent;
            },
            textStyle: {
              color: "#fff"
            },
            position: "center"
          }
        }
      };
      var labelBottom = {
        normal: {
          color: "#3a3693"
        },
        emphasis: {
          color: "#3a3693"
        }
      };
      var radius = [25, 40];
      var option = {
        legend: [
          {
            data: data,
            top: "80%",
            x: "5",
            itemWidth: 0,
            padding: [0, 20, 0, 10],
            itemHeight: 0,
            itemGap: 45,
            selectedMode: false,
            textStyle: {
              color: "#fff",
              fontSize: 14
            }
          }
        ],
        series: [
          {
            name: data[0].name,
            type: "pie",
            clockwise: false,
            hoverAnimation: false,
            center: ["12.5%", "40%"],
            radius: radius,
            x: "20%", // for funnel
            itemStyle: labelFromatter,
            data: [
              {
                value: 100 - data[0].persent.slice(0, -1),
                itemStyle: labelBottom,
                label: { show: false, position: "inside" }
              },
              {
                name: data[0].name,
                persent: data[0].persent,
                value: data[0].persent.slice(0, -1),
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#f74037" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#fd9f5e" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              }
            ]
          },
          {
            name: data[1].name,
            type: "pie",
            clockwise: false,
            hoverAnimation: false,
            center: ["37.5%", "40%"],
            radius: radius,
            x: "20%", // for funnel
            itemStyle: labelFromatter,
            data: [
              {
                value: 100 - data[1].persent.slice(0, -1),
                itemStyle: labelBottom,
                label: { show: false, position: "inside" }
              },
              {
                name: data[1].name,
                persent: data[1].persent,
                value: data[1].persent.slice(0, -1),
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#8337f7" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#7ac6fd" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              }
            ]
          },
          {
            name: data[2].name,
            type: "pie",
            clockwise: false,
            hoverAnimation: false,
            center: ["62.5%", "40%"],
            radius: radius,
            x: "40%", // for funnel
            itemStyle: labelFromatter,
            data: [
              {
                value: 100 - data[2].persent.slice(0, -1),
                itemStyle: labelBottom,
                label: { show: false, position: "inside" }
              },
              {
                name: data[2].name,
                persent: data[2].persent,
                value: data[2].persent.slice(0, -1),
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#55b055" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#bed55f" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              
            ],
          },
          {
            name: data[3].name,
            type: "pie",
            clockwise: false,
            hoverAnimation: false,
            center: ["87.5%", "40%"],
            radius: radius,
            x: "20%", // for funnel
            itemStyle: labelFromatter,
            data: [
              {
                value: 100 - data[3].persent.slice(0, -1),
                itemStyle: labelBottom,
                label: { show: false, position: "inside" }
              },
              {
                name: data[3].name,
                persent: data[3].persent,
                value: data[3].persent.slice(0, -1),
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#bc1381" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#7ac6fd" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              }
            ]
          },
          
        ]
      };
      this.eDuEchart.setOption(option);
    },
    peopleEchartInit(response) {
      this.peopleChart = echarts.init(document.querySelector(".people-chart"));
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          align: "left",
          x: "center",
          width: 350,
          bottom: 10,
          right: 30,
          padding: 10,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          data: ["25岁以下", "25-30岁", "30-40岁", "40-50岁", "50岁以上"],
          textStyle: {
            color: "#c6dffe",
            fontSize: 11
          }
        },
        series: [
          {
            type: "pie",
            radius: ["10%", "55%"],
            roseType: "radius",
            center: ["50%", "40%"],
            avoidLabelOverlap: false,
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
                    color: "#9365ef" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#1745d0" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#460da7" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#f0152d" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#e98d48" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#faf063" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#3991ea" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#3cc7cd" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#ee4335" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ea8e27" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            ],
            label: {
              normal: {
                show: true,
                position: "outside",
                formatter: "{d}%",
                textStyle: {
                  color: "#fff",
                  fontWeight: "100"
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                smooth: false,
                length: 10,
                length2: 20
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { value: response[1].AgeRangeCount, name: "25岁以下" },
              { value: response[2].AgeRangeCount, name: "25-30岁" },
              { value: response[3].AgeRangeCount, name: "30-40岁" },
              { value: response[4].AgeRangeCount, name: "40-50岁" },
              { value: response[5].AgeRangeCount, name: "50岁以上" }
            ]
          }
        ]
      };
      this.peopleChart.setOption(option);
    },
    initNationalChar(response) {
      this.nationalChart = echarts.init(
        document.querySelector(".national-chart")
      );
      let data = [];
      for (var i = response.length; i--; i > 0) {
        data.push({
          name: response[i].NationName,
          value: response[i].NationCount,
          persent: response[i].Percentage
        });
      }
      this.nationalChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "15%",
          right: "10%",
          top: "20",
          bottom: "10",
          containLabel: false
        },
        xAxis: {
          formatter: "{persent} %",
          type: "value",
          show: false,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          axisLine: {
            show: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c6dffe"
            }
          },
          data: data.map(e => {
            return e.name;
          })
        },
        series: [
          {
            name: "党员",
            type: "bar",
            barWidth: "20px",
            data: data,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#2667da"
                  },
                  {
                    offset: 1,
                    color: "#25e2f5"
                  }
                ])
              }
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#c6dffe",
                formatter: function(params) {
                  return params.data.persent;
                }
              }
            }
          }
        ]
      });
    },
    initGavChart(response) {
      this.gavChart = echarts.init(document.querySelector(".gav-chart"));
      let data = [];
      data = response.map(e => {
        return {
          name: e.ProfessionLevelName,
          value: e.ProfessionLevelCount,
          persent: e.Percentage
        };
      });
      this.gavChart.setOption({
        title: {
          text: "参训人员行政职务分布",
          textStyle: {
            color: "#c6dffe",
            fontSize: "18"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function(params) {
            return params[0].name + ": " + params[0].value + "人";
          }
        },
        grid: {
          left: "0",
          right: "0",
          top: "20%",
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          data: data.map(e => {
            return e.name;
          }),
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: "#25e3f5",
              fontSize: 12,
              lineHeight: 56
            },
            interval: 0,
            // rotate:40,
            formatter: function(value) {
              var ret = ""; //拼接加\n返回的类目项
              var maxLength = 5; //每项显示文字个数
              var valLength = value.length; //X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              if (rowN > 1) {
                //如果类目项的文字大于3,
                for (var i = 0; i < rowN; i++) {
                  var temp = ""; //每次截取的字符串
                  var start = i * maxLength; //开始截取的位置
                  var end = start + maxLength; //结束截取的位置
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + "\n";
                  ret += temp; //凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            }
          }
        },
        yAxis: {
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        color: ["#e54035"],
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            pictorialBar: "100",
            barCategoryGap: "30%",
            // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              normal: {
                opacity: 1,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#5d2dd5"
                  },
                  {
                    offset: 0.5,
                    color: "#25e3f5"
                  },
                  {
                    offset: 1,
                    color: "#25e3f5"
                  }
                ])
              },
              emphasis: {
                opacity: 1
              }
            },
            data: data,
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#c6dffe",
                formatter: function(params) {
                  return params.data.persent;
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.server {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .left {
    width: 480px;
    .education-chart,
    .national-chart,
    .people-chart {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
    }
  }
  .center {
    width: 728px;
    position: relative;
    .map-wrapper {
      .map-count {
        height: 42px;
        width: 100%;
        padding: 0 70px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        position: absolute;
        z-index: 999;
        left: 0;
        top: 0;
        font-size: 16px;
        justify-content: space-between;
        line-height: 1;
        letter-spacing: 2px;
        .m-t {
          display: flex;
          flex-direction: row;
          height: 42px;
          line-height: 1;
          align-items: flex-end;
        }
        .nums-1 {
          font-size: 40px;
          font-family: "Tith";
          color: #fe4242;
          letter-spacing: 4px;
          font-weight: 300;
          line-height: 20px;
          padding: 0 3px;
        }
        .nums-2 {
          font-size: 40px;
          font-family: "Tith";
          color: #ffa530;
          letter-spacing: 4px;
          font-weight: 300;
          line-height: 20px;
          padding: 0 3px;
        }
      }
      .map {
        position: relative;
        height: 522px;
        border-bottom: 1px solid #546acd;
      }
    }
    .gav-chart {
      height: 346px;
      border: 1px solid #546acd;
      padding: 10px 20px;
      box-sizing: border-box;
    }
  }
  .right {
    width: 480px;
    .wrapper-box {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .book-box {
      padding-top: 20px;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
