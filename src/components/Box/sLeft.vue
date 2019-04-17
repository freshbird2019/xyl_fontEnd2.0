<template>
  <div class="leftBox">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#B68C8C"
      text-color="#fff"
      active-text-color="#EAC25E"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-edit"style="color:#ffffff"></i>
          <span>班级浏览</span>
        </template>
        <router-link to="/stu/s-classpage">
          <el-menu-item index="1-1">查看班级信息</el-menu-item>
        </router-link>
        <router-link to="/stu/s-classmate">
          <el-menu-item index="1-2">查看班级成员</el-menu-item>
        </router-link>
      </el-submenu>


      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-edit-outline"style="color:#ffffff"></i>
          <span>活动浏览</span>
        </template>
        <router-link to="/stu/s-actpage">
          <el-menu-item index="2-1">所有活动信息</el-menu-item>
        </router-link>
        <router-link to="/stu/s-iact">
          <el-menu-item index="2-2">我参加的活动</el-menu-item>
        </router-link>
      </el-submenu>


      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"style="color:#ffffff"></i>
          <span>留言浏览</span>
        </template>
        <router-link to="/stu/s-comment">
          <el-menu-item index="3-1">查看当前留言</el-menu-item>
        </router-link>
        <router-link to="/stu/s-commentcheck">
          <el-menu-item index="3-2">我的留言</el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-tickets"style="color:#ffffff"></i>
          <span>个人信息</span>
        </template>
        <router-link to="/stu/s-selfpage">
          <el-menu-item index="4-1">修改个人信息</el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-phone"style="color:#ffffff"></i>
          <span>寻人启事</span>
        </template>
        <router-link to="/stu/s-findnotice">
          <el-menu-item index="5-1">寻人启事</el-menu-item>
        </router-link>
        <router-link to="/stu/s-addnewfind">
          <el-menu-item index="5-2">找人</el-menu-item>
        </router-link>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "LeftBox",
    data() {
      return {};
    },
    methods: {}
  };
</script>

<style lang="" scoped>
  .el-menu a{
    text-decoration: none;
  }
</style>

