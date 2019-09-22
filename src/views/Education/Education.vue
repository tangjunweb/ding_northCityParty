<template>
  <div class="education">
    <div class="education-left">
      <CountBox
        title="移动端在线人数"
        color="#ee6f46"
        separator=","
        :count="online.CurrentDay.OnlineNumber"
        :right-num="onlinePersent.OnlineNumber"
      >
        <img src="../../assets/yidongduan.png" alt>
      </CountBox>
      <CountBox
        title="平均在线时长(分钟)"
        color="#2eb6e7"
        separator="."
        :count="online.CurrentDay.AverageUseTime / 60"
        :right-num="onlinePersent.AverageUseTime"
      >
        <img src="../../assets/pingjunshisu.png" alt>
      </CountBox>
      <div class="user-score-chart" id="user-score-chart"></div>
    </div>
    <div class="education-center">
      <div class="map-wrapper">
        <div class="map-title">观看视频的学习时长
          <span class="tit-num" v-for="(item, i) in times" :key="i">{{item}}</span> 小时
        </div>
        <div class="map-title2">人均观看时长
          <span>{{avageTime}}</span> 小时
        </div>
        <div class="map"></div>
      </div>
      <div id="chart-2" class="bottom-right"></div>
    </div>
    <div class="education-right">
      <CountBox
        title="当月答题均分"
        color="#fd9d61"
        separator=","
        :count="answer.AnswerScoreFromCurrentMonth"
        :right-num="answer.AnswerScoreFromCurrentMonthRate"
      >
        <img src="../../assets/pingjunfen.png" alt>
      </CountBox>
      <CountBox
        title="参与答题总人数"
        color="#ba65ff"
        separator="."
        :count="answer.UserAnswerSum"
        :right-num="answer.UserAnswerSumRate"
      >
        <img src="../../assets/renshu.png" alt>
      </CountBox>
      <div class="chart-3">
        <ul class="tab">
          <li @click="tabsHandle(1)" :class="['tab-item', tabIndex == 1 ? 'active': '']">浏览量</li>
          <li @click="tabsHandle(2)" :class="['tab-item', tabIndex == 2 ? 'active': '']">学习时长</li>
        </ul>
        <div id="chart-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapData } from "@/mock/city.js";
import CountBox from "@/components/CountBox";
import echarts from "echarts";
import {
  GetUserLearningScore,
  GetUnitLearningScoreAndVideoTime,
  GetCurrentMonthAnswerScoreAndNum,
  GetCourseViewCountAndPeriod,
  GetJiguangStatistics,
  GetKeywordCrawling
} from "@/api/api";
export default {
  name: "education",
  components: {
    CountBox
  },
  data() {
    return {
      tabIndex: 1,
      userScore: "",
      answer: {
        AnswerScoreFromCurrentMonth: 0,
        AnswerScoreFromCurrentMonthRate: "0",
        UserAnswerSum: 0,
        UserAnswerSumRate: "0"
      },
      course: [],
      studyTime: 0,
      avageTime: 0,
      online: {
        CurrentDay: {
          OnlineNumber: 0,
          AverageUseTime: 0
        }
      },
      onlinePersent: {
        OnlineNumber: "0",
        AverageUseTime: "0"
      }
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    times() {
      return parseInt(this.studyTime)
        .toString()
        .split("");
    },
  },
  watch: {
    online: {
      deep: true,
      handler(n) {
        this.onlinePersent.OnlineNumber =
          (
            (n.Month.OnlineNumber - n.LastMonth.OnlineNumber) /
            n.LastMonth.OnlineNumber
          ).toFixed(3) + "%";
        this.onlinePersent.AverageUseTime =
          (
            (n.Month.AverageUseTime - n.LastMonth.AverageUseTime) /
            n.LastMonth.AverageUseTime
          ).toFixed(3) + "%";
      }
    }
  },
  methods: {
    init() {
      GetUserLearningScore().then(res => {
        this.userScore = res.Data;
        this.initUserScoreChar();
      });
      GetUnitLearningScoreAndVideoTime().then(res => {
        this.mapInit(res.Data);
      });
      GetKeywordCrawling().then(res => {
        this.initKeywordChart(res.Data[0]);
      });
      GetCurrentMonthAnswerScoreAndNum().then(res => {
        this.answer = res.Data;
      });
      GetCourseViewCountAndPeriod().then(res => {
        this.course = res.Data;
        this.initChart3();
      });
      GetJiguangStatistics().then(res => {
        this.online = res.Data;
      });
    },
    formatOnlineScore(obj) {
      return arr;
    },
    initUserScoreChar() {
      let lenged = [];
      let sVip = [];
      let vip = [];
      this.userScore.forEach(e => {
        if (e.PoliticalName == "党员") {
          lenged.push(e.YearMonth);
          sVip.push(e.TotalScore);
        } else {
          vip.push(e.TotalScore);
        }
      });
      this.userScoreChart = echarts.init(
        document.querySelector("#user-score-chart")
      );
      this.userScoreChart.setOption({
        title: {
          left: "20",
          text: "用户学习积分对比",
          textStyle: {
            color: "#c6dffe",
            fontSize: "18"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["党员", "非党员"],
          x: "right",
          itemWidth: 10,
          itemHeight: 10,
          padding: [5, 20],
          itemGap: 20,
          textStyle: {
            color: "#c6dffe",
            fontSize: 11
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0",
          containLabel: true
        },
        xAxis: {
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
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c6dffe"
            }
          },
          data: lenged
        },
        series: [
          {
            name: "党员",
            type: "bar",
            barWidth: "10px",
            data: sVip,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#4ccdd5"
                  },
                  {
                    offset: 1,
                    color: "#44b1f0"
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
                  return (params.data / 10000000).toFixed(2) + "亿";
                }
              }
            }
          },
          {
            name: "非党员",
            type: "bar",
            barWidth: "10px",
            data: vip,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#b34cd5"
                  },
                  {
                    offset: 1,
                    color: "#bc107d"
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
                  return (params.data / 10000000).toFixed(2) + "亿";
                }
              }
            }
          }
        ]
      });
    },
    initKeywordChart(response) {
      this.keywordChart = echarts.init(document.querySelector(".bottom-right"));
      const label = {
        Keyxsx: "新思想",
        Keyyylg: "一优两高",
        Keyggkf: "改革开放",
        Keylxyz: "两学一做",
        Keyzbgztl: "支部工作条例",
        Keyxszyglzy: "形式主义官僚主义",
        Keylgwh: "两个维护"
      };
      let data = [];
      for (const key in response) {
        data.push({
          name: label[key],
          value: response[key]
        });
      }
      data = data.sort(function(b, a) {
        return b.value - a.value;
      });
      this.keywordChart.setOption({
        title: {
          text: "关键字抓取结果",
          textStyle: {
            color: "#c6dffe",
            fontSize: "18"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "0",
          right: "15%",
          bottom: "0",
          containLabel: true
        },
        xAxis: {
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
            show: false
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
            name: "关键字次数",
            type: "bar",
            barWidth: "10px",
            data: data.map(e => {
              return e.value;
            }),
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#4ccdd5"
                  },
                  {
                    offset: 1,
                    color: "#44b1f0"
                  }
                ])
              }
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#c6dffe"
              }
            }
          }
        ]
      });
    },
    initChart3() {
      this.chart3 = echarts.init(document.querySelector("#chart-3"));
      var option = {};
      var data = [];
      var lenged = {};
      if (this.tabIndex == 1) {
        data = this.course.map(e => {
          if (!lenged[e.CourseClassName]) {
            lenged[e.CourseClassName] = e.TotalPeriodRate;
          }
          return {
            name: e.CourseClassName,
            value: e.TotalPeriod,
            persent: e.TotalPeriodRate
          };
        });
        option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          grid: {
            left: "0",
            right: "0",
            bottom: "5px",
            containLabel: true
          },
          title: {
            text: "用户关注的课程类型占比",
            textStyle: {
              color: "#c6dffe",
              fontSize: "18"
            }
          },
          color: [
            "#16d0ff",
            "#72d324",
            "#a824d3",
            "#d34d24",
            "#d3a824",
            "#24d3d1",
            "#2477d3",
            "#3924d3",
            "#f065f2",
            "#e60012",
            "#4bc074",
            "#6d4ec4"
          ],
          legend: [
            {
              x: "center",
              align: "left",
              bottom: "0px",
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 20,
              data: data,
              formatter: function(params) {
                return "{value| " + params + " : " + lenged[params] + "}";
              },
              textStyle: {
                color: "#c6dffe",
                fontSize: 11,
                rich: {
                  value: {
                    width: 100
                  }
                }
              }
            }
          ],
          series: [
            {
              name: "浏览量",
              type: "pie",
              radius: ["40%", "55%"],
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              barWidth: "10px",
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data
            }
          ]
        };
      } else {
        data = this.course.map(e => {
          if (!lenged[e.CourseClassName]) {
            lenged[e.CourseClassName] = e.ViewCountRate;
          }
          return {
            name: e.CourseClassName,
            value: e.ViewCount
          };
        });
        option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color: [
            "#16d0ff",
            "#72d324",
            "#a824d3",
            "#d34d24",
            "#d3a824",
            "#24d3d1",
            "#2477d3",
            "#3924d3",
            "#f065f2",
            "#e60012",
            "#4bc074",
            "#6d4ec4"
          ],
          grid: {
            left: "0",
            right: "0",
            bottom: "5px",
            containLabel: true
          },
          title: {
            text: "用户关注的课程类型占比",
            textStyle: {
              color: "#c6dffe",
              fontSize: "18"
            }
          },
          legend: [
            {
              x: "center",
              align: "left",
              bottom: "0px",
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 20,
              data: data,
              formatter: function(params) {
                return "{value| " + params + " : " + lenged[params] + "}";
              },
              textStyle: {
                color: "#c6dffe",
                fontSize: 11,
                rich: {
                  value: {
                    width: 100
                  }
                }
              }
            }
          ],
          series: [
            {
              name: "学习时长",
              type: "pie",
              radius: ["40%", "55%"],
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              barWidth: "10px",
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data
            }
          ]
        };
      }
      this.chart3.setOption(option, true);
    },
    converData(data, geoCoordMap) {
      var res = [];
      this.studyTime = 0;
      this.avageTime = 0;
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          this.studyTime += data[i].value;
          this.avageTime += data[i].avage;
          res.push({
            name: data[i].name.replace("西宁市", ""),
            value: geoCoord.concat(data[i].value).concat(data[i].avage)
          });
        }
      }
      this.avageTime = (this.avageTime / data.length).toFixed(2);
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
      this.studyTime = 0;
      data = response.map(e => {
        return {
          name: e.UnitName,
          value: e.VideoTime,
          avage: e.AvgVideoTime
        };
      });
      echarts.registerMap("xining", mapData);
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function(params, ticket, callback) {
            console.log(params)
            return params.name + '<br/>总时长:' + (params.data.value[2] / 10000000).toFixed(2) + '千万小时<br/>人均时长:' + params.data.value[3] + '小时';
          }
        },
        geo: {
          top: 100,
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
              return 10 + val[2] / 100000000;
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
              var num = val[3] / 10000;
              return num * 10 + 60;
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 9
                },
                formatter: function(params) {
                  return parseInt(params.data.value[3]) + "小时";
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
    tabsHandle(n) {
      if (n == this.tabIndex) {
        return false;
      }
      this.tabIndex = n;
      console.log(this.tabIndex);
      this.initChart3();
    }
  }
};
</script>

<style lang="scss">
.education {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .user-score-chart {
    width: 480px;
    height: 566px;
    border: 1px solid #546acd;
    padding: 20px 0;
    box-sizing: border-box;
  }
  .education-center {
    width: 727px;
    .map-wrapper {
      position: relative;
      .map-title {
        position: absolute;
        z-index: 99;
        width: 100%;
        left: 0;
        top: 0;
        text-align: center;
        line-height: 46px;
        font-size: 16px;
        color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        letter-spacing: 2px;
        justify-content: center;
        .tit-num {
          margin: 0 5px;
          display: block;
          width: 30px;
          height: 45px;
          font-size: 24px;
          font-weight: bold;
          color: #fff;
          background: url("../../assets/num-bg.png") no-repeat center;
        }
      }
      .map-title2 {
        position: absolute;
        z-index: 99;
        width: 100%;
        left: 0;
        top: 50px;
        text-align: center;
        line-height: 46px;
        font-size: 16px;
        color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        letter-spacing: 2px;
        justify-content: center;
        .tit-num {
          display: block;
          height: 45px;
          font-size: 24px;
          font-weight: bold;
          color: #fff;
        }
      }
      .map {
        height: 520px;
      }
    }

    #chart-2 {
      padding: 20px;
      box-sizing: border-box;
      height: 353px;
      border: 1px solid #546acd;
    }
  }
  .education-right {
    width: 480px;
    .chart-3 {
      height: 565px;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      border: 1px solid #546acd;
      .tab {
        width: 260px;
        position: absolute;
        z-index: 99;
        list-style: none;
        display: flex;
        left: 100px;
        top: 70px;
        flex-direction: row;
        justify-content: space-between;
        padding: 0;
        li {
          width: 105px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          border: 1px solid #546acd;
          color: #546acd;
          cursor: pointer;
          margin-left: 5px;
        }
        .active {
          background: #5d6ac3;
          border-color: #5d6ac3;
          color: #fff;
        }
      }
      #chart-3 {
        box-sizing: border-box;
        height: 515px;
      }
    }
  }
}
</style>
