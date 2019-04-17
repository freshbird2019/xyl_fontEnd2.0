<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>寻人启事</el-breadcrumb-item>
      <el-breadcrumb-item><b>发布寻人启事</b></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-phone"></i>
        </b>
        <span>
          <b>发布寻人启事</b>
        </span>
      </el-col>
    </el-row>
    <div class="form">
        <div class="input-control" style="margin-top:30px">
          请输入你要寻找的人: <input type="text" name="username" v-model="ftitle" style="margin-top:10px"/>
        </div>
      <div class="input-control" style="margin-top:40px">
        谁可见：<el-radio v-model="radio" label="0" >全部成员</el-radio>
      <el-radio v-model="radio" label="1">班级成员</el-radio>
      </div>
      <div class="input-control" style="margin-top:1px">
        描述：
        <el-input
          type="textarea"
          name="abc"
          placeholder="请输入内容"
          v-model="description"
          rows="15" style="margin-top:10px">
        </el-input>
      </div>
    </div>
        <el-col :span="1"  style="margin-left:73%;margin-top:30%;">
          <el-button type="info" @click="ToAdd" style="background:#C19892;border:none;margin-top:20px">发表</el-button>
        </el-col>

    </div>


</template>

<script>
    import {getCookie} from "../../assets/js/cookie";

    export default {
        name: "addnewfind",
      inject:['reload'],
      mounted(){
        let name=this.xyname;
        console.log(name);
        this.$http.post('http://localhost:8088/xyl/getXyByname?xyname='+name).then(res=> {
          console.log(res.data);
          this.nowxy=res.data;
        });
      },
      methods: {
        ToAdd() {
         if (this.ftitle === '') {
            alert("标题不可为空！")
          }
          else if (this.description === '') {
            alert("内容不可为空！")
          }
          else {
            var desc = encodeURI(this.description);
            var title = encodeURI(this.ftitle);
           var state=this.radio;
            if (this.radio !== "0") {
              state = this.nowxy.clazzByClassid.Cid;
            }
            let data = {
              'xyname': this.xyname, 'state': state,
              'title': title, 'description': desc
            }
            console.log(data);
            this.$http.post('http://127.0.0.1:8088/xyl/addFindNotice', data
            ).then(response => {
              console.log(response);
              if (response.data === true) {


                /*加时间线*/
                var des=encodeURI("发表寻人启事:  寻找"+this.ftitle);
                let timedate={'xyname':this.xyname,'type':3,'description':des};
                this.$http.post('http://127.0.0.1:8088/xyl/addTimeline',timedate).then(response => {
                  console.log(response);
                });

                this.open1();
              }
              else this.open2();
            })
          }
        },
        open1(){
          this.$message({
            message:'发表成功',
            type:'success'
          });
          this.reload();
        },
        open2(){
          this.$message({
            message:'发表失败',
            type:'failed'
          });
          this.reload();
        }
      },
      data () {
        return {
          nowxy:{},
          xyname:getCookie("xyusername"),
          radio: "1",
          ftitle:"",
          description:"",
      };
      }

    }
</script>

<style scoped>
  .orderTitle {
    border-bottom: 2px #B68C8C solid;
    font-size: 24px;
    padding-bottom: 10px;
  }
  .input-control{

    margin: 1px auto;

    width: 60%;

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

  .input-control el-input{

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



  input:-webkit-autofill{

     -webkit-box-shadow : 0 0 0px 1000px white inset ;

   }
  el-input:-webkit-autofill{

    -webkit-box-shadow : 0 0 0px 1000px white inset ;

  }
</style>
