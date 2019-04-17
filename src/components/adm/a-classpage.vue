<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
      <el-breadcrumb-item><b>班级信息汇总</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>班级信息汇总</b>
        </span>
      </el-col>
    </el-row>

    <!-- 班级汇总 -->
    <el-table :data="ClassInfo" border>
      <el-table-column prop="cid" label="班级号" align="center"></el-table-column>
      <el-table-column prop="year" label="年份" align="center"></el-table-column>
      <el-table-column prop="major" label="专业" align="center"></el-table-column>
      <el-table-column prop="college" label="学院" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="setCurrent(scope.row)"
          >编辑</el-button>
          <!--<el-button type="danger" size="small" icon="el-icon-delete" @click="removed(scope.row)">删除</el-button>-->
          <el-button type="danger" size="small" icon="el-icon-delete" @click="showMember(scope.row)">成员</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-col :span="1"  style="margin-left:89%;margin-top:3%;">
      <el-button type="info" @click="dialogCreateVisible = true"style="background:#C19892;border:none">添加新班级</el-button>
    </el-col>
    <!-- 新建班级 -->
    <el-dialog title="添加新班级" :visible.sync="dialogCreateVisible" width="30%" align="center">
      <el-form id="#create" :model="create" ref="create" label-width="100px">
        <el-form-item label="班级号" prop="name" >
          <el-input v-model="create.name"></el-input>
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-input v-model="create.year"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="create.major"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="create.college"  auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="info" @click="createOrder"style="background:#C19892;border:none">确 定</el-button>
        <el-button @click="dialogCreateVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改班级 -->
    <el-dialog
      title="修改班级信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form id="#update" :model="update" ref="update" label-width="100px">
        <el-form-item label="班级号" prop="cid">
          <el-input v-model="update.cid"></el-input>
        </el-form-item>
        <el-form-item label="班级名" prop="name">
          <el-input v-model="update.name"></el-input>
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-input v-model="update.year"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="update.major"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input v-model="update.college"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateOrder" style="background:#C19892;border:none">确 定</el-button>
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "MainBox",
    inject:['reload'],
    methods: {

      // 查看班级成员
      showMember(cla) {
        let id = cla.cid;
        this.$router.push({
          path: '/adm/a-clacheck',
          query: {
            cid: id
          }
        })
      },

      // 新建班级
      createOrder() {
        let data = this.create;
        console.log(JSON.stringify(data));

        let info = "name="+data.name+"&major="+data.major+"&year="+data.year+"&college="+data.college;
        this.$ajax({
          method: "GET",
          url: 'http://localhost:8088/xyl/addClass?'+info,
        }).then(response=> {
          console.log(data);
          console.log(response);
          this.dialogCreateVisible=false;
          this.open2();
        }).catch(function (error){
          console.log(error)
        });
      },
      setCurrent(currentOrder) {
        console.log(currentOrder);
        this.update.major = currentOrder.major;
        this.update.college = currentOrder.college;
        this.update.name = currentOrder.name;
        this.update.year = currentOrder.year;
        this.update.cid = currentOrder.cid;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      updateOrder() {
        console.log("确定编辑班级信息");
        this.dialogUpdateVisible = false;

        let data = this.update;
        console.log(JSON.stringify(data));

        let info = "name="+data.name+"&major="+data.major+"&year="+data.year+"&college="+data.college+"&cid="+data.cid;
        this.$ajax({
          method: "GET",
          url: 'http://localhost:8088/xyl/updateCla.do?'+info,
        }).then(response=> {
          console.log(data);
          console.log(response);
          this.dialogCreateVisible=false;
          this.open4();
        }).catch(function (error){
          console.log(error)
        });
      },
      // 删除订单
      removed(currentOrder) {
        console.log("删除班级");
        this.$confirm(
          "此操作将删除该班级信息 " + currentOrder.orderId + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认删除班级");
          // 向请求服务端删除
          let cid = currentOrder.orderId;
          console.log(orderId);
          this.$ajax.get('http://localhost:8088/xyl/deleteCla.do'+cid,).then(response=> {
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
          message: '已成功删除该班级的信息',
          type: 'success'
        });
        this.reload();
      },
      open2() {
        this.$message({
          message: '已成功新建班级',
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
      open4() {
        this.$message({
          message: '已成功修改班级信息',
          type: 'success'
        });
        this.reload();
      },
    },
    mounted(){
      // 加载数据
      console.log("loading data.")
      this.$ajax({
        method:'get',
        url:'http://localhost:8088/xyl/glClass',
      }).then(response=>{
        this.update.clazz = response.data;

        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          this.ClassInfo.push(response.data[i]);
        }
      });
    },
    data() {
      return {
        dialogCreateVisible: false,
        dialogUpdateVisible: false,
        create: {
          name: "",
          year: "",
          college: "",
          major: "",
          cid: "",
        },
        update: {
          name: "",
          year: "",
          college: "",
          major: "",
          cid: ""
        },

        ClassInfo: []
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
