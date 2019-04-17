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
          <span>班级管理</span>
        </template>
          <router-link to="/adm/a-classpage">
            <el-menu-item index="1-1">查看班级信息</el-menu-item>
          </router-link>
        <el-submenu index="1-2">
          <template slot="title">管理班级成员</template>
          <!--<router-link to="/adm/a-clacheck">-->
          <!--<el-menu-item index="1-2-1">已审核成员</el-menu-item>-->
          <!--</router-link>-->
          <router-link to="/adm/a-clacheck2">
          <el-menu-item index="1-2-2">未审核成员</el-menu-item>
          </router-link>
        </el-submenu>
        </el-submenu>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-edit-outline"style="color:#ffffff"></i>
          <span>活动管理</span>
        </template>
        <router-link to="/adm/a-actpage">
          <el-menu-item index="2-1">查看活动信息</el-menu-item>
        </router-link>
          <!--<router-link to="/adm/a-actcheck">-->
          <!--<el-menu-item index="2-2">审批活动信息</el-menu-item>-->
          <!--</router-link>-->
        </el-submenu>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"style="color:#ffffff"></i>
          <span>留言管理</span>
        </template>
        <router-link to="/adm/a-commentpage">
          <el-menu-item index="3-1">查看当前留言</el-menu-item>
        </router-link>
        <router-link to="/adm/a-comcheck">
          <el-menu-item index="3-2">管理后台留言</el-menu-item>
        </router-link>
        </el-submenu>
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

