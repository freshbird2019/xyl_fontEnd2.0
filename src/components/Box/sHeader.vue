<template>
  <div class="header">
    <el-header style="display:flex;justify-content:flex-end;align-items:center;padding:20px;">
      <!---->

      <el-row>
        <el-col :span="1.5">
        <i  class="icon-home" aria-hidden="true" style="font-size:25px" @click="tohome"
            id="abc" @mouseover="changeMask(true)" @mouseout="changeMask(false)"></i>
      </el-col>
        <el-col :span="1.5" offset="20">
        <span >
          <b>当前登录身份：学生  </b>
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
    methods: {
      tohome(){
        this.$router.push('/stu/s-timeline');
      },
      changeMask:function(b){
        if(b){
          document.getElementById("abc").style.cursor="pointer";
        }else{
          document.getElementById("abc").style.cursor="wait";
        }
        console.log(b);
      }

    }
  };
</script>

<style  scoped>
  @import "../../../static/iconhome/iconfont.css";
</style>

