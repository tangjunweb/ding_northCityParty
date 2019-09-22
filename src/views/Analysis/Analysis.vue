<template>
  <div>
    <Headers/>
    <div class="analysis">
      <div class="left">
        <!-- 汇总 -->
        <div class="box marginBottom">
          <p class="title-tip">汇总</p>
          <div class="humbings-count">
            <div class="lab-box" v-for="(item,index) in summary" :key="index">
              <p class="num">{{item.num}}</p>
              <p class="num-tips">{{item.title}}</p>
            </div>
          </div>
        </div>
        <!-- 达标率 -->
        <div class="box">
          <p class="title-tip">达标率</p>
          <div class="humbings-count boll-cxt">
            <div class="cot" v-for="(item,index) in complianceRate" :key="index">
              <div class="boll">
                <div class="water w1"></div>
                <div class="water w2"></div>
                <div class="water"></div>
              </div>
              <div class="text">
                <p class="numlv">{{item.num}}</p>
              </div>
              <p class="text-bot">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="map-wrapper">
          <!-- <div class="map-count">
                <div class="m-t">党员数量
                  <countTo class="nums-1" :startVal="0" :endVal="94132" :duration="3000" separator=","></countTo>人
                </div>
                <div class="m-t">党组织数量
                  <countTo class="nums-2" :startVal="0" :endVal="3848" :duration="3000" separator=","></countTo>个
                </div>
              </div> -->
          <div class="map"></div>
        </div>
        <div class="box boxcenter">
          <p class="title-tip">地点分布</p>
          <div class="race-top"></div>
        </div>
      </div>
      <div class="right">
        <!-- 党员统计 -->
        <div class="box box-sum marginBottom">
          <p class="title-tip">党员统计</p>
          <div class="humbings-count">
            <div class="cot" v-for="(item,index) in statisticsParty" :key="index">
              <div class="num-list">
                <span class="peo-bg"><img :src='item.src' /></span>
                <span class="peo-title">{{item.title}}</span>
                <span style="position:relative" v-for="(ntem,ndex) in item.num.split('')" :key="ndex">
                  <span class="num-style-bg"></span>
                  <span class="num-style">{{ntem}}</span>
                </span>
                <span class="peo-word">人</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 即将开展的十个主题 -->
        <div class="box box-zhuti">
          <p class="title-tip">即将开展的十个主题</p>
          <div class="humbings-count">
            <div class="cot-list" v-for="(item,index) in themelist" :key="index">
              <span :style="{background:item.color}" class="square"></span>
              <p class="title">{{item.title}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapData } from "@/mock/city.js";
import countTo from "vue-count-to";
import Headers from "@/components/Header";
import echarts from "echarts";
import { GetWinsdomAnalysisData, GetUnitPartyLatAndLngs } from "@/api/api";
export default {
  name: "analysis",
  data() {
    return {
      //汇总
      summary: [
        {
          num: 258,
          title: '全区固定党日'
        }, {
          num: 136,
          title: '党支部委员会'
        }, {
          num: 136,
          title: '党支部党员大会'
        }, {
          num: 136,
          title: '党课开展次数'
        }, {
          num: 136333,
          title: '累计参加人数'
        }
      ],
      //达标率
      complianceRate: [
        {
          num: '80.9%',
          title: '全区固定党日达标率'
        }, {
          num: '85.3%',
          title: '党支部委员会达标率'
        }, {
          num: '95.0%',
          title: '党支部党员大会达标率'
        }, {
          num: '88.6%',
          title: '党课开展次数达标率'
        }
      ],
      //党员统计
      statisticsParty: [
        {
          src: require("@/assets/peo1.png"),
          title: '党员数量',
          num: '67'
        }, {
          src: require("@/assets/peo2.png"),
          title: '预备党员数量',
          num: '231'
        }, {
          src: require("@/assets/peo3.png"),
          title: '积极分子人数',
          num: '570'
        }
      ],
      // sexs: [
      //   {
      //     SexCount: 0,
      //     Percentage: "0%",
      //     Sex: false
      //   },
      //   {
      //     SexCount: 0,
      //     Percentage: "0%",
      //     Sex: false
      //   }
      // ],
      // partyMemberLabel: [
      //   "其他",
      //   "1年以下",
      //   "1-5年",
      //   "5-10年",
      //   "10-15年",
      //   "15-20年",
      //   "20年以上"
      // ],
      // partyMemberTimeRanges: [],
      raceChart: "",
      //地区分布
      Nations: [
        {
          NationName: '兰州',
          NationCount: 23
        }, {
          NationName: '西宁',
          NationCount: 24
        }, {
          NationName: '白银',
          NationCount: 100
        }, {
          NationName: '定西',
          NationCount: 44
        }, {
          NationName: '平安',
          NationCount: 12
        }, {
          NationName: '其它',
          NationCount: 124
        }
      ],
      //十个主题
      themelist: [
        {
          color: '#EC8A48',
          title: "新时代加强和改进全省基层党建"
        },
        {
          color: '#D81977',
          title: "抓脱贫 促改革 强信念"
        },
        {
          color: '#C000FF',
          title: "主题党日活动 凝聚党员力量"
        },
        {
          color: '#19CBC9',
          title: "庆“十一”主题党日活动"
        },
        {
          color: '#0ED46B',
          title: "两学一做支部主题党日活动总结"
        },
        {
          color: '#E2D223',
          title: "“齐心协力、筑梦六一”主题党日活动"
        },
        {
          color: '#FF7800',
          title: "关于弘扬焦裕禄精神党日活动"
        },
        {
          color: '#FF0000',
          title: "2019建党98周年支部主题党日活动"
        },
        {
          color: '#D81977',
          title: "幼儿园开展主题党日活动"
        },
        {
          color: '#C000FF',
          title: "爱国主义教育党日活动"
        }
      ]
    };
  },
  components: {
    countTo,
    Headers
  },
  mounted() {
    this.raceEchartInit(this.Nations);
    //  this.init();
  },
  watch: {
    complianceRate: {
      handler(newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          if (oldValue[i] != newValue[i]) {
            console.log(newValue)
          }
        }
      }
    }
    // complianceRate.map((item, index) => {
    //   'item.num': {
    //     immediate: true,
    //       handler(val, oldval) {
    //       console.log(val + ',' + oldval)
    //       if (val) {
    //         this.isShow = true
    //       } else {
    //         this.isShow = false
    //       }
    //     }
    //   }
    // })
  },
  methods: {
    init() {
      GetWinsdomAnalysisData().then(res => {
        const response = res.Data;
        // this.sexs = response.Sexs;
        //  this.partyMemberTimeRanges = response.PartyMemberTimeRanges;
        this.raceEchartInit(response.Nations);
      });
      GetUnitPartyLatAndLngs().then(res => {
        const response = res.Data;
        this.mapInit(response);
      });
    },
    getPoint(response) {
      let arr = [];
      arr = response.map(e => {
        return [e.GroupAddressLng, e.GroupAddressLat];
      });
      return arr;
    },
    mapInit(response) {
      const that = this;
      this.getPoint(response);
      this.map = echarts.init(document.querySelector(".map"));
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
            name: "西宁市",
            type: "map",

            data: that.getPoint(response),
            symbolSize: 1,
            large: true,
            itemStyle: {
              normal: {
                shadowBlur: 2,
                shadowColor: "rgba(14, 241, 242, 0.8)",
                color: "rgba(14, 241, 242, 0.8)"
              }
            }
          }
        ]
      };
      this.map.setOption(option);
    },
    raceEchartInit(response) {
      let data = [];
      data = response.map(e => {
        return {
          name: e.NationName,
          value: e.NationCount
        };
      });
      this.raceChart = echarts.init(document.querySelector(".race-top"));
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: '4%',
          top: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: data.map(item => item.name),
            axisLine: {
              lineStyle: {
                color: '#439AFF',
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize: '14'
              }
            },
            axisTick: {
              show: false
            }
            // axisTick: {
            //   alignWithLabel: true
            // }
          }
        ],
        yAxis: [
          {
            type: 'value',
            data: ['20', '40', '60', '80'],
            axisLine: {
              lineStyle: {
                color: '#439AFF',
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#439AFF'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '60%',
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
                    color: "#28B1FF" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#5AE6F2" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            ],
            data: data
          }
        ]
      };
      this.raceChart.setOption(option);
    },

  }
};
</script>

<style lang="scss" scoped>
.analysis {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
   padding: 0px 60px;
  .box {
    width: 521px;
    height: 402px;
    padding: 27px 0px;
    background: rgba(12, 21, 48, 0.5);
    border: 1px solid rgba(67, 154, 255, 0.15);
    box-shadow: 0px 0px 40px 0px rgba(12, 21, 48, 0.3);
    border-radius: 8px;
    .title-tip {
      font-size: 20px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      position: relative;
      padding-left: 15px;
      margin-bottom: 21px;
      margin-left: 40px;
      &:before {
        content: '';
        position: absolute;
        top: 10px;
        left: 0;
        width: 8px;
        height: 8px;
        background: rgba(233, 60, 167, 1);
        border-radius: 50%;
      }
    }
  }
  .boxcenter {
    width: 719px;
    height: 314px;
  }
  .marginBottom {
    margin-bottom: 20px;
  }
  .left {
    width: 521px;
    .cot {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 50%;
      .text {
        text-align: center;
        margin-top: 40px;
        color: #FFFFFF;
        position: absolute;
        .numlv {
          font-size: 17px;
          font-family: DIN;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 11px;
        }
      }
      .text-bot {
        margin-top: 14px;
      }
    }
    .humbings-count {
      padding: 0 40px;
      flex: 1;
      height: 86%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row; // align-items: center;
      // justify-content: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .lab-box {
        width: 210px;
        height: 100px;
        background: rgba(67, 154, 255, 0);
        border: 1px solid rgba(67, 154, 255, 0.39);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .num {
          font-size: 40px;
          font-family: DIN;
          font-weight: bold;
          color: rgba(67, 154, 255, 1);
          background: linear-gradient(180deg, rgba(40, 177, 255, 1) 0%, rgba(90, 230, 242, 1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
        }
        .num-tips {
          font-size: 18px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          text-align: center;
        }
      }
      .boll {
        height: 90px;
        width: 90px;
        border-radius: 50%;
        border: 1px solid #284CB8;
        float: left;
        position: relative;
        font-size: 14px;
        overflow: hidden;
        .water {
          height: 50%;
          background: url('~@/assets/water.png') repeat-x;
          position: absolute;
          width: 100%;
          -webkit-animation: move_wave 4s linear infinite;
          animation: move_wave 4s linear infinite;
          bottom: 0;
        }

        .w1 {
          opacity: .5;
          background-position: 120px 0;
          -webkit-animation: move_wave 10s linear infinite;
          animation: move_wave 10s linear infinite;
        }

        .w2 {
          opacity: .3;
          background-position: 60px 0;
          -webkit-animation: move_wave 8s linear infinite;
          animation: move_wave 8s linear infinite;
        }
      }
      .bdr {
        border-right: 1px solid #fff;
      }
      .humbings-box {
        flex: 1;
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        .nums-box {
          width: 160px;
          flex-direction: column;
          display: flex;
          align-items: center;
          .nums-1 {
            font-size: 24px;
            color: #ffab79;
          }
          .nums-2 {
            font-size: 14px;
          }
        }
      }
    }
    .boll-cxt {
      justify-content: space-around;
    }
  }
  .center {
    width: 719px;
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
        height: 566px; // border-bottom: 1px solid #546acd;
      }
    }
    .race-top {
      //  padding: 20px 0;
      //  padding-right: 20px;
      box-sizing: border-box;
      height: 335px;
    }
  }
  .right {
    width: 521px;
    .box-sum {
      height: 268px;
    }
    .box-zhuti {
      height: 534px;
    }
    .cot {
      padding: 0px 40px;
      margin-bottom: 20px;
    }
    .title-tip {
      margin-bottom: 27px;
    }
    .num-list {
      position: relative;
      display: flex;
      flex-flow: row;
      align-items: center;
      .peo-bg {
        width: 40px;
        height: 40px;
      }
      .peo-title {
        font-size: 20px;
        font-weight: 400;
        padding-left: 10px;
        width: 170px;
        color: rgba(255, 255, 255, 1);
      }
      .num-style-bg {
        background: url('~@/assets/num.png') left top no-repeat;
        width: 33px;
        height: 49px;
        background-size: 100% 100%;
        position: absolute;
      }
      .num-style {
        font-size: 36px;
        font-family: DINPro;
        font-weight: bold;
        color: rgba(67, 154, 255, 1);
        text-shadow: 0px 0px 13px rgba(9, 15, 38, 0.52);
        background: linear-gradient(0deg, rgba(222, 249, 254, 1) 0%, rgba(73, 221, 248, 1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        width: 33px;
        height: 49px;
        margin-right: 5px;
        display: block;
        text-align: center;
      }
      .peo-word {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        position: absolute;
        right: 0;
      }
    }
    .cot-list {
      margin: 0px 40px;
      margin-bottom: 4px;
      background: #1F2D59;
      padding-left: 30px;
      display: flex;
      align-items: center;
      p.title {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 44px;
        padding-left: 10px;
      }
      .square {
        width: 10px;
        height: 10px;
        display: block;
      }
    }
  }
}

//动画
@-webkit-keyframes move_wave {
  0% {
    background-position: 0 0
  }
  to {
    background-position: 532px 0
  }
}

@keyframes move_wave {
  0% {
    background-position: 0 0
  }
  to {
    background-position: 532px 0
  }
}
</style>
