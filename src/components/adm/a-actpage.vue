<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item><b>查看活动信息</b></el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>活动信息汇总</b>
        </span>
      </el-col>
    </el-row>

    <!-- 活动汇总 -->
    <el-table :data="activityInfo" border>
      <el-table-column prop="aid" label="活动编号" align="center"></el-table-column>
      <el-table-column prop="name" label="主题" align="center"></el-table-column>
      <el-table-column prop="num" label="人数" align="center"></el-table-column>
      <el-table-column prop="description" label="内容" align="center"></el-table-column>
      <el-table-column prop="time" label="时间" align="center"></el-table-column>
      <el-table-column prop="location" label="地点" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-setting"
            @click="setCurrent(scope.row)"
          >修改</el-button>
          <!--<el-button type="danger" size="small" icon="el-icon-delete" @click="removed(scope.row)">删除</el-button>-->
          <el-button type="danger" size="small" icon="el-icon-delete" @click="showInfo(scope.row)">成员</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-col :span="1"  style="margin-left:89%;margin-top:3%;">
      <el-button type="info" @click="dialogCreateVisible = true" style="background:#C19892;border:none">发起新活动</el-button>
    </el-col>
    <!-- 新建活动 -->
    <el-dialog title="发起新活动" :visible.sync="dialogCreateVisible"width="30%" align="center">
      <el-form id="#create" :model="create" ref="create" label-width="100px">
        <el-form-item label="主题" prop="name">
          <el-input v-model="create.name"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="num">
          <el-input v-model="create.num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="description">
          <el-input v-model="create.description" ></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-input v-model="create.time" ></el-input>
        </el-form-item>
        <el-form-item label="地点" prop="location">
          <el-input v-model="create.location"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="createOrder"style="background:#C19892;border:none">确 定</el-button>
        <el-button @click="dialogCreateVisible = false">取 消</el-button>

      </div>
    </el-dialog>

    <!-- 修改活动信息 -->
    <el-dialog
      title="修改活动信息"
      :visible.sync="dialogUpdateVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form id="#update" :model="update" ref="update" label-width="100px">
        <el-form-item label="活动编号" prop="aid">
          <el-input v-model="update.aid"></el-input>
        </el-form-item>
        <el-form-item label="主题" prop="name">
          <el-input v-model="update.name"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="num">
          <el-input v-model="update.num"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="description">
          <el-input v-model="update.description"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-input v-model="update.time" ></el-input>
        </el-form-item>
        <el-form-item label="地点" prop="location">
          <el-input v-model="update.location" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateOrder"style="background:#C19892;border:none">确 定</el-button>
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

      // 获取活动报名人信息
      showInfo(ac) {
        let id = ac.aid;
        this.$router.push({
          // 你要跳转的地址
          path: '/adm/a-actcheck',
          query: {
            aid: id
          }
        });

      },

      // 新建活动
      createOrder() {
        let data = this.create;
        console.log(data);
        let info = "name="+data.name+"&time="+data.time+"&num="+data.num+"&description="+data.description+"&location="+data.location;
        this.$http.post('http://localhost:8088/xyl/addAc.do?'+info).then(response=> {
          console.log(response);
          this.dialogCreateVisible=false;
          this.open2();
        }).catch(function (error){
          console.log("save failed！")
        });
      },
      setCurrent(currentOrder) {
        console.log(currentOrder);
        this.update.aid = currentOrder.aid;
        this.update.time = currentOrder.time;
        this.update.name = currentOrder.name;
        this.update.num = currentOrder.num;
        this.update.description = currentOrder.description;
        this.update.location = currentOrder.location;
        this.dialogUpdateVisible = true;
        console.log(this.dialogUpdateVisible);
      },
      updateOrder() {
        console.log("确定编辑活动信息");
        let data = this.update;

        let info = "aid="+data.aid+"&name="+data.name+
          "&time="+data.time+"&location="+data.location+
          "&description="+data.description+"&num="+data.num;

        console.log(info);
        this.$http.get('http://localhost:8088/xyl/updateAc?'+info,).then(response=> {
          console.log(response);
          if(response.data){
            this.open4();
          }
        }).catch(function (error){
          console.log("delete failed！")
        });

        this.dialogUpdateVisible = false;
      },
      // 删除订单
      removed(currentOrder) {
        console.log("删除此活动");
        console.log(currentOrder.aid);
        this.$confirm(
          "此操作将删除此活动信息 " + currentOrder.aid + ", 是否继续?",
          "提示",
          {
            type: "warning"
          }
        ).then(() => {
          console.log("确认删除活动");
          // 向请求服务端删除
          let orderId = currentOrder.aid;
          console.log(orderId);
          this.$ajax.get('http://localhost:8088/xyl/deleteAc.do?id='+orderId,).then(response=> {
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
          message: '已成功删除此活动',
          type: 'success'
        });
        this.reload();
      },
      open2() {
        this.$message({
          message: '已成功添加活动',
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
          message: '已成功修改活动',
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
        url:'http://localhost:8088/xyl/activityPg',
      }).then(response=>{
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          this.activityInfo.push(response.data[i]);
        }
      });
    },
    data() {
      return {
        dialogCreateVisible: false,
        dialogUpdateVisible: false,
        url: "http://localhost:8099/ThirdDemo/",
        create: {
          aid: "",
          name: "",
          time: "",
          location: "",
          num: "",
          description: ""
        },
        update: {
          aid: "",
          name: "",
          time: "",
          location: "",
          num: "",
          description: ""
        },
        activityInfo: [],
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
