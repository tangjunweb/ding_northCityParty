<template>
  <div class="main">
    <Homeheader>
      <img class="header-title" src="@/assets/organazie-title.png" alt />
    </Homeheader>
    <div class="analysis">
      <div class="left">
        <!-- 汇总 -->
        <div class="box">
          <div class="humbings-count">
            <div class="lab-box" v-for="(item,index) in summary" :key="index">
              <p class="num-tips">{{item.title}}</p>
              <p class="num">{{item.num}}</p>
              <p class="num-tips-1">{{item.tips}}</p>
            </div>
          </div>
        </div>
        <!-- 上传党组织的TOP10 -->
        <div class="box marginBottom" style="height:278px;">
          <div class="humbings-count boll-cxt">
            <div class="upload-title">上传党组织的TOP10</div>
            <div class="upload-organazie">
              <echartBar :renderData="uploadorganazie"></echartBar>
            </div>
          </div>
        </div>
        <!-- 被采纳意见党组织TOP10 -->
        <div class="box marginBottom" style="height:291px;">
          <div class="humbings-count boll-cxt">
            <div class="upload-title">被采纳意见党组织TOP10</div>
            <div class="upload-organazie">
              <echartBar :renderData="adoptorganazie"></echartBar>
            </div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="map-wrapper">
          <div class="map"></div>
        </div>
        <!-- 组织生活达标情况 -->
        <div class="box boll-cxt" style="height:291px;position:relative">
          <div class="upload-title">组织生活达标情况</div>
          <div class="tab">
            <span @click="tabchange" :class="istrue?'actived':''">按月</span>
            <span @click="tabchangeone" :class="!istrue?'actived':''">按季度</span>
          </div>
          <div class="upload-organazie" style="height:245px;">
            <echartLine :renderlineData1="standard1" :renderlineData2="standard2"></echartLine>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 各类型组织生活开展占比 -->
        <div class="box boll-cxt marginBottom" style="height:254px;">
          <div class="upload-title">各类型组织生活开展占比</div>
          <div class="people-chart"></div>
        </div>
        <!-- 组织生活开展次数统计 -->
        <div class="box boll-cxt marginBottom" style="height:278px;">
          <div class="upload-title">组织生活开展次数统计</div>
          <div
            class="allsummary"
            v-for="(item,index) in partyMemberTimeRanges"
            :key="'label-'+index"
          >
            <span>{{item.title}}</span>
            <el-progress :percentage="item.percentage" :color="item.customColor"></el-progress>
          </div>
        </div>
        <!-- 全区党组织达标率TOP10 -->
        <div class="box marginBottom" style="height:291px;">
          <div class="humbings-count boll-cxt">
            <div class="upload-title">全区党组织达标率TOP10</div>
            <div class="upload-organazie">
              <echartBar :color="alldistrictorganazie_Color" :renderData="alldistrictorganazie"></echartBar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Goback />
  </div>
</template>

<script>
import echartBar from "./bar";
import echartLine from "./line";
import { mapData } from "@/mock/city.js";
import countTo from "vue-count-to";
import Homeheader from "@/components/Homeheader";
import Goback from "@/components/goback";
import echarts from "echarts";
import { GetWinsdomAnalysisData, GetUnitPartyLatAndLngs } from "@/api/api";
const names = [
  {
    NationName: "党支部名称",
    NationCount: 23
  },
  {
    NationName: "党支部名称",
    NationCount: 23
  },
  {
    NationName: "党支部名称",
    NationCount: 23
  },
  {
    NationName: "党支部名称",
    NationCount: 23
  },
  {
    NationName: "党支部名称",
    NationCount: 23
  },
  {
    NationName: "党支部名称",
    NationCount: 23
  },
  {
    NationName: "党支部名称",
    NationCount: 23
  }
];
const dabiaodata = {
  data1: [
    {
      NationName: "党支部名称",
      NationCount: 12
    },
    {
      NationName: "党支部名称",
      NationCount: 10
    },
    {
      NationName: "党支部名称",
      NationCount: 9
    },
    {
      NationName: "党支部名称",
      NationCount: 12
    },
    {
      NationName: "党支部名称",
      NationCount: 10
    },
    {
      NationName: "党支部名称",
      NationCount: 9
    }
  ],
  data2: [
    {
      NationName: "党支部名称",
      NationCount: 3
    },
    {
      NationName: "党支部名称",
      NationCount: 4
    },
    {
      NationName: "党支部名称",
      NationCount: 7
    },
    {
      NationName: "党支部名称",
      NationCount: 3
    },
    {
      NationName: "党支部名称",
      NationCount: 4
    },
    {
      NationName: "党支部名称",
      NationCount: 7
    }
  ]
};

export default {
  name: "analysis",
  data() {
    return {
      //汇总
      uploadorganazie: [],
      adoptorganazie: [],
      alldistrictorganazie: [],
      alldistrictorganazie_Color: [
        "#F0821F",
        "#CBA049",
        "#EFA024",
        "#C09E52",
        "#6493AA",
        "#2590E7",
        "#259AED",
        "#2FABE4",
        "#3FC9D2",
        "#48D8C9"
      ],

      summary: [
        {
          num: 46,
          title: "本年度待开展总数",
          tips: "已开展53次"
        },
        {
          num: 79,
          title: "本年度参与党组织数",
          tips: "党员数121人"
        },
        {
          num: 28,
          title: "本月待开展总数",
          tips: "已开展53次"
        },
        {
          num: 30,
          title: "本月参与党组织数",
          tips: "党员数405人"
        }
      ],
      partyMemberTimeRanges: [
        { title: "党支部党员大会", percentage: 20, customColor: "#E3071D" },
        { title: "党支部委员会", percentage: 30, customColor: "#F4A420" },
        { title: "固定党日", percentage: 60, customColor: "#2091F3" },
        { title: "党课", percentage: 50, customColor: "#4EE3C3" }
      ],
      //十个主题
      themelist: [
        {
          color: "#EC8A48",
          title: "新时代加强和改进全省基层党建"
        },
        {
          color: "#D81977",
          title: "抓脱贫 促改革 强信念"
        },
        {
          color: "#C000FF",
          title: "主题党日活动 凝聚党员力量"
        },
        {
          color: "#19CBC9",
          title: "庆“十一”主题党日活动"
        },
        {
          color: "#0ED46B",
          title: "两学一做支部主题党日活动总结"
        },
        {
          color: "#E2D223",
          title: "“齐心协力、筑梦六一”主题党日活动"
        },
        {
          color: "#FF7800",
          title: "关于弘扬焦裕禄精神党日活动"
        },
        {
          color: "#FF0000",
          title: "2019建党98周年支部主题党日活动"
        },
        {
          color: "#D81977",
          title: "幼儿园开展主题党日活动"
        },
        {
          color: "#C000FF",
          title: "爱国主义教育党日活动"
        }
      ],
      AgeRanges: [
        { AgeRange: 0, AgeRangeCount: 20, Percentage: "20%" },
        { AgeRange: 20, AgeRangeCount: 30, Percentage: "30%" },
        { AgeRange: 30, AgeRangeCount: 40, Percentage: "40%" },
        { AgeRange: 40, AgeRangeCount: 10, Percentage: "10%" }
      ],
      //折线数据
      standard1: [],
      standard2: [],
      istrue: true, //默认按月
      opp: {}
    };
  },
  components: {
    countTo,
    Homeheader,
    echartBar,
    echartLine,
    Goback
  },
  mounted() {
    let renderData = names.map(e => {
      return {
        name: e.NationName,
        value: e.NationCount
      };
    });
    this.uploadorganazie = renderData;
    this.adoptorganazie = renderData;
    this.alldistrictorganazie = renderData;

    let renderlineData1 = dabiaodata.data1.map(e => {
      return {
        name: e.NationName,
        value: e.NationCount
      };
    });
    let renderlineData2 = dabiaodata.data2.map(e => {
      return {
        name: e.NationName,
        value: e.NationCount
      };
    });
    this.standard1 = renderlineData1;
    this.standard2 = renderlineData2;

    this.peopleEchartInit(this.AgeRanges);

    this.opp = {
      color: ["#F0821F", "#6493AA", "#2590E7", "#259AED", "#2FABE4", "#3FC9D2"],
      calculable: true,
      xAxis: [
        {
          type: "category",
          axisTick: { show: false },
          data: ["2012", "2013", "2014", "2015", "2016"]
        }
      ],
      series: [
        {
          name: "Forest",
          type: "bar",
          barGap: 0,
          barWidth: 15,
          data: [320, 332, 301, 334, 390]
        },
        {
          name: "Steppe",
          type: "bar",
          barWidth: 15,
          data: [220, 182, 191, 234, 290]
        },
        {
          name: "Desert",
          type: "bar",
          barWidth: 15,
          data: [150, 232, 201, 154, 190]
        },
        {
          name: "Wetland",
          type: "bar",
          barWidth: 15,
          data: [98, 77, 101, 99, 40]
        }
      ]
    };

    //  this.init();
  },
  watch: {
    complianceRate: {
      handler(newValue, oldValue) {
        for (let i = 0; i < newValue.length; i++) {
          if (oldValue[i] != newValue[i]) {
            console.log(newValue);
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
        //  this.partyMemberTimeRanges = response.PartyMemberTimeRanges;

        this.uploadorganazieEchartInit(response.names);
        this.peopleEchartInit(response.AgeRanges);
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
      this.map.setOption({
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
      });
    },
    //各类型组织生活开展占比
    peopleEchartInit(response) {
      this.peopleChart = echarts.init(document.querySelector(".people-chart"));
      this.peopleChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 20,
          top: 20,
          bottom: 20,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          borderRadius: 50,
          data: ["党支部党员大会", "党支部委员会", "固定党日", "党课"],
          textStyle: {
            color: "#C3EEF2",
            fontSize: 14
          }
        },
        series: [
          {
            type: "pie",
            radius: ["10%", "55%"],
            roseType: "radius",
            center: ["50%", "40%"],
            avoidLabelOverlap: false,
            color: ["#E3071D", "#F6A520", "#2091F3", "#4EE3C3"],
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
              { value: response[0].AgeRangeCount, name: "党支部党员大会" },
              { value: response[1].AgeRangeCount, name: "党支部委员会" },
              { value: response[2].AgeRangeCount, name: "固定党日" },
              { value: response[3].AgeRangeCount, name: "党课" }
            ]
          }
        ]
      });
    },
    tabchange() {
      this.istrue = true;
    },
    tabchangeone() {
      this.istrue = false;
    }
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
    width: 580px;
  }
  .marginBottom {
    margin-bottom: 28px;
  }
  .left {
    width: 580px;
    .humbings-count {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      .lab-box {
        width: 269px;
        height: 127px;
        background: url("~@/assets/lab-box-bg.png") left top no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        .num {
          font-size: 40px;
          font-family: DIN;
          font-weight: 500;
          color: #ffffff;
          text-align: center;
          line-height: 61px;
        }
        .num-tips {
          font-size: 20px;
          font-weight: 400;
          color: rgba(184, 234, 255, 1);
          margin-bottom: 8px;
        }
        .num-tips-1 {
          font-size: 14px;
          color: #d6eaff;
          opacity: 0.5;
          margin-bottom: -6px;
        }
      }
    }
  }
  .upload-organazie {
    width: 100%;
    height: 225px;
  } //  .upload-organazie1 {
  //     width: 100%;
  //     height: 225px;
  // }
  .upload-title {
    color: #77f1fc;
    font-size: 20px;
    text-align: left;
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
     background: url("~@/assets/title-box-bg.png") left top no-repeat;
    background-size: 100% 100%;
  }
  .tab {
    position: absolute;
    right: 10px;
    top: 10px;
    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(119, 241, 252, 1);
      opacity: 0.5;
      width: 65px;
      display: inline-block;
      text-align: center; // &:active {
      //     opacity: 1;
      //     background: url('~@/assets/title-bg1.png')center center;
      //     background-size: 100% 100%;
      // }
      &:hover {
        opacity: 1;
      }
    }
    .actived {
      opacity: 1;
      background: url("~@/assets/title-bg1.png") center center;
      background-size: 100% 100%;
    }
  }
  .boll-cxt {
   border: 1px solid #092256;
    height: 278px;
  }
  .center {
    width: 580px;
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
        height: 587px;
      }
    }
  }
  .right {
    width: 580px;
    .people-chart {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      span {
        font-size: 14px;
        color: #c3eef2;
      }
    }
    .allsummary {
      display: flex;
      margin: 10px 30px;
      span {
        font-size: 14px;
        color: #c3eef2;
        display: block;
      }
    }
  }
}

//动画
@-webkit-keyframes move_wave {
  0% {
    background-position: 0 0;
  }
  to {
    background-position: 532px 0;
  }
}

@keyframes move_wave {
  0% {
    background-position: 0 0;
  }
  to {
    background-position: 532px 0;
  }
}
</style>
