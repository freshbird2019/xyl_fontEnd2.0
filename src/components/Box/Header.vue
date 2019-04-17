<template>
  <div class="header">
    <el-header style="display:flex;justify-content:flex-end;align-items:center;padding:20px;">
      <!---->
      <el-row>
        <el-col :span="1.5" offset="21">
        <span>
          <b>当前登录身份：管理员</b>
        </span>
        </el-col>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <!-- 1、设置跳转链接：router-link to="路由路径" -->
            <el-dropdown-item>
              <router-link to="/">
                退出
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown><hr align=center width=1450 color=#9B887C SIZE=1></el-row>
    </el-header>

    <el-dialog :visible.sync="visible" title="Hello world">
      <p>弹窗</p>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        visible: false
      };
    },
    methods: {}
  };
</script>

<style lang="sass" scoped>

</style>

