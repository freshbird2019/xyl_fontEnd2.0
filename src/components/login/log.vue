<template>
  <div class="a" >
    <!--<div class="pics" >-->
    <!--<el-carousel height="400px":interval="5000" arrow="always" >-->
      <!--<el-carousel-item v-for="item in ImgUrl" :key="item">-->
        <!--<img v-bind:src=item height="400px" align="center"/>-->
      <!--</el-carousel-item>-->
    <!--</el-carousel>-->
    <!--</div>-->

    <h2 align="center" >在线校友录管理系统</h2>
    <div class="b" align="center" >
    <el-tabs type="border-card" style="width:40%;":stretch="true" >
      <el-tab-pane label="管理员登录"  >
        <div class="login-wrap" v-show="showLogin" >
          <p v-show="showTishi">{{tishi}}</p>
          <input type="text" placeholder="请输入用户名" v-model="username">
          <input type="password" placeholder="请输入密码" v-model="password">
          <el-button type="info" @click="loginGly"style="background:#D79B7C;border:none">登 录</el-button>
          <router-link to="/stu/s-welcome">
            <!--<el-button type="info" style="background:#D79B7C;border:none">测 试</el-button>-->
          </router-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="校友登录" >
        <div class="login-wrap" v-show="showLogin" >
          <p v-show="showTishi">{{tishi}}</p>
          <input type="text" placeholder="请输入用户名" v-model="xyusername">
          <input type="password" placeholder="请输入密码" v-model="xypassword">
          <el-button type="info" @click="loginXy"style="background:#D79B7C;border:none">登 录</el-button>
          <el-button type="info" @click="ToRegister"style="background:#D79B7C;border:none">注 册</el-button>
          <router-link to="/adm/a-welcome">
          <!--<el-button type="info" style="background:#D79B7C;border:none">测 试</el-button>-->
          </router-link>
        </div>
      </el-tab-pane>
    </el-tabs>
    </div>

    <!--显示精选留言-->
    <div align="center">
      <h1>精选留言</h1>
      <div class="col-md-8" v-for="item in ly">
        <div class="quote">
          <span class="text">{{item.info}}</span>
          <span>by:
            <small class="author">{{item.xyByLyxid.name}}</small>
          </span>
        </div>
    </div>
    </div>
      <!--显示热门活动-->
      <div align="center">
        <h1>热门活动</h1>
        <div class="col-md-8" v-for="item in ac">
          <div class="quote">
            <span class="text">{{item.description}}</span>
            <span>by:
            <small class="author">{{item.name}}</small>
          </span>
          </div>
        </div>
      </div>
      <!--<div style="width: 90%; align-content: center">-->
        <!--<div id="left">hah</div>-->
        <!--<div id="right">heh</div>-->
      <!--</div>-->

    </div>


</template>


<script>
  import {setCookie,getCookie} from '../../assets/js/cookie.js'
  export default{
    mounted(){
      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
     /* if(getCookie('username')){
        this.$router.push('/home')
      }*/
    },
    methods:{

      loginXy() { // 校友登陆
        if(this.xyusername == "" || this.xypassword == ""){
          alert("请输入用户名或密码")
        }else{
          let data = {'name':this.xyusername,'pw':this.xypassword}
          /*接口请求*/
          this.$http.post('http://127.0.0.1:8088/xyl/llogin.do',data).then((res)=>{
            console.log(res)
            /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
            if(res.data == -1){
              this.tishi = "该用户不存在"
              this.showTishi = true
            }else if(res.data == 0){
              this.tishi = "密码输入错误"
              this.showTishi = true
            }else if(res.data==-2){
              this.tishi="服务器崩了！！！"
              this.showTishi=true;
            }
            else{
              this.tishi = "登录成功"
              this.showTishi = true
              setCookie('xyusername',this.xyusername,1000*60)
              setTimeout(function(){
                this.$router.push('/stu/s-timeline')
              }.bind(this),1000)
            }
          })
        }
      },

      loginGly(){ //管理员登陆
        if(this.username == "" || this.password == ""){
          alert("请输入用户名或密码")
        }else{
          let data = {'username':this.username,'password':this.password};
          let info = "id="+this.username+"&pw="+this.password;
          /*接口请求*/
          this.$http.post('http://localhost:8088/xyl/checkLogin?'+info).then((res)=>{
            console.log(res)
            /*接口的传值是(false,该用户不存在),(false,密码错误)，同时还会检测管理员账号的值*/
            if(! res.data){
              this.tishi = "用户名或密码错误"
              this.showTishi = true
            }else{
              this.tishi = "登录成功"
              this.showTishi = true
              setCookie('username',this.username,1000*60)
              setTimeout(function(){
                this.$router.push('/adm/a-classpage')
              }.bind(this),1000)
            }
          })
        }
      },
      ToRegister(){
        this.$router.push('/login/register')
      },
    },
    mounted(){
      console.log("ly")
      this.$ajax({
        method:'get',
        url:'http://localhost:8088/xyl/xyGetAllLy',
      }).then(response=>{
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          if(response.data[i].best ==1)
              this.ly.push(response.data[i]);
        }
      });

      this.$ajax({
        method:'get',
        url:'http://localhost:8088/xyl/activityPg',
      }).then(response=>{
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          this.ac.push(response.data[i]);
        }
      });
    },

    data(){
        return{
          showLogin: true,
          showRegister: false,
          showTishi: false,
          tishi: '',
          username: '',
          password: '',
          xyusername: '',
          xypassword: '',
          newUsername: '',
          newPassword: '',
          ImgUrl:[
            '/static/1.jpg','/static/2.jpg','/static/3.jpg','/static/4.jpg'
          ],
          ly:[],
          ac:[]
        }
      }
    };

</script>

<style>
  body{background-color: #E0CDCF}
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
  .el-tabs__item{
    background-color:#DDDDDD;
    color:#fff!important;
    font-size:16px;
  }
  .el-tabs__item.is-active{
    background-color:#ffffff;
    color:#D79B7C!important;
  }

  .quote {
    padding: 10px;
    margin-bottom: 30px;
    border: 1px solid #333333;
    border-radius: 5px;
    box-shadow: 2px 2px 3px #333333;
    cursor: pointer;
  }
  .col-md-8 {
    width: 66.66666667%;
  }

  .quote span.text {
    display: block;
    margin-bottom: 5px;
    font-size: large;
    font-style: italic;
  }

  .quote small.author {
    font-weight: bold;
    color: #3677E8;
  }
  small, .small {
    font-size: 87%;
  }
  small {
    font-size: 80%;
  }

  #ly {
    float: left;
    /*background: aliceblue;*/
  }
  #ac{
    float: right;
  }

  #left{
    float: left;
    width: 70%;
    margin: 10px;
    background: cornsilk;
    height: 500px;
  }

  #right {
    float: right;
    width: 25%;
    margin: 10px;
    background: azure;
    height:500px;
  }
</style>
