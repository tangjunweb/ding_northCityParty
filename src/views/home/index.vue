<template>
  <div class="home-bg">
    <Homeheader>
      <img class="header-title" src="@/assets/title-1.png" alt />
    </Homeheader>
    <div class="menu-list">
      <router-link
        v-for="(item,index) in menu"
        :key="index"
        class="menu-item"
        tag="div"
        :to="item.to"
      >
        <div class="squre">
          <img :src="item.imgSrc" alt />
          <p>{{item.title}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import Homeheader from "@/components/Homeheader";
export default {
  components: {
    Homeheader
  },
  data() {
    return {
      menu: [
        {
          to: "/Map",
          imgSrc: require("@/assets/dj.png"),
          title: "党建服务品牌"
        },
        {
          to: "/organazition",
          imgSrc: require("@/assets/zs.png"),
          title: "特色组织生活"
        },
        {
          to: "/Server",
          imgSrc: require("@/assets/fw.png"),
          title: "党建综合服务"
        },
        {
          to: "/keywork",
          imgSrc: require("@/assets/jd.png"),
          title: "重点工作监督即时"
        },
        {
          to: "/organazition",
          imgSrc: require("@/assets/dj.png"),
          title: "先进个人/先进组织"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.home-bg {
  background: url("~@/assets/bg-1.png");
  background-size: 100% 100%;
  height: 100%;
  .menu-list {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    width: 1132px;
    justify-content: space-between;
    //  margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    .menu-item {
      cursor: pointer;
      margin-bottom: 55px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
  .squre {
    background: url("~@/assets/squre-bg.png") left top no-repeat;
    background-size: 100% 100%;
    width: 516px;
    height: 119px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      display: block;
      margin-left: 27px;
      margin-right: 65px;
    }
    p {
      font-size: 36px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>