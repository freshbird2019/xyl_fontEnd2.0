<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理班级成员</el-breadcrumb-item>
      <el-breadcrumb-item><b>待审核成员</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>待审核班级成员列表</b>
        </span>
      </el-col>
    </el-row>

    <!-- 待审批成员信息汇总 -->
    <el-table :data="xyInfo" border>
      <el-table-column prop="xid" label="学号" align="center"></el-table-column>
      <el-table-column prop="clazzByClassid.Cid" label="所申请班级" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope" >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="pass(scope.row)"
          >通过</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="removed(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "MainBox",
    inject:['reload'],
    methods: {
      // 新建订单
      createOrder() {
        let data = this.create;
        console.log(data);
        this.$ajax.post('http://localhost:8080/order/saveOne/', JSON.stringify(data),
          {
            headers: { 'Content-Type': 'application/json;charset=UTF-8'}
          }
        ).then(response=> {
          console.log(response);
          this.dialogCreateVisible=false;
          this.open2();
        }).catch(function (error){
          console.log("save failed！")
        });
      },
      setCurrent(currentOrder) {
        console.log(currentOrder);
        this.update.orderId = currentOrder.orderId;
        this.update.orderSource = currentOrder.orderSource;
        this.update.totalPrice = currentOrder.totalPrice;
        this.update.remark = currentOrder.remark;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      //同意申请
      pass(curr) {
        this.$confirm(
          "此操作将通过该同学的申请 " + curr.xid + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认同意申请");
          // 向请求服务端删除
          let id = curr.xid;
          let state = 2;
          console.log(id);
          this.$ajax.get('http://localhost:8088/xyl/apply.do?xid='+id+'&state='+state,).then(response=> {
            console.log(response);
            if(response.data){
              this.open2();

              /*加时间线*/
              var des=encodeURI("通过审核，成为")+curr.clazzByClassid.year+encodeURI("届")+curr.clazzByClassid.college+
                curr.clazzByClassid.major+curr.clazzByClassid.name+encodeURI("的一员");
              let timedate={'xyname':curr.name,'type':5,'description':des}
              this.$http.post('http://127.0.0.1:8088/xyl/addTimeline',timedate).then(response => {
                console.log(response);
              });

            }
          }).catch(function (error){
            console.log("delete failed！")
          });
        })
          .catch(() => {
            this.$message.info("已取消操作!");
          });

      },
      // 拒绝申请
      removed(currentOrder) {
        console.log("拒绝申请");
        this.$confirm(
          "此操作将拒绝该同学的申请 " + currentOrder.xid + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认同意申请");
          // 向请求服务端删除
          let id = currentOrder.xid;
          let state = 0;
          console.log(id);
          this.$ajax.get('http://localhost:8088/xyl/apply.do?xid='+id+'&state='+state,).then(response=> {
            console.log(response);
            if(response.data){
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
          message: '已拒绝该同学的申请',
          type: 'success'
        });
        this.reload();
      },
      open2() {
        this.$message({
          message: '恭喜你，添加成功',
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
      console.log("loading data.")
      this.$ajax({
        method:'get',
        url:'http://localhost:8088/xyl/getAllXy1',
      }).then(response=>{
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
        create: {
          xid: "",
          name: "",
          sex: "",
          phone: "",
          mail: "",
        },
        update: {
          xid: "",
          name: "",
          sex: "",
          phone: "",
          mail: "",
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
