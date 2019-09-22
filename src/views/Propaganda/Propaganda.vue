<template>
  <div class="propaganda">
    <div class="left">
      <div class="left-title">
        <div class="title">用户最关注的新闻</div>
        <ul class="tab">
          <li @click="tabsHandle(1)" :class="['tab-item', index == 1 ? 'active': '']">当月新闻</li>
          <li @click="tabsHandle(2)" :class="['tab-item', index == 2 ? 'active': '']">历史新闻</li>
        </ul>
      </div>
      <div class="left-item" v-if="index < 8" v-for="(item, index) in newsList" :key="index">
        <h3 class="item-title">{{item.Title}}</h3>
        <div class="sub-title">
          <p>来源：{{item.Source}}</p>
          <span>{{item.Count}}</span>
        </div>
        <Progress :percent="(item.Count / (newsList[0].Count / 0.9)) * 100 || 0"></Progress>
      </div>
    </div>
    <div class="center">
      <div class="car"></div>
      <h3 class="hot-title">热门关注</h3>
      <canvas class="keyPop"></canvas>
    </div>
    <div class="right">
      <div class="comment"></div>
      <div class="keyword-wrapper">
        <div class="key-select">
          <div class="key-title" @click="visible=true">{{select}}</div>
          <div class="key-box" v-show="visible">
            <div
              class="key-item"
              @click="selectLabel(key)"
              v-for="(value, key) of keywordLabel"
              :key="key"
            >{{value}}</div>
          </div>
        </div>
        <div class="keyword"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from "@/components/Progress";
import echarts from "echarts";

import {
  GetNewsCommentRanking,
  GetNewsAndCourseCommentRanking,
  GetKeywordStatistics
} from "@/api/api";
export default {
  name: "propaganda",
  data() {
    return {
      online: 0,
      onlineHistory: 0,
      index: 1,
      newsParams: {
        isCurrentMonth: true
      },
      newsList: [],
      keywordList: [],
      keywordLabel: {
        Keyxsx: "新思想",
        Keyyylg: "一优两高",
        Keyggkf: "改革开放",
        Keylxyz: "两学一做",
        Keyzbgztl: "支部工作条例",
        Keyxszyglzy: "形式主义官僚主义",
        Keylgwh: "两个维护"
      },
      visible: false,
      select: "新思想"
    };
  },
  components: {
    Progress
  },
  mounted() {
    this.init();
  },
  watch: {
    index: {
      immediate: true,
      handler(n) {
        this.getNews();
      }
    }
  },
  methods: {
    init() {
      this.getOnline();
      this.keyPop();
      GetKeywordStatistics().then(res => {
        this.keywordList = this.formatToMonth(res.Data);
        this.initkeywordChart();
      });
      GetNewsAndCourseCommentRanking().then(res => {
        this.initCommentChart(res.Data);
      });
    },
    tabsHandle(n) {
      if (n == this.index) {
        return false;
      }
      this.newsParams.isCurrentMonth = n == 1 ? true : false;
      this.newsList = [];
      this.index = n;
    },
    //获取在线人数浏览量数据
    getOnline() {
      const that = this;
      const dom = document.querySelectorAll("#cnzz_stat_icon_1262122380 a");
      const interval = setInterval(() => {
        if (dom.length) {
          that.online = window.online =
            document
              .querySelectorAll("#cnzz_stat_icon_1262122380 a")[2]
              .innerHTML.replace(/[^0-9]/gi, "") || 0;
          that.onlineHistory =
            document
              .querySelectorAll("#cnzz_stat_icon_1262122380 a")[1]
              .innerHTML.split("<br>")[2]
              .replace("今日PV[", "")
              .replace("]", "") || 0;
          that.initCarChart();
          clearInterval(interval);
          console.log("finish");
        } else {
          console.log("获取中");
        }
      }, 200);
    },
    getNews() {
      GetNewsCommentRanking(this.newsParams).then(res => {
        this.newsList = res.Data;
      });
    },
    keyPop() {
      //获取tag标签
      let tag = [
        "深化改革",
        "昆仑英才",
        "绿色发展",
        "改革开放",
        "宜居西宁",
        "扫黑除恶",
        "支部条例",
        "榜样3"
      ];
      var canvas = document.querySelector("canvas.keyPop");
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.src = require("../../assets/circle.png");

      var WIDTH = 650;
      var HEIGHT = 340;

      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.fill();

      var config = {
        speedMin: -0.5,
        speedMax: 1,
        ballMin: 40,
        ballMax: 60,
        ballCount: tag.length
      };

      /**
       * function to generate random number
       *
       * @param max
       * @param min
       * @returns {*}
       */
      function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      /**
       * define Ball constructor
       *
       * @param x
       * @param y
       * @param velX
       * @param velY
       * @param color
       * @param size
       */
      function Ball(x, y, velX, velY, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.size = size;
      }

      /**
       * define Ball draw method
       */
      Ball.prototype.draw = function(i) {
        if (tag[i] == "") return false;
        ctx.beginPath();
        ctx.fillStyle = "#b1efff";
        ctx.drawImage(
          img,
          this.x - this.size,
          this.y - this.size,
          this.size * 2,
          this.size * 2
        );
        // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillText(tag[i], this.x, this.y, this.size * 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; //文本垂直方向，基线位置
        ctx.font = `${this.size * 2 / (tag[i].length + 2)}px Georgia`;
        ctx.fillStyle = "#1c1954";
      };

      /**
       * define Ball update method
       */
      Ball.prototype.update = function() {
        if (this.x + this.size >= WIDTH) {
          this.velX = -this.velX;
        }
        if (this.x - this.size <= 0) {
          this.velX = -this.velX;
        }

        if (this.y + this.size >= HEIGHT) {
          this.velY = -this.velY;
        }
        if (this.y - this.size <= 0) {
          this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
      };

      /**
       * define Ball collision detection
       */
      Ball.prototype.collisionDetect = function() {
        for (var j = 0; j < balls.length; j++) {
          var ball = balls[j];
          if (this !== ball) {
            // be care of this line, we can't compare one with itself
            var dxv = this.x + this.velX - (ball.x + ball.velX); //detect the next step which will updated
            var dyv = this.y + this.velY - (ball.y + ball.velY);
            var distance = Math.sqrt(dxv * dxv + dyv * dyv);

            if (distance <= this.size + ball.size) {
              // rebound the balls when collision
              var dvx = this.velX - ball.velX;
              var dvy = this.velY - ball.velY;
              var dx = this.x - ball.x; // but when update just use this step
              var dy = this.y - ball.y;
              var xx_yy = dx * dx + dy * dy;
              var v_dvx = (dvx * dx * dx + dvy * dx * dy) / xx_yy;
              var v_dvy = (dvy * dy * dy + dvx * dx * dy) / xx_yy;
              this.velX = checkSpeed(this.velX - v_dvx);
              this.velY = checkSpeed(this.velY - v_dvy);
              ball.velX = checkSpeed(ball.velX + v_dvx);
              ball.velY = checkSpeed(ball.velY + v_dvy);
            }
          }
        }
      };

      /**
       * validate the speed
       *
       * @param speed
       * @returns {*}
       */
      function checkSpeed(speed) {
        if (speed > config.speedMax) {
          speed = config.speedMax;
        } else if (speed < config.speedMin) {
          speed = config.speedMin;
        }
        return speed;
      }

      // define array to store balls
      var balls = [];

      /**
       * draw the balls loops
       */
      function loop() {
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        while (balls.length < config.ballCount) {
          var b_var = createBall();
          var ball = new Ball(
            b_var.x,
            b_var.y,
            random(config.speedMin, config.speedMax),
            random(config.speedMin, config.speedMax),
            b_var.r
          );
          balls.push(ball);
        }

        for (var i = 0; i < balls.length; i++) {
          balls[i].draw(i);
          balls[i].collisionDetect(); //detect before update
          balls[i].update();
        }

        // run again and again to realize the effect of the animation
        requestAnimationFrame(loop);
      }

      var createdBalls = [];

      /**
       * ensure the created ball will not collision
       *
       * @returns {{x: *, y: *, r: *}}
       */
      function createBall() {
        var x = random(0 + config.ballMax, WIDTH - config.ballMax);
        var y = random(0 + config.ballMax, HEIGHT - config.ballMax);
        var r = random(config.ballMin, config.ballMax);
        for (var i = 0; i < createdBalls.length; i++) {
          var dx = createdBalls[i].x - x;
          var dy = createdBalls[i].y - y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < createdBalls[i].r + r) {
            return createBall();
          }
        }
        var ball = {
          x: x,
          y: y,
          r: r
        };
        createdBalls.push(ball);
        return ball;
      }

      loop();
    },
    initCarChart() {
      this.carEchart = echarts.init(document.querySelector(".car"));
      var option = {
        series: [
          {
            type: "gauge",
            radius: "53%",
            center: ["380", "298"],

            splitNumber: 0, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 15,
                color: [
                  [
                    0.9,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#5c53de"
                      },
                      {
                        offset: 1,
                        color: "#18c8ff"
                      }
                    ])
                  ],
                  [1, "#413e54"]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, "66%"], // x, y，单位px
              textStyle: {
                color: "#fff",
                fontSize: 14
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "96%"],
              color: "#ffffff",
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 20
              }
            },
            data: [
              {
                name: "用户在线人数",
                value: this.online
              }
            ]
          },
          {
            name: "刻度",
            type: "gauge",
            radius: "65%",
            center: ["380", "298"],
            min: 0, //最小刻度
            max: 16, //最大刻度
            splitNumber: 8, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(0,0,0,0)"]]
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: "#4d5bd1",
              distance: 25,
              formatter: function(v) {
                switch (v + "") {
                  case "0":
                    return "0";
                  case "2":
                    return "2W";
                  case "4":
                    return "4W";
                  case "6":
                    return "6W";
                  case "8":
                    return "8W";
                  case "10":
                    return "10W";
                  case "12":
                    return "12W";
                  case "14":
                    return "14W";
                  case "16":
                    return "16W";
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 7,
              lineStyle: {
                // color: '#fff',
                width: 1
              },
              length: -8
            }, //刻度样式
            splitLine: {
              show: true,
              length: -20,
              lineStyle: {
                color: "#fff"
              }
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          {
            type: "gauge",
            radius: "53%",
            center: ["380", "298"],

            splitNumber: 0, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 15,
                color: [
                  [
                    0.9,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#5c53de"
                      },
                      {
                        offset: 1,
                        color: "#18c8ff"
                      }
                    ])
                  ],
                  [1, "#413e54"]
                ]
              }
            },
            //分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {
              show: false
            },
            title: {
              show: true,
              offsetCenter: [0, "-26%"], // x, y，单位px
              textStyle: {
                color: "#c6dffe",
                fontSize: 17
              }
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: true,
              offsetCenter: [0, "16%"],
              formatter: function(params) {
                return params;
              },
              textStyle: {
                fontSize: 40,
                fontFamily: "Tith",
                color: "#4ce7e9",
                letterSpacing: 2
              }
            },
            data: [
              {
                name: "今日网站访问次数",
                value: this.onlineHistory
              }
            ]
          }
        ]
      };
      this.carEchart.setOption(option);
    },
    initCommentChart(response) {
      let datas = [];
      response.forEach(e => {
        if (e.UnitName == "中共西宁市委非公经济组织和社会组织工作委员会") {
        } else {
          datas.push({
            name: e.UnitName.replace("西宁市", ""),
            NewsCommentCount: e.NewsCommentCount,
            CourseCommentCount: e.CourseCommentCount
          });
        }
      });
      let data = new Array();
      datas.map(e => {
        if (e.name.indexOf("大通县") >= 0) {
          data[9] = e;
        }
        if (e.name.indexOf("湟中县") >= 0) {
          data[8] = e;
        }
        if (e.name.indexOf("湟源县") >= 0) {
          data[7] = e;
        }
        if (e.name.indexOf("城东区") >= 0) {
          data[6] = e;
        }
        if (e.name.indexOf("城中区") >= 0) {
          data[5] = e;
        }
        if (e.name.indexOf("城西区") >= 0) {
          data[4] = e;
        }
        if (e.name.indexOf("城北区") >= 0) {
          data[3] = e;
        }
        if (e.name.indexOf("直属机关") >= 0) {
          e.name = "机关工委";
          data[2] = e;
        }
        if (e.name.indexOf("教育局") >= 0) {
          e.name = "教育工委";
          data[1] = e;
        }
        if (e.name.indexOf("经信委") >= 0) {
          e.name = "国资委";
          data[0] = e;
        }
      });
      this.commentChart = echarts.init(document.querySelector(".comment"));
      this.commentChart.setOption({
        title: {
          left: "20",
          text: "当月评论数量，心得数量",
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
          data: ["评论数", "心得数"],
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
          right: "6%",
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
            name: "评论数",
            type: "bar",
            barWidth: "10px",
            data: data.map(e => {
              return e.NewsCommentCount;
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
          },
          {
            name: "心得数",
            type: "bar",
            barWidth: "10px",
            data: data.map(e => {
              return e.CourseCommentCount;
            }),
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
                color: "#c6dffe"
              }
            }
          }
        ]
      });
    },
    initkeywordChart(key) {
      let index = key ? key : "Keyxsx";
      let data = this.keywordList[index];
      this.keywordChart = echarts.init(document.querySelector(".keyword"));
      this.keywordChart.setOption(
        {
          title: {
            text: "关键字月走势",
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
            right: "0",
            bottom: "5px",
            containLabel: true
          },
          xAxis: {
            type: "category",
            data: data.map((e, i) => {
              return i + 1 + "月";
            }),
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
              data: data,
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
                    return (params.data / 10000).toFixed(1) + "万";
                  }
                }
              }
            }
          ]
        },
        true
      );
    },
    selectLabel(key) {
      this.initkeywordChart(key);
      this.select = this.keywordLabel[key];
      this.visible = false;
    },
    formatToMonth(arr) {
      const ret = {};
      arr.map(e => {
        for (const key in e) {
          if (!ret[key]) ret[key] = [];
          ret[key].push(e[key]);
        }
      });
      return ret;
    }
  }
};
</script>

<style lang="scss" scoped>
.propaganda {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .left {
    padding: 20px;
    width: 480px;
    height: 870px;
    border: 1px solid #546acd;
    box-sizing: border-box;
    .left-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 18px;
      }
      .tab {
        list-style: none;
        display: flex;
        flex-direction: row;
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
    }
    .left-item {
      margin-bottom: 20px;
      .item-title {
        font-size: 16px;
        height: 23px;
        line-height: 23px;
        overflow: hidden;
        font-weight: 200;
        margin: 0;
      }
      .sub-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        p {
          font-size: 12px;
          line-height: 40px;
          font-weight: 100;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
  .center {
    width: 727px;
    background: url("../../assets/bg5.png") no-repeat center;
    background-size: cover;
    .car {
      height: 500px;
    }
    .keyPop {
      display: block;
      margin: 0 auto;
    }
    .hot-title {
      margin: 0 0 20px;
      padding: 0 40px;
    }
  }
  .right {
    width: 480px;
    .comment {
      height: 510px;
      border: 1px solid #546acd;
      box-sizing: border-box;
      margin-bottom: 20px;
      padding: 20px 0;
    }
    .keyword-wrapper {
      padding: 20px;
      height: 340px;
      border: 1px solid #546acd;
      box-sizing: border-box;
      position: relative;
      .key-select {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 999;
        .key-title {
          height: 40px;
          padding: 0 20px;
          line-height: 40px;
          background: #5d6ac3;
          cursor: pointer;
        }
        .key-box {
          background: #1a1650;
          border: 1px solid #546acd;
          border-top: 0;
          box-sizing: border-box;
          .key-item {
            line-height: 25px;
            cursor: pointer;
            text-align: center;
            &:hover {
              background: #5d6ac3;
              color: #fff;
            }
          }
        }
      }
    }
    .keyword {
      height: 300px;
    }
  }
}
</style>
