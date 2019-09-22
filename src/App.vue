<template>
  <div id="app">
    <div class="wrapper">
      <router-view/>
    </div>
    <!-- <Menu/> -->
  </div>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  name: "App",
  components: {
    Menu
  }
};
</script>

<style>
html,
body {
  background: url('~@/assets/organazie-bg.png')left top no-repeat;
  background-size: 100% 100%;
  height: 100%;
  /* width:100%;  */
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100%;
  color: #c6dffe;
  font-size: 13px;
}

.wrapper {
  /* width: 1848px; */
   height: 967px; 
  /* height: 100%; */
  /* background: url("./assets/bg.png") no-repeat center;
  background-size: 100% 100%; */
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
