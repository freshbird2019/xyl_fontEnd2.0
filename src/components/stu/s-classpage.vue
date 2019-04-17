<template>
  <div class="mainBox">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
      <el-breadcrumb-item >首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级浏览</el-breadcrumb-item>
      <el-breadcrumb-item><b>班级信息查看</b></el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="orderTitle">
      <!--标题-->
      <el-col :span="2.5">
        <b>
          <i class="el-icon-document"></i>
        </b>
        <span>
          <b>班级信息查看</b>
        </span>
      </el-col>
    </el-row>
    <!-- 班级汇总 -->
    <el-input v-model="search" placeholder="请输入你要查找的班级"  prefix-icon="el-icon-search" style="width:60%;margin-top:10px;margin-bottom:10px"
    ></el-input>
      <el-table
        :data="tables"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="班级名称">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="班级人数">
                <span >{{props.row.number}}</span>
              </el-form-item>
              <el-form-item label="年份">
                <span>{{props.row.year}}</span>
              </el-form-item>
              <el-form-item label="专业">
                <span>{{props.row.major}}</span>
              </el-form-item>
              <el-form-item label="学院">
                <span>{{props.row.college}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="班级号"
          prop="cid">
        </el-table-column>
        <el-table-column
          label="班级名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="年份"
          prop="year">
        </el-table-column>
        <el-table-column
          label="专业"
          prop="major">
        </el-table-column>
        <el-table-column
          label="学院"
          prop="college">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="desc">
          <template slot-scope="scope">
            <el-button type="info"  size="mini" @click="applyClass(scope.row)"style="background:#C19892;border:none">申请</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import {setCookie,getCookie} from '../../assets/js/cookie.js'
  export default {
    name: "MainBox",
    inject:['reload'],
    methods: {
      applyClass(currentClass) {
        let data = {'xyname':this.xyname,'classid':currentClass.cid}
        console.log(data);
        this.$http.post('http://127.0.0.1:8088/xyl/applyClass',data
        ).then(response => {
          console.log(response);
          this.open1();

          /*加时间线*/
          var des=encodeURI("申请加入班级:  ")+currentClass.year+encodeURI("届 ")+currentClass.college+currentClass.major+currentClass.name;
          let timedate={'xyname':this.xyname,'type':5,'description':des}
          this.$http.post('http://127.0.0.1:8088/xyl/addTimeline',timedate).then(response => {
            console.log(response);
          });

        }).catch(function (error) {
          console.log("apply failed！")
        });
      },
      open1(){
        this.$message({
          message:'申请成功，等待审核',
          type:'success'
        });
      }
      },
    mounted(){
      // 加载数据
      console.log("loading data.")
      this.$ajax({
        method:'get',
        url:'http://localhost:8088/xyl/glClass',
      }).then(response=>{
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          let id=response.data[i].cid;
          this.$ajax.get('http://localhost:8088/xyl/getClassNumById?classid='+id).then(res =>{
            response.data[i].number=res.data
          })
          this.tableData.push(response.data[i]);
        }
      });
    },
    data() {
      return {
        search:'',
        xyname:getCookie("xyusername"),
        tableData: []
        }
      },
    computed: {
      tables () {
        const search = this.search
        if (search) {
          console.log('this.tableData', this.tableData)
          return this.tableData.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        console.log('this.tableData', this.tableData)
        return this.tableData
      }
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
