<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-input id="name" v-model="name"  placeholder="请输入帐号">
          帐号
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
          密码
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button id="login" @click="login" style="width:100%" type="primary">登录</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return{
        name:'',
        password:'',
      }
    },
    methods: {
      login(){
        console.log(this.name);
        console.log(this.password);
        console.log('login success!')
      }
    },
  }
</script>

<style scoped>

</style>
