<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动浏览</el-breadcrumb-item>
      <el-breadcrumb-item><b>当前活动信息</b></el-breadcrumb-item>
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
            @click="applyAc(scope.row)"
          >报名参加</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-col :span="1"  style="margin-left:89%;margin-top:3%;">
      <el-button type="info" @click="dialogCreateVisible = true" style="background:#C19892;border:none">发起新活动</el-button>
    </el-col>

    <!-- 新建活动 -->
    <el-dialog title="发起新活动" :visible.sync="dialogCreateVisible"label-width="100px"align="center">
      <el-form id="#create" :model="create" ref="create" label-width="100px">
        <el-form-item label="主题" prop="name">
          <el-input v-model="create.name"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="num">
          <el-input v-model="create.num"  auto-complete="off"></el-input>
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
        <el-button type="primary" @click="createAc"style="background:#C19892;border:none">确 定</el-button>
        <el-button @click="dialogCreateVisible = false">取 消</el-button>

      </div>
    </el-dialog>


  </div>
</template>

<script>
    import {getCookie} from "../../assets/js/cookie";

    export default {
        name: "s-actpage",
      methods: {
        // 新建活动
        createAc() {
          let data = this.create;
          console.log(data);
          let info = "name="+data.name+"&time="+data.time+"&num="+data.num+"&description="+data.description+"&location="+data.location;
          this.$http.post('http://localhost:8088/xyl/addAc.do?'+info).then(response=> {
            console.log(response);
            this.dialogCreateVisible=false;

            /*加时间线*/
            var des=encodeURI("发起活动:  "+data.time+data.name);
            let timedate={'xyname':this.xyname,'type':4,'description':des}
            this.$http.post('http://127.0.0.1:8088/xyl/addTimeline',timedate).then(response => {
              console.log(response);
            });

            this.open2();
          }).catch(function (error){
            console.log("save failed！")
          });
        },
        applyAc(currentAc){
          let data = {'aid':currentAc.aid,'xyname':this.xyname}
          console.log(data);
          this.$http.post('http://127.0.0.1:8088/xyl/joinAc',data).then(response=> {
            console.log(response);

            /*加时间线*/
            var des=encodeURI("参与活动:  "+currentAc.time+currentAc.name);
            let timedate={'xyname':this.xyname,'type':4,'description':des}
            this.$http.post('http://127.0.0.1:8088/xyl/addTimeline',timedate).then(response => {
              console.log(response);
            });

            this.open1();
          }).catch(function (error){
            console.log("save failed！")
          });
        },
        open1() {
          this.$message({
            message: '报名成功，不准咕咕咕哦',
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
          xyname:getCookie('xyusername'),
          dialogCreateVisible: false,
          create: {
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
    }
</script>

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
