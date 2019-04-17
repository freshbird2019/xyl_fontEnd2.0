<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>寻人启事</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-phone"></i>
        </b>
        <span>
          <b>寻人启事</b>
        </span>
      </el-col>
    </el-row>
  <div align="center" v-if="flag === 1" style="margin-top:5%;">

    <div class="col-md-8" v-for="item in findNotice" @click="toOnefindnotice(item)">
      <div class="quote">
        <span class="text">{{item.xyByFid.name}}&nbsp;&nbsp;寻找&nbsp;&nbsp; <i class="to">{{item.ftitle}}</i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="small">{{moment(item.ftime).format('YYYY-MM-DD HH:mm:ss')}}</i></span>
      </div>
    </div>
  </div>

  </div>
</template>

<script>

      import {getCookie} from "../../assets/js/cookie";
      import moment from 'moment'
      export default {
        name: "s-findnotice",
        inject:['reload'],
        methods:{
          moment:moment,
          toOnefindnotice(currentfd){
           //let id = currentfd.noticeid;
          // console.log(id);
            this.$router.push({
              // 你要跳转的地址
              path: '/stu/s-onefindpage',
              query: {
                thisfd:currentfd
              }
            });
          },
          back(){
            this.flag=1;
          },
        },
        mounted(){
          let name=this.xyname;
          console.log(name);
          this.$http.post('http://localhost:8088/xyl/getXyByname?xyname='+name).then(res=> {
            console.log(res.data);
            this.nowxy=res.data;

            let cid=this.nowxy.clazzByClassid.Cid;
            console.log(cid)
            console.log("loading data.")

            this.$ajax.get('http://localhost:8088/xyl/getAllFindNotice?cid='+cid).then(response=>{
              console.log(response.data);
              for(let i= 0; i<response.data.length;i++) {
                  this.findNotice.push(response.data[i]);
              }
            });

          });
        },
        data(){
          return{
            xyname:getCookie("xyusername"),
            nowxy:{},
            flag:1,
            findNotice:[],
            thisfd:{
              ftitle:"",
              description:"",
              xyByFid:{
                name:"",
                address:"",
                phone:"",
                mail:""
              },
              ftime:""
            },

        }}
      }
</script>
<style scoped>
  .orderTitle {
    border-bottom: 2px #B68C8C solid;
    font-size: 24px;
    padding-bottom: 10px;
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

  .to {
    font-weight: bold;
    color: #e88917;
  }

  .small {
    font-size:70%
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
</style>
