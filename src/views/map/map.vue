<template>
  <div class="amap-wrapper">
    <Homeheader>
      <img class="header-title" src="@/assets/banner-title.png" alt />
    </Homeheader>
    <div class="amap-page-container" v-initHeight>
      <el-amap
        vid="amapDemo"
        ref="map"
        :zoom="zoom"
        :mapStyle="mapStyle"
        class="daily-map"
        :center="mapCenter"
      >
        <el-amap-marker :position="mapCenter" :icon="pointImg" :clickable="true"></el-amap-marker>
        <el-amap-marker
          v-for="(marker,index) in markers"
          :key="'marker-'+index"
          :position="marker.position"
          :events="marker.events"
          :icon="marker.icon"
          :clickable="true"
        ></el-amap-marker>
      </el-amap>
       <!--搜索-->
      <div class="search-cxt">
        <div class="search">
          <el-select @change="onSearchResult" clearable v-model="value" filterable placeholder="搜索党组织名称">
            <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <span @click="onSearchResult" class="search-btn">搜索</span> -->
        </div>
      </div>
      <!--自定义信息窗体-->
      <div class="window-info">
        <div class="info-cxt">
          <div class="cxt1">
            <div class="img-cxt-bg">
              <img class="img-cxt" :src="windowinfo.src" alt />
            </div>
            <p class="title-cxt">{{windowinfo.title}}</p>
            <p class="address-cxt">{{windowinfo.address}}</p>
            <p class="tel-cxt">{{windowinfo.tel}}</p>
          </div>
          <div class="cxt3">
            <div v-for="(item,index) in windowinfo.data1" :key="'info2-'+index">
              <p class="cxt3-num1">{{item.num}}</p>
              <p>{{item.title}}</p>
            </div>
            <div v-for="(ntem,index) in windowinfo.data2" :key="'ntem-'+index">
              <p class="cxt3-num2">{{ntem.num}}</p>
              <p>{{ntem.title}}</p>
            </div>
            <div class="ct4">
              <p class="ct4-title">
                本月组织生活达标率
                <span class="percent-class">{{percentage+'%'}}</span>
              </p>
              <Progress :percent="percentage" style="width:100%;"></Progress>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <Goback />
    </div>
  </div>
</template>

<script>
import initHeight from "./initHeight";
import Homeheader from "@/components/Homeheader";
import Progress from "@/components/Progress";
import Goback from "@/components/goback";
export default {
  components: {
    Homeheader,
    Progress,
    Goback
  },
  data() {
    return {
      zoom: 16,
      markers: [],
      mapCenter: [101.760052, 36.654633],
      mapStyle: "amap://styles/light", //地图样式
      pointImg: require("../../assets/mark.png"),
      percentage: 67,
      // 所有数据集合
      datalist: [],
      //搜索的党组织名称
      value: "",
      //所有党组织
      options: [
        {
          value: [101.760052, 36.654633],
          label: "西宁市沈那中学"
        },
        {
          value: [101.749604, 36.654287],
          label: "西宁碧桂园"
        },
        {
          value: [101.767565, 36.644117],
          label: "西宁朝阳学校"
        }
      ],
      //信息窗体内容
      windowinfo: {
        src: require("@/assets/icon-img.png"),
        title: "城北区委员会办公室党支部",
        address: "青海省西宁市城北区朝阳西路27",
        tel: "0971-8150323",
        data1: [
          {
            num: "12",
            title: "正式党员"
          },
          {
            num: "7",
            title: "预备党员"
          },
          {
            num: "3",
            title: "发展党员"
          }
        ],
        data2: [
          {
            num: "2",
            title: "正开展项目"
          },
          {
            num: "18",
            title: "累计项目"
          },
          {
            num: "5000",
            title: "费用结余(元)"
          }
        ]
      },
      windowinfo2: {
        src: "@/assets/icon-img.png",
        title: "城北区委员会办公室党支部",
        address: "青海省西宁市城北区朝阳西路27号",
        tel: "0971-8150323",
        data: [
          {
            num: "12",
            title: "正式党员"
          },
          {
            num: "12",
            title: "正式党员"
          }
        ]
      }
    };
  },
  directives: {
    initHeight
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let markers = [];
      let self = this;
      let data = [
        {
          position: [101.760052, 36.654633],
          title: "西宁市沈那中学",
          time: "2015/05/21 18:00",
          address: "银龙湾小区4",
          userId: 1
        },
        {
          position: [101.749604, 36.654287],
          title: "西宁碧桂园",
          time: "2015/05/21 18:00",
          address: "银龙湾小区3",
          userId: 2
        },
        {
          position: [101.767565, 36.644117],
          title: "西宁朝阳学校",
          time: "2015/05/21 18:00",
          address: "银龙湾小区2",
          userId: 3
        }
      ];

      for (let i = 0; i < data.length; i++) {
        markers.push({
          position: data[i].position,
          icon: self.pointImg,
          events: {
            click() {
              //  self.windowinfo = self.windowinfo2
            }
          }
        });
      }
      this.markers = markers;
    },
    onSearchResult() {
      console.log(this.value);
      if (this.value.length > 0) {
        this.mapCenter = this.value;
        this.zoom = 16;
      }
    }
  }
};
</script>
 <style style lang="scss" scoped>
.amap-page-container {
  min-height: 100%;
}
.footer {
  background: url("~@/assets/footer.png") left top no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 80px;
}
.map-inner {
  background: white;
  width: 100px;
  height: 30px;
  text-align: center;
}

.goback {
  position: absolute;
  left: 42px;
  bottom: 40px;
}

.search-cxt {
  position: absolute;
  bottom: 27px;
  right: 50%;
  margin-right: -174px;
  z-index: 44;
  .search {
   width: 348px;
    height: 46px;
  //  background: rgba(11, 25, 81, 1);
    opacity: 0.9;
  //  border-radius: 1px;
    .search-btn {
      font-size: 20px;
      font-weight: 400;
      color: #fff;
      display: inline-block;
      cursor: pointer;
      height: 59px;
      line-height: 59px;
      margin: 0 auto;
      text-align: center;
      width: 85px;
    }
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #263352;
    }
  }
}

.window-info {
  position: absolute;
  bottom: 117px;
  right: 45px;
  width: 380px;
  height: 896px;
  background: url("~@/assets/win-info.png") left top no-repeat;
  border-radius: 10px;
  .info-cxt {
    margin: 70px 30px;
    .cxt1 {
      .img-cxt-bg {
        background: url("~@/assets/icon-img-bg.png") left top no-repeat;
        background-size: 100% 100%;
        width: 221px;
        height: 226px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        .img-cxt {
          width: 178px;
          height: 178px; // display: block;
        }
      }

      .title-cxt {
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
        margin-top: 45px;
        margin-bottom: 25px;
      }
      .address-cxt {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        position: relative;
        padding-left: 20px;
        margin-bottom: 19px;
        &:before {
          content: "";
          background: url("~@/assets/address.png") left top no-repeat;
          width: 18px;
          height: 18px;
          background-size: 18px;
          position: absolute;
          top: 5px;
          left: 0px;
          z-index: 5;
        }
      }
      .tel-cxt {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
        position: relative;
        padding-left: 20px;
        margin-bottom: 46px;
        &:before {
          content: "";
          background: url("~@/assets/tel.png") left top no-repeat;
          width: 18px;
          height: 18px;
          background-size: 18px;
          position: absolute;
          top: 5px;
          left: 0px;
          z-index: 5;
        }
      }
    }
    .cxt3 {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      background: url("~@/assets/cxt3-bg.png") left top no-repeat;
      background-size: 100% 100%;
      //   border: 1px solid #0e3e5f; // width:320px;
      // height:354px;
      padding: 25px;
      p {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
      }
      div {
        width: 33%;
        margin: 11px 0px;
        .cxt3-num1 {
          font-size: 36px;
          font-family: DINPro;
          font-weight: 500;
          color: rgba(255, 218, 24, 1);
          // opacity: 0.9;
        }
        .cxt3-num2 {
          font-size: 36px;
          font-family: DINPro;
          font-weight: 500;
          color: rgba(251, 87, 65, 1);
          // opacity: 0.9;
        }
      }
      .ct4 {
        width: 100%;
        .ct4-title {
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
        }
        .percent-class {
          font-size: 14px;
          font-weight: 300;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>