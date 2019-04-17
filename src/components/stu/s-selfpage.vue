<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      <el-breadcrumb-item><b>修改个人信息</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-tickets"></i>
        </b>
        <span>
          <b>个人信息</b>
        </span>
      </el-col>
    </el-row>
    <div v-if="flag === 1">
    <div class="usercenter">

      <div class="user-style">

         <div class="userimg-style">

            <img v-bind:src="'../../static/xxyl.jpg'"/>

          </div>
        <div class="username-plus">

          <span><b>{{nowxyinfo.name}}</b></span>

        </div>
        <el-button type="primary" @click="setCurrent()" style="background:#C19892;border:none">修改与完善</el-button>

      </div>
    <div class="mymess">

      <i  class="icon-el-icon-people" aria-hidden="true"></i>

      &nbsp;&nbsp;姓名<span>{{nowxyinfo.name}}</span>

    </div>
    <div class="mymess">

      <i  class="icon-sex" aria-hidden="true"></i>

      &nbsp;&nbsp;性别<span>{{nowxyinfo.sex}}</span>

    </div>


      <div class="mymess">

        <i class="icon-class" aria-hidden="true"></i>

        &nbsp;&nbsp;班级<span>{{this.nowclassname}}</span>

      </div>

    <div class="mymess">

      <i  class="el-icon-phone" aria-hidden="true"></i>

      &nbsp;&nbsp;电话<span>{{nowxyinfo.phone}}</span>

    </div>

    <div class="mymess">

      <i class="el-icon-message" aria-hidden="true" ></i>

      &nbsp;&nbsp;邮箱<span>{{nowxyinfo.mail}}</span>

    </div>

    <div class="mymess">

      <i class="el-icon-location" aria-hidden="true"></i>

      &nbsp;&nbsp;地址<span>{{nowxyinfo.address}}</span>

    </div>

    </div>
    </div>

    <div v-else-if="flag === 2" class="form">

      <div class="usercenter">

        <div class="user-style">


          <div class="username-plus"><span>{{nowxyinfo.name}}</span></div>

          <div class="btn-update"><span v-on:click="flag = 1">取消</span></div>

        </div>

      </div>


      <div class="input-control" style="margin-top:80px">

        <input type="text" name="username" v-model="update.sex" placeholder="性别" />

      </div>

      <div class="input-control">

        <input type="text" name="username" v-model="update.phone" placeholder="电话" />

      </div>

      <div class="input-control">

        <input type="text" name="username" v-model="update.mail" placeholder="邮箱" />

      </div>

      <div class="input-control">

        <input type="text" name="username" v-model="update.address" placeholder="地址" />

      </div>

      <div class="button-control">

        <input type="button" name="submit" value="提交" v-on:click="submit"/>

      </div>

    </div>

  </div>
</template>

<script>
    import {getCookie} from "../../assets/js/cookie";

    export default {
        name: "s-selfpage",
      inject:['reload'],
      mounted(){
        // 加载数据
        let name=this.xyname
        console.log(name)
        this.$http.post('http://127.0.0.1:8088/xyl/getXyByname?xyname='+name).then(response=>{
          console.log(response.data);
          this.nowxyinfo=response.data;
          if(response.data.clazzByClassid===null){
            if(response.data.state===0)
            this.nowclassname="还没有班级，快去加入班级吧";
            else if(response.data.state===1)
              this.nowclassname="还未通过申请，请耐心等待哦"
          }
          else {
            this.nowclassname=response.data.clazzByClassid.Major+response.data.clazzByClassid.Name;
          }
        });
      },
      methods:{
        setCurrent() {
          this.update=this.nowxyinfo;
          this.flag=2;
        },
        submit(){
          this.$confirm(
            "确认修改?",
            "提示",
            {
              type: "warning"
            }
          ).then(() => {
            console.log("确定编辑班级成员信息");
            let data = this.update;
            console.log(JSON.stringify(data));
            if (this.update.sex === '') {
              alert("性别不可为空！")
            }
            else if (this.update.mail === '') {
              alert("电话不可为空！")
            }
            else if (this.update.phone === '') {
              alert("邮箱不可为空！")
            }
            else {
              this.$ajax({
                method: 'post',
                url: 'http://127.0.0.1:8088/xyl/updateNowin.do',
                data: data,
                contentType: "application/json charset=utf-8",
              }).then((res) => {
                console.log(res)
                if (res.data === true) {
                  console.log(res.data)
                  this.open();
                }
              }).catch(function (error){
                this.open1();
              })
            }
          })
        },
        open() {
          this.$message({
            message: '已成功修改',
            type: 'success'
          });
          this.flag=1;
          this.reload();
        },
        open1() {
          this.$message({
            message: '修改失败，请重试',
            type: 'fail'
          });
          this.reload();
        },
      },
      data(){
        return {
          dialogUpdateVisible: false,
          xyname: getCookie("xyusername"),
          flag:1,
          nowxyinfo:{
        },
          update: {
            xid:"",
            name: "",
            sex: "",
            phone: "",
            mail: "",
            address:"",
            state:"",
            pw:"",
            classinfo:{},
          },
          nowclassname:"",
        };
      },
    }
</script>

<style scoped>
  @import "../../../static/icon1/iconfont.css";
  @import "../../../static/icon2/iconfont.css";
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .orderTitle {
    border-bottom: 2px #B68C8C solid;
    font-size: 24px;
    padding-bottom: 10px;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .usercenter{

    position: relative;

    top:60px;

    width: 100%;

  }

  .usercenter a{

    text-decoration: none;

    color: #2c3e50;

  }
  .user-style{

    display: flex;

    justify-content: space-between;

    flex-direction: row;

    width: 90%;

    align-items: center;

    padding: 10px 5%;

    box-shadow: 10px 0 10px #ccc;

    cursor: pointer;

  }
  .userimg-style{

    width:30%;

  }


  .username-plus{

    width:60%;

  }

  .username-plus span{
    font-size:30px;
  }

  .userimg-style img{

    width:70px;

    height: 70px;

    border-radius: 50%;

  }
  .mymess{

    width: 90%;

    margin-top:10px;

    padding: 10px 5%;

    box-shadow: 0px 0 2px #ccc;

    cursor: pointer;

  }



  .mymess img{

    width: 50px;

    height: 50px;

    border-radius: 50%;

  }



  .mymess span{

    margin-left:30%;

  }



  .mymess i{

    font-size: 1.2rem;

  }

  .input-control{

    margin: 10px auto;

    width: 80%;

    height: 50px;

  }



  .input-control input{

    width: 98%;

    padding: 1%;

    outline:none;

    border:2px #f4f4f4 solid;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    -webkit-font-smoothing: antialiased;

    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;

    height: 30px;

    border-radius: 5px;

    background-color: transparent;

  }



  .input-control input:focus{

    border:2px #58E481 solid;

    border-radius: 5px;

  }



  input:-webkit-autofill{

    -webkit-box-shadow : 0 0 0px 1000px white inset ;

  }



  .button-control{

    margin: 0 auto;

    width: 80%;

    height: 50px;

  }



  .button-control input{

    height: 30px;

    width: 20%;

    outline:none;

    border:0;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    -webkit-font-smoothing: antialiased;

    -moz-osx-font-smoothing: grayscale;

    color: #fff;

    background-color: #58E481;

    border-radius: 5px;

    height: 40px;

  }
</style>
