<template>
  <div class="input-search">
    <div class="input-wrapper">
      <div class="show-search" @click="isFocus=true" v-show="!isFocus">{{model.UnitName}}</div>
      <input
        ref="input"
        type="text"
        v-if="isFocus"
        id="input-search"
        autocomplete="off"
        v-model.trim="params.UnitName"
        v-focus="isFocus"
        @focus="focus()"
        @blur="blur"
      >
    </div>
    <div class="search-list" v-show="isFocus">
      <div
        class="list-item"
        @click="selectHandle(item)"
        v-for="(item, index) in list"
        :key="index"
      >{{item.UnitName}}</div>
    </div>
  </div>
</template>

<script>
import { GetUnits } from "@/api/api";
export default {
  data() {
    return {
      model: {
        UnitName: "",
        UnitGuid: ""
      },
      params: {
        UnitName: "西宁市大通县",
        TopNum: 10
      },
      isFocus: false,
      list: []
    };
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  mounted() {
    this.getUnits(true);
  },
  methods: {
    getUnits(boolean) {
      GetUnits(this.params).then(res => {
        if (boolean) {
          this.model = {
            UnitName: res.Data[0].UnitName,
            UnitGuid: res.Data[0].UnitGuid
          };
          this.params.UnitName = res.Data[0].UnitName;
          this.$emit("change", this.model);
        } else {
          this.list = res.Data;
        }
      });
    },
    selectHandle(v) {
      this.params.UnitName = v.UnitName;
      this.model.UnitName = v.UnitName;
      this.model.UnitGuid = v.UnitGuid;
      this.$emit("change", this.model);
      this.isFocus = false;
    },
    focus() {
      if (document.querySelector("input") == document.activeElement) {
        this.list = [
          {
            UnitGuid: "74369f5b-2d4e-45ba-96e8-aece6402729d",
            UnitName: "西宁市人民政府办公厅"
          },
          {
            UnitGuid: "081adf1f-17fe-4a6b-857e-3b44a1a5124d",
            UnitName: "西宁市人民检察院"
          },
          {
            UnitGuid: "a83b27a6-ae56-4c13-a470-e43fe8c266da",
            UnitName: "中共西宁市委宣传部"
          },
          {
            UnitGuid: "70dc480c-7cf4-4077-8c38-660deedf943c",
            UnitName: "中共西宁市委组织部"
          },
          {
            UnitGuid: "210899cb-fea2-49d1-a0b9-234fe2b13b2d",
            UnitName: "西宁市第二中学"
          },
          {
            UnitGuid: "cfe609e4-e728-4870-8a55-856d77cdc1c4",
            UnitName: "西宁市湟源县统计局"
          },
          {
            UnitGuid: "68b9568d-7932-4e52-9485-b4a64874b48c",
            UnitName: "西宁城市投资管理有限公司"
          },
          {
            UnitGuid: "f5a0f39b-d5db-4c80-81b2-9ae81eacdfc8",
            UnitName: "西宁金融控股有限公司"
          },
          {
            UnitGuid: "1daf7c77-3acb-42ad-ae9a-eeae6b5ef208",
            UnitName: "中共西宁市城西区虎台街道工作委员会"
          },
          {
            UnitGuid: "6ba3e115-e80f-43bb-b740-e15122bda98f",
            UnitName: "西宁市城北区建设局"
          }
        ];
        if (!this.params.UnitName) {
          this.list = [];
          return;
        }
      }
    },
    blur() {
      const that = this;
      this.params.UnitName = this.model.UnitName;
      setTimeout(() => {
        this.isFocus = false;
      }, 300);
    }
  },
  watch: {
    params: {
      handler(n) {
        this.getUnits();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.input-search {
  position: relative;
  .input-wrapper {
    display: flex;
  }
  #input-search {
    min-width: 225px;
    border: 0;
    outline: 0;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    color: #fff;
    background: #5d6ac3;
    width: 100%;
    padding: 0 15px;
  }
  .show-search {
    max-width: 355px;
    overflow: hidden;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    padding: 0 15px;
    color: #fff;
    background: #5d6ac3;
  }
  .search-list {
    position: absolute;
    left: 0;
    background: #fff;
    top: 40px;
    z-index: 99;
    .list-item {
      cursor: pointer;
      line-height: 30px;
      padding: 0 15px;
      color: #666;
      &:hover {
        background: #5d6ac3;
        color: #fff;
      }
    }
  }
}
</style>
