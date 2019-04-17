<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item><b>审批活动信息</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>待审核活动</b>
        </span>
      </el-col>
    </el-row>

    <!-- 待审核活动信息汇总 -->
    <el-table :data="xyInfo" border>
      <el-table-column prop="xid" label="校友id" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center"></el-table-column>
      <el-table-column prop="mail" label="邮箱" align="center"></el-table-column>
      <!--<el-table-column label="操作" width="220" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--type="primary"-->
            <!--size="mini"-->
            <!--icon="el-icon-setting"-->
            <!--@click="setCurrent(scope.row)"-->
          <!--&gt;通过</el-button>-->
          <!--<el-button type="danger" size="small" icon="el-icon-delete" @click="removed(scope.row)">拒绝</el-button>-->
        <!--</template>-->
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "MainBox",
    inject:['reload'],
    methods: {
      // 新建订单
      setCurrent(currentOrder) {
        console.log(currentOrder);
        this.update.orderId = currentOrder.orderId;
        this.update.orderSource = currentOrder.orderSource;
        this.update.totalPrice = currentOrder.totalPrice;
        this.update.remark = currentOrder.remark;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      updateOrder() {
        console.log("确定编辑用户");
        this.dialogUpdateVisible = false;
      },
      // 删除订单
      removed(currentOrder) {
        console.log("拒绝活动申请");
        this.$confirm(
          "确定拒绝此活动的申请？ " + currentOrder.orderId + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认拒绝此活动的申请");
          // 向请求服务端删除
          let orderId = currentOrder.aid;
          console.log(orderId);
          this.$ajax.get('http://localhost:8088/xyl/'+orderId,).then(response=> {
            console.log(response);
            if(response.data=="success"){
              this.open1();
            }
          }).catch(function (error){
            console.log("delete failed！")
          });
        })
          .catch(() => {
            this.$message.info("已取消操作!");
          });
      },
      open1() {
        this.$message({
          message: '已拒绝该活动',
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
      const routerParams = this.$route.query.aid;
      let id = routerParams;
      console.log(routerParams);
      console.log("loading data.")
      this.$ajax.get('http://localhost:8088/xyl/getAcXy?num='+id).then(response=> {
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          this.xyInfo.push(response.data[i]);
        }
      });
    },
    data() {
      return {
        dialogCreateVisible: false,
        dialogUpdateVisible: false,
        aid: 0,
        create: {
          xid: "",
          name: "",
          sex: "",
          phone: "",
          mail: ""
        },
        update: {
          xid: "",
          name: "",
          sex: "",
          phone: "",
          mail: ""
        },
        xyInfo: [],
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
</style>
