<template>
  <div id="app">
    <el-container v-if="$route.meta.keepAlive" >
      <el-header>
        <keep-alive>
        <router-view name="aheader"></router-view>
          </keep-alive>
      </el-header>
      <el-container class="mainContainer">
        <el-aside >
          <keep-alive>
          <router-view name="aleft"></router-view>
            </keep-alive>
        </el-aside>
        <el-main >
          <keep-alive>
          <router-view name="amain"></router-view>
            </keep-alive>
        </el-main>
        <el-aside >
          <keep-alive>
          <router-view name="aright" ></router-view>
            </keep-alive>
        </el-aside>
      </el-container>
    </el-container>
    <router-view ></router-view>
  </div>
</template>

<script>
  export default {
    name: "App"
  };
</script>

<style>

  body {
    margin: 0;
    padding: 0;
  }
  .el-header {
    background-color: #E0CDCF;
    color: #333;
    min-height:60px;
  }
  .mainContainer {
    background-color: #E0CDCF;
    display: flex;
    min-height: 800px;
  }
  .el-aside {
    background-color: #E0CDCF;
    flex: 2;

  }

  .el-main {
    background-color: #FFFFFF;
    flex: 8;
  }
</style>
