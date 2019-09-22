<template>
  <div class="back">
    <router-link class="goback" tag="div" to="/Home">
      <img src="@/assets/goback.png" alt />
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
.back {
  position: relative;
  height: 80px;
  width: 100%;
  .goback {
    position: absolute;
     cursor: pointer;
    right: 119px;
    bottom: 24px;
    width: 140px;
    height: 48px;
  }
}
</style>