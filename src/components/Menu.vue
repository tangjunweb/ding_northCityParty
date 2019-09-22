<template>
  <div class="menu">
    <div class="menu-list">
      <router-link class="menu-item" tag="div" to="/Education">智慧教育</router-link>
      <router-link class="menu-item" tag="div" to="/Server">智慧服务</router-link>
      <router-link class="menu-item" tag="div" to="/Analysis">重点工作监督即时</router-link>
      <router-link class="menu-item" tag="div" to="/Manage">智慧管理</router-link>
      <router-link class="menu-item" tag="div" to="/Propaganda">智慧宣传</router-link>
      <router-link class="menu-item" tag="div" to="/Map">党建服务品牌</router-link>
      <router-link class="menu-item" tag="div" to="/organazition">特色组织生活</router-link>
    </div>
    <div class="menu-btn"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.menu {
  z-index: 1000;
  position: fixed;
  right: 50px;
  bottom: 10px;
  &:hover .menu-list {
    height: auto;
    padding: 20px 0;
    opacity: 1;
  }
  .menu-btn {
    background: url("../assets/menu.png") no-repeat center;
    width: 220px;
    height: 52px;
    cursor: pointer;
  }
  .menu-list {
    background: url("../assets/menu-bg.png") no-repeat center;
    width: 213px;
    height: 0;
    overflow: hidden;
    transition: all 0.5s;
    margin-bottom: 5px;
    padding: 0;
    opacity: 0;
    box-sizing: border-box;
    background-size: 100% 100%;
    .menu-item {
      width: 182px;
      height: 40px;
      font-size: 24px;
      color: #65c7ff;
      background: rgba(101, 199, 255, 0.5);
      margin: 0 auto 9px;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
      &:hover {
        background: rgba(101, 199, 255, 1);
        color: #000;
      }
    }
    .router-link-active {
      background: rgba(101, 199, 255, 1);
      color: #000;
    }
  }
}
</style>
