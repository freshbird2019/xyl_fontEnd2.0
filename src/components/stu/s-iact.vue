<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动浏览</el-breadcrumb-item>
      <el-breadcrumb-item><b>我参加的活动</b></el-breadcrumb-item>
      <el-breadcrumb-item v-if="flag === 2"><b>活动参与者</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>我参加的活动</b>
          <div v-if="flag === 2" style="margin-right: 100%" class="el-icon-back" @click="back">
          </div>

        </span>
      </el-col>
    </el-row>

    <div v-if="flag === 1">
    <!--参加活动信息汇总 -->
    <el-table :data="iAcInfo" border >
      <el-table-column prop="aid" label="活动编号" align="center"></el-table-column>
      <el-table-column prop="name" label="主题" align="center"></el-table-column>
      <el-table-column prop="num" label="人数" align="center"></el-table-column>
      <el-table-column prop="description" label="内容" align="center"></el-table-column>
      <el-table-column prop="time" label="时间" align="center"></el-table-column>
      <el-table-column prop="location" label="地点" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-setting" @click="getActmate(scope.row)">成员</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="removed(scope.row)">退出</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <!-- 参加活动成员-->
    <div v-else-if="flag === 2" class="form">
      <el-table
        :data="ActmateInfo"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="姓名" >
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ props.row.mail }}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sex">
        </el-table-column>
        <el-table-column
          label="联系方式"
          prop="phone">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getCookie} from "../../assets/js/cookie";

  export default {
    name: "s-iact",
    inject:['reload'],
    methods: {
      // 新建订单
      removed(currentOrder) {
        console.log("退出该活动");
        this.$confirm(
          "确定退出参加此活动？ " + currentOrder.aid + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认拒绝此活动的申请");
          // 向请求服务端删除
          let info = "aid"+currentOrder.orderId+"&xyname="+xyname;
          console.log(orderId);
          this.$ajax.get('http://localhost:8088/xyl/exitAc?'+info,).then(response=> {
            console.log(response);
            if(response.data==="true"){

              /*加时间线*/
              var des=encodeURI("退出活动:  ")+currentOrder.time+currentOrder.name
              let timedate={'xyname':this.xyname,'type':4,'description':des}
              this.$http.post('http://127.0.0.1:8088/xyl/addTimeline',timedate).then(response => {
                console.log(response);
              });

              this.open1();
            }
          })
        })
          .catch(() => {
            this.$message.info("已取消操作!");
          });
      },
      getActmate(currentAc){
        this.flag=2;
        const routerParams = currentAc.aid;
        let id = routerParams;
        console.log(routerParams);
        console.log("loading data.")
        this.$ajax.get('http://localhost:8088/xyl/getAcXy?num='+id).then(response=> {
          console.log(response.data);
          for(let i= 0; i<response.data.length;i++) {
            this.ActmateInfo.push(response.data[i]);
          }
        });
      },
      back(){
        this.flag=1;
        this.reload();
      },
      open1() {
        this.$message({
          message: '已退出该活动',
          type: 'success'
        });
        this.reload();
      },
      open2() {
        this.$message({
          message: '已通过此活动的申请',
          type: 'success'
        });
        this.reload();
      },
      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },
    },
    mounted(){
      // 加载数据
      let name=this.xyname
      console.log("loading data.")
      this.$ajax.get('http://127.0.0.1:8088/xyl/getXyAc?name='+name).then(response=>{
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          this.iAcInfo.push(response.data[i]);
        }
      });
    },
    data() {
      return {
        flag:1,
        xyname:getCookie("xyusername"),
        dialogCreateVisible: false,
        ActmateInfo:[],
        iAcInfo: [],
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  .backtitle{
    font-size:20px;
  }
  .demo-table-expand {
    font-size: 0;
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
</style>
