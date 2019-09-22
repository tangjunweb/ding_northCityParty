<template>
  <div class="manage">
    <div class="left">
      <div class="top">
        <div class="title">
          <h3>单位积分走势图</h3>
          <div class="input-group">
            <Search @change="getSearchHandle"/>
          </div>
        </div>
        <div class="count-boxs">
          <count-box2
            :num="unit.CurrentMonthScore"
            :backgroundShow="true"
            :showLeftNum="false"
            :left-num="parseFloat(unit.UserActiveRate || 0)"
            title="当月积分"
          >
            <img src="../../assets/jifen.png" alt>
          </count-box2>
          <count-box2
            :num="unit.UserActiveSum"
            :backgroundShow="true"
            :showLeftNum="false"
            :left-num="parseFloat(unit.UserActiveRate || 0)"
            title="当月学习人数"
          >
            <img src="../../assets/renshu-.png" alt>
          </count-box2>
        </div>
      </div>
      <div class="center"></div>
      <div class="bottom">
        <div class="bottom-left-wrapper">
          <div class="tabs">
            <a
              @click="tabsStudyHandle(1)"
              :class="['tab-item', studyIndex == 1 ? 'active': '']"
            >参学人数</a>
            <a @click="tabsStudyHandle(2)" :class="['tab-item', studyIndex == 2 ? 'active': '']">参学率</a>
          </div>
          <div class="bottom-left"></div>
        </div>
        <div class="bottom-right" id="chart-2"></div>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div class="title">单位积分排行(TOP5)</div>
        <div class="tabs">
          <a @click="tabsHandle(1)" :class="['tab-item', index == 1 ? 'active': '']">当月排行</a>
          <a @click="tabsHandle(2)" :class="['tab-item', index == 2 ? 'active': '']">历史排行</a>
        </div>
        <div class="tab-content">
          <div class="item" v-for="(item, index) in rankData" :key="index">
            <span class="item-index">{{index + 1}}</span>
            <div class="item-inner">
              <div class="item-title">
                <span class="item-text">{{item.UnitName}}</span>
                <span class="item-nums">{{item.AvgScore}}</span>
              </div>
              <Progress :percent="item.AvgScore / (rankData[0].AvgScore / 0.9) * 100"></Progress>
            </div>
          </div>
        </div>
      </div>
      <div class="right-bottom"></div>
    </div>
  </div>
</template>

<script>
import CountBox2 from "@/components/CountBox2";
import echarts from "echarts";
import Progress from "@/components/Progress";
import Search from "@/components/InputSearch";
import {
  GetUnitIntegralChart,
  GetCurrentMonthUserActive,
  GetUnitScoreRanking,
  GetKeywordCrawling,
  GetPointScore,
  GetUnitLearningScoreAndVideoTime
} from "@/api/api";
export default {
  name: "manage",
  data() {
    return {
      index: 1,
      studyIndex: 1,
      studyChartData: "",
      params: {
        TopNum: 5,
        UnitName: "西宁市大通县"
      },
      rankParams: {
        isHistory: false
      },
      rankData: [],
      unit: {
        CurrentMonthScore: 0,
        ScoreRate: 0,
        UserActiveRate: 0,
        UserActiveSum: 0
      }
    };
  },
  components: {
    CountBox2,
    Progress,
    Search
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      GetCurrentMonthUserActive().then(res => {
        this.studyChartData = res.Data;
        this.initStudyChart();
      });
      GetUnitLearningScoreAndVideoTime().then(res => {
        this.initChart2(res.Data);
      });
      GetPointScore().then(res => {
        this.scoreEchartInit(res.Data);
      });
      this.getRankData();
    },
    tabsHandle(n) {
      if (n == this.index) {
        return false;
      }
      this.rankParams.isHistory = n == 2 ? true : false;
      this.index = n;
      this.getRankData();
    },
    tabsStudyHandle(n) {
      if (n == this.studyIndex) {
        return false;
      }
      this.studyIndex = n;
      this.initStudyChart(n);
    },
    getSearchHandle(n) {
      let params = {
        unitGuid: n.UnitGuid
      };
      GetUnitIntegralChart(params).then(res => {
        if (res.Flag == 1) {
          this.unit = res.Data;
          this.initLineChart(res.Data.UnitScores);
        } else {
          const failData = {
            CurrentMonthScore: 0,
            ScoreRate: "0%",
            UserActiveSum: 0,
            UserActiveRate: "0%",
            UnitScores: [
              {
                YearMonth: "2018.05",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
              {
                YearMonth: "2018.05",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
              {
                YearMonth: "2018.06",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
              {
                YearMonth: "2018.07",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
              {
                YearMonth: "2018.08",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
              {
                YearMonth: "2018.09",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
              {
                YearMonth: "2018.10",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
              
              {
                YearMonth: "2018.11",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
              {
                YearMonth: "2018.12",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
              {
                YearMonth: "2019.01",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },{
                YearMonth: "2019.02",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },{
                YearMonth: "2019.03",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },{
                YearMonth: "2019.04",
                VideoTime: 0,
                AnswerScoreFromCurrentMonth: 0,
                PublishtipsTimes: 0,
                CommentTimes: 0
              },
            ]
          };
          this.unit = failData;
          this.initLineChart(failData.UnitScores);
        }
      });
    },
    getRankData() {
      GetUnitScoreRanking(this.rankParams).then(res => {
        this.rankData = res.Data;
      });
    },
    initLineChart(response) {
      this.lineChart = echarts.init(document.querySelector(".center"));
      var option = {
        tooltip: {
          trigger: "axis"
        },
        color: ["#4de0e8", "#bc1280", "#0bde15", "#eb270d"],
        legend: {
          textStyle: {
            color: "#c6dffe",
            fontSize: 11
          },
          selected: {
            观看视频时长: false,
            发表心得次数: false,
            评论得分: false
          },
          data: ["观看视频时长", "当月答题得分", "发表心得次数", "评论得分"]
        },
        grid: {
          left: "0",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c6dffe"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#546acd"
            }
          },
          axisTick: {
            show: false
          },
          data: response.map(e => {
            return e.YearMonth;
          })
        },
        yAxis: {
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
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#546acd"
            }
          }
        },
        series: [
          {
            name: "观看视频时长",
            type: "line",
            data: response.map(e => {
              return e.VideoTime;
            }),
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#4de0e8"
                }
              }
            }
          },
          {
            name: "当月答题得分",
            type: "line",
            data: response.map(e => {
              return e.AnswerScoreFromCurrentMonth;
            }),
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#bc1280"
                }
              }
            }
          },
          {
            name: "发表心得次数",
            type: "line",
            data: response.map(e => {
              return e.PublishtipsTimes;
            }),
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#0bde15"
                }
              }
            }
          },
          {
            name: "评论得分",
            type: "line",
            data: response.map(e => {
              return e.CommentTimes;
            }),
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#eb270d"
                }
              }
            }
          }
        ]
      };
      this.lineChart.setOption(option, true);
    },
    initChart2(response) {
      let data = new Array();
      response.map(e => {
        if (e.UnitName.indexOf("大通县") >= 0) {
          data[0] = e;
        }
        if (e.UnitName.indexOf("湟中县") >= 0) {
          data[1] = e;
        }
        if (e.UnitName.indexOf("湟源县") >= 0) {
          data[2] = e;
        }
        if (e.UnitName.indexOf("城东区") >= 0) {
          data[3] = e;
        }
        if (e.UnitName.indexOf("城中区") >= 0) {
          data[4] = e;
        }
        if (e.UnitName.indexOf("城西区") >= 0) {
          data[5] = e;
        }
        if (e.UnitName.indexOf("城北区") >= 0) {
          data[6] = e;
        }
        if (e.UnitName.indexOf("直属机关") >= 0) {
          e.UnitName = "机关工委";
          data[7] = e;
        }
        if (e.UnitName.indexOf("教育局") >= 0) {
          e.UnitName = "教育工委";
          data[8] = e;
        }
        if (e.UnitName.indexOf("经信委") >= 0) {
          e.UnitName = "国资委";
          data[9] = e;
        }
      });
      this.chart2 = echarts.init(document.querySelector("#chart-2"));
      this.chart2.setOption({
        title: {
          text: "区县及工委学习积分对比",
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
          right: "5px",
          bottom: "5px",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: data.map(e => {
            return e.UnitName.replace("西宁市", "");
          }),
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c6dffe"
            },
            formatter: function(value) {
              var ret = ""; //拼接加\n返回的类目项
              var maxLength = 3; //每项显示文字个数
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
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#546acd"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c6dffe"
            },
            formatter: function(params) {
              return params / 100000000 + "亿";
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "#546acd"
            }
          }
        },
        series: [
          {
            data: data.map(e => {
              return e.TotalScore;
            }),
            type: "bar",
            barWidth: "15px",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#44b1f0"
                  },
                  {
                    offset: 1,
                    color: "#4ac9cf"
                  }
                ])
              }
            },
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#c6dffe",
                formatter: function(params) {
                  return (params.value / 10000).toFixed(1) + "万";
                }
              }
            }
          }
        ]
      });
    },
    initStudyChart(type) {
      let datas = [];
      let index = type || 1;
      this.studyChartData.forEach(e => {
        if (
          e.UnitName == "八中队" ||
          e.UnitName == "国有企业" ||
          e.UnitName == "中共西宁市委非公经济组织和社会组织工作委员会"
        ) {
        } else {
          datas.push({
            name: e.UnitName.replace("西宁市", ""),
            value: e.UserActiveSum,
            persent: e.UserActiveRate
          });
        }
      });
      let data = new Array();
      datas.map(e => {
        if (e.name.indexOf("大通县") >= 0) {
          data[0] = e;
        }
        if (e.name.indexOf("湟中县") >= 0) {
          data[1] = e;
        }
        if (e.name.indexOf("湟源县") >= 0) {
          data[2] = e;
        }
        if (e.name.indexOf("城东区") >= 0) {
          data[3] = e;
        }
        if (e.name.indexOf("城中区") >= 0) {
          data[4] = e;
        }
        if (e.name.indexOf("城西区") >= 0) {
          data[5] = e;
        }
        if (e.name.indexOf("城北区") >= 0) {
          data[6] = e;
        }
        if (e.name.indexOf("直属机关") >= 0) {
          e.name = "机关工委";
          data[7] = e;
        }
        if (e.name.indexOf("教育局") >= 0) {
          e.name = "教育工委";
          data[8] = e;
        }
        if (e.name.indexOf("经信委") >= 0) {
          e.name = "国资委";
          data[9] = e;
        }
      });
      this.studyChart = echarts.init(document.querySelector(".bottom-left"));
      var option = {};
      if (index == 1) {
        option = {
          title: {
            text: "各县区参学人数和参学率",
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
            right: "5px",
            bottom: "5px",
            containLabel: true
          },
          xAxis: {
            type: "category",
            data: data.map(e => {
              return e.name;
            }),
            axisLabel: {
              show: true,
              textStyle: {
                color: "#c6dffe"
              },
              interval: 0,
              // rotate:40,
              formatter: function(value) {
                var ret = ""; //拼接加\n返回的类目项
                var maxLength = 3; //每项显示文字个数
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
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#546acd"
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#c6dffe"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#546acd"
              }
            }
          },
          series: [
            {
              name: "参学人数",
              data: data.map(e => {
                return e.value;
              }),
              type: "bar",
              barWidth: "15px",
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#44b1f0"
                    },
                    {
                      offset: 1,
                      color: "#4ac9cf"
                    }
                  ])
                }
              },
              label: {
                normal: {
                  show: true,
                  position: "top",
                  color: "#c6dffe"
                }
              }
            }
          ]
        };
      } else {
        option = {
          title: {
            text: "各县区参学人数和参学率",
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
            right: "5px",
            bottom: "5px",
            containLabel: true
          },
          xAxis: {
            type: "category",
            data: data.map(e => {
              return e.name;
            }),
            axisLabel: {
              show: true,
              textStyle: {
                color: "#c6dffe"
              },
              interval: 0,
              // rotate:40,
              formatter: function(value) {
                var ret = ""; //拼接加\n返回的类目项
                var maxLength = 3; //每项显示文字个数
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
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#546acd"
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
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
              },
              formatter: function(params) {
                return params + "%";
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#546acd"
              }
            }
          },
          series: [
            {
              name: "参学率",
              type: "line",
              color: "#f1a718",
              stack: "总量",
              data: data.map(e => {
                return e.persent.replace("%", "");
              })
            }
          ]
        };
      }
      this.studyChart.setOption(option, true);
    },
    scoreEchartInit(response) {
      this.scoreChart = echarts.init(document.querySelector(".right-bottom"));
      const label = {
        AnswerScoreFromCurrentMonth: "当月答题得分",
        CommentTimes: "发表评论",
        PublishtipsTimes: "发表心得次数",
        ThumbTimes: "点赞次数",
        videoTime: "视频观看分钟数"
      };
      let data = [];
      for (const key in response) {
        data.push({
          name: label[key],
          value: response[key]
        });
      }
      const option = {
        title: {
          text: "积分项得分分析",
          textStyle: {
            color: "#c6dffe",
            fontSize: "18"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          align: "left",
          x: "right",
          y: "center",
          bottom: 50,
          right: 30,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          data: data.map(e => {
            return e.name;
          }),
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
            center: ["40%", "50%"],
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
                lineStyle: {
                  color: "#83f8ff"
                }
              }
            },
            data: data
          }
        ]
      };
      this.scoreChart.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.manage {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .left {
    width: 1165px;
    height: 866px;
    .top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .title {
        letter-spacing: 1px;
        h3 {
          font-size: 30px;
          line-height: 1;
          font-weight: 400;
          margin: 0 0 40px;
          color: #4ac9cf;
        }
        .sub-title {
          font-size: 17px;
          font-weight: 200;
          span {
            color: #fd9e61;
          }
        }
      }
      .count-boxs {
        display: flex;
        flex-direction: row;
        & > div {
          margin-left: 15px;
        }
      }
    }
    .center {
      height: 295px;
      padding: 20px;
      border: 1px solid #546acd;
      margin-bottom: 20px;
    }
    .bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .bottom-left-wrapper {
        position: relative;
        .tabs {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 243px;
          margin: 0 auto 25px;
          position: absolute;
          right: 20px;
          top: 20px;
          z-index: 999;
          .tab-item {
            width: 100px;
            height: 34px;
            text-align: center;
            line-height: 34px;
            box-sizing: border-box;
            font-size: 14px;
            color: #546acd;
            border: 1px solid #546acd;
            cursor: pointer;
            transition: all 0.5s;
          }
          .active {
            border: 1px solid transparent;
            color: #c6dffe;
            background: #5d6ac3;
          }
        }
      }
      .bottom-left {
        width: 565px;
        height: 350px;
        padding: 20px 20px 0;
        box-sizing: border-box;
        border: 1px solid #546acd;
      }
      .bottom-right {
        width: 564px;
        height: 350px;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #546acd;
      }
    }
  }
  .right {
    width: 562px;
    .right-top {
      border: 1px solid #546acd;
      height: 497px;
      padding: 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      .title {
        font-size: 18px;
        margin: 0 0 30px;
      }
      .tabs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 243px;
        margin: 0 auto 25px;
        .tab-item {
          width: 100px;
          height: 34px;
          text-align: center;
          line-height: 34px;
          box-sizing: border-box;
          font-size: 14px;
          color: #546acd;
          border: 1px solid #546acd;
          cursor: pointer;
          transition: all 0.5s;
        }
        .active {
          border: 1px solid transparent;
          color: #c6dffe;
          background: #5d6ac3;
        }
      }
      .tab-content {
        .item {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 30px;
          .item-index {
            width: 30px;
            height: 30px;
            display: block;
            line-height: 30px;
            text-align: center;
            border-radius: 50%;
            margin-right: 20px;
            font-weight: bold;
            font-weight: 14px;
          }
          .item-inner {
            flex: 1;
            .item-title {
              font-size: 17px;
              line-height: 1;
              margin-bottom: 10px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }
          }
        }
      }
    }
    .right-bottom {
      height: 350px;
      box-sizing: border-box;
      padding: 20px;
      border: 1px solid #546acd;
    }
  }
}
</style>
<style lang="scss">
.tab-content {
  .item {
    .item-index {
      background: #4ccdd5;
    }
    .left {
      background: #4ccdd5 !important;
    }
    &:nth-child(1) {
      .item-index {
        background: #ff0000;
      }
      .left {
        background: #ff0000 !important;
      }
    }
    &:nth-child(2) {
      .item-index {
        background: #ee8825;
      }
      .left {
        background: #ee8825 !important;
      }
    }
    &:nth-child(3) {
      .item-index {
        background: #a925ee;
      }
      .left {
        background: #a925ee !important;
      }
    }
  }
}
</style>

