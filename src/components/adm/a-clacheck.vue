<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理班级成员</el-breadcrumb-item>
      <el-breadcrumb-item><b>已审核成员</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>班级成员列表</b>
        </span>
      </el-col>
    </el-row>

    <!-- 已审核班级成员 -->
    <el-table :data="xyInfo" border>
      <el-table-column prop="xid" label="学号" align="center"></el-table-column>
      <el-table-column prop="clazzByClassid.cid" label="班级" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <!--<el-button-->
            <!--type="primary"-->
            <!--size="mini"-->
            <!--icon="el-icon-setting"-->
            <!--@click="setCurrent(scope.row)"-->
          <!--&gt;编辑</el-button>-->
          <el-button type="danger" size="small" icon="el-icon-delete" @click="removed(scope.row)">踢出班级</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改成员信息 -->
    <el-dialog
      title="修改成员信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form id="#update" :model="update" ref="update" label-width="100px">
        <el-form-item label="学号" prop="xid">
          <el-input v-model="update.xid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="update.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="totalPrice">
          <el-input v-model="update.sex"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="update.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateOrder">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "MainBox",
    inject:['reload'],
    methods: {
      setCurrent(currentOrder) {
        console.log(currentOrder);
        this.update.xid = currentOrder.xid;
        this.update.name = currentOrder.name;
        this.update.sex = currentOrder.sex;
        this.update.phone = currentOrder.phone;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      updateOrder() {
        console.log("确定编辑班级成员信息");
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
            })
        })
      },
      // 将同学从班级中踢出，状态变为0
      removed(currentOrder) {
        console.log("踢出班级");
        let id = currentOrder.xid;
        this.$confirm(
          "此操作将该同学提出班级 " + id + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认踢出该同学");
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
          message: '已将该同学信息踢出班级',
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
      // 获取班级id
      let cid = this.$route.query.cid;
      console.log(cid)
      console.log("loading data.")

      this.$ajax.get('http://localhost:8088/xyl/displayMember?id='+cid).then(response=> {
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          if(response.data[i].state==2)
            this.xyInfo.push(response.data[i]);
          else
            this.checkXy.push(response.data[i]);
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
          clazz: []
        },
        update: {
          xid: "",
          name: "",
          sex: "",
          phone: "",
          mail: "",
          clazz: []
        },
        xyInfo: [],
        checkXy:[]
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
