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
    <div  style="margin-right: 100%" class="el-icon-back" @click="back">
    </div>

      <div class="usercenter">

        <div class="user-style">

          <div class="username-plus">

            <span><b>{{thisfd.xyByFid.name}}&nbsp;&nbsp;&nbsp;&nbsp;寻找&nbsp;&nbsp;&nbsp;&nbsp;{{thisfd.ftitle}}</b></span>

          </div>

        </div>
      </div>
    <div class="input-control" >
      <div  style="margin-top:20px">
         <el-table
           :data="tableData"
           style="width: 100%">
           <el-table-column >
             <template slot-scope="props">
               <el-form label-position="left" inline class="demo-table-expand">
                 <el-row>
                   <el-col :span="20">
                     <el-form-item label="发布人时间：">
                       <span>{{moment(props.row.ftime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                     </el-form-item>
                   </el-col>
                 <el-col :span="20">
                     <el-form-item label="发布人姓名：">
                       <span>{{ props.row.xyByFid.name }}</span>
                     </el-form-item>
                   </el-col>
                   <el-col :span="20">
                     <el-form-item label="发布人专业：">
                       <span>{{ props.row.xyByFid.clazzByClassid.Major }}</span>
                     </el-form-item>
                   </el-col>
                   <el-col :span="10">
                     <el-form-item label="发布人电话：">
                       <span>{{ props.row.xyByFid.phone}}</span>
                     </el-form-item>
                   </el-col>
                <el-col :span="10">
                  <el-form-item label="发布人邮箱：">
                  <span>{{ props.row.ftime }}</span>
                  </el-form-item></el-col>
                  <el-col :span="20">
                  <el-form-item label="寻人内容：">
                    <span>{{ props.row.description }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      </div>
  </div>
  </div>
</template>

<script>
  import moment from 'moment'
    export default {
        name: "s-onefindpage",
      mounted(){
        // 加载数据
        const routerParams = this.$route.query.thisfd;
        console.log(routerParams);
        this.thisfd=routerParams
        this.tableData.push(this.thisfd)
      },
      methods:{
        moment:moment,
        back(){
          this.$router.push('/stu/s-findnotice')
        },
      },
      data(){
        return{
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
          tableData:[]
        }}

    }
</script>

<style scoped>
  .usercenter a{

    text-decoration: none;

    color: #2c3e50;

  }
  .user-style{

    display: flex;

    justify-content: space-between;

    flex-direction: row;

    width: 75%;

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

  .mymess{

    width:80%;

    margin-top:10px;

    padding: 10px 5%;

    box-shadow: 0px 0 2px #ccc;

    cursor: pointer;
    margin-right: auto;
  }




  .mymess i{

    font-size: 1.2rem;

  }
  .input-control{

    margin: 1px auto;

    width: 60%;

    height: 50px;

  }



</style>
