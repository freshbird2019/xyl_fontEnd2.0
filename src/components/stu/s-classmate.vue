<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级浏览</el-breadcrumb-item>
      <el-breadcrumb-item><b>查看班级成员</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>班级成员信息</b>
        </span>
      </el-col>
    </el-row>

    <el-table
      :data="ClassmateInfo"
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
</template>

<script>
  import {getCookie} from "../../assets/js/cookie";

  export default {
    name: "s-classmate",
    inject: ['reload'],
    methods: {
    },

    mounted() {
      // 加载数据
      let name=this.xyname;
      console.log(name);
      this.$http.post('http://localhost:8088/xyl/getXyByname?xyname='+name).then(res=> {
        console.log(res.data);
        console.log("ok");
        this.nowxy=res.data;

        let cid=this.nowxy.clazzByClassid.Cid;
        console.log(cid)
        console.log("loading data.")

        this.$ajax.get('http://localhost:8088/xyl/displayMember?id='+cid).then(response=> {
          console.log(response.data);
          for(let i= 0; i<response.data.length;i++) {
            if(response.data[i].state===2)
              this.ClassmateInfo.push(response.data[i]);
          }
        });

      });
    },
      data() {
        return {
          nowxyclass:"",
          nowxy:{},
          xyname:getCookie("xyusername"),
         ClassmateInfo: [],
        };
      }

  }
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
