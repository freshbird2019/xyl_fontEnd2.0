<template>
  <div>
    <h3 align="center">注册</h3>
    <div class="b" align="center" >
      <el-tabs type="border-card" style="width:50%;" :stretch="true">
        <el-tab-pane label="校友注册" >
          <div class="login-wrap" v-show="showLogin" >
            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="newUsername">
            <input type="password" placeholder="请输入密码" v-model="newPassword">
            <input type="text" placeholder="请输入性别" v-model="xysex">
            <input type="text" placeholder="请输入电话" v-model="xyphone">
            <input type="text" placeholder="请输入邮箱" v-model="xyemail">
            <input type="text" placeholder="请输入地址" v-model="xyaddress">
            <button v-on:click="register">注册</button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
  import {setCookie,getCookie} from '../../assets/js/cookie.js'
  export default{
    mounted(){
      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
      /*if(getCookie('xyusername')){
        this.$router.push('/home')
      }*/
    },
    methods:{
      register() {
        if (this.newUsername == "" || this.newPassword == "") {
          alert("请输入用户名或密码")
        } else {
          let data = {'name': this.newUsername, 'pw': this.newPassword,'sex':this.xysex,
            'phone':this.xyphone, 'mail':this.xyemail,'address':this.xyaddress}
          this.$ajax({
            method:'post',
            url:'http://127.0.0.1:8088/xyl/register.do',
            data:{
              "name": this.newUsername,
              "pw":this.newPassword,
              "sex":this.xysex,
              "phone":this.xyphone,
              "mail":this.xyemail,
              "address":this.xyaddress},
            contentType:"application/json charset=utf-8",
          }).then((res) => {
            console.log(res)
            if (res.data == true) {
              console.log(res.data)
              this.tishi = "注册成功"
              this.showTishi = true
              this.newUsername = ''
              this.newPassword = ''

              /*加时间线*/
              var des=encodeURI("注册成为校友录用户");
              let timedate={'xyname':this.newUsername,'type':1,'description':des}
              this.$http.post('http://127.0.0.1:8088/xyl/addTimeline',timedate).then(response => {
                console.log(response);
              });

              /*注册成功之后再跳回登录页*/
              setTimeout(function () {
                this.$router.push('/')
              }.bind(this), 1000)
            }
          })
        }
      }
    },

    data(){
      return{
        showLogin: true,
        showRegister: true,
        showTishi: false,
        tishi: '',
        xyusername: '',
        xypassword: '',
        newUsername: '',
        newPassword: '',
        xysex:'',
        xyphone:'',
        xyemail:'',
        xyaddress:''
      }
    }
  };

</script>

<style>
  .login-wrap{text-align:center;}
  input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}

  .register{float:left;}
  .pic{float:left;}

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    float:left;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
