<template>
  <div>
    <div class="mainBox">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:25px">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>留言浏览</el-breadcrumb-item>
        <el-breadcrumb-item><b>查看当前留言</b></el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20" class="orderTitle">
        <!--标题-->
        <el-col :span="2.5">
          <b>
            <i class="el-icon-document"></i>
          </b>
          <span>
          <b>留言板</b>
        </span>
        </el-col>
      </el-row>
      <!-- 留言汇总 -->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="序号：">
                    <span>{{ props.row.lid }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="留言人：">
                    <span>{{ props.row.xyByLyxid.name }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="时间：">
                    <span>{{ moment(props.row.lydate).format('YYYY-MM-DD HH:mm:ss')}}</span>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="内容：">
                    <span>{{ props.row.info }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      <div class="board">
        <el-row :gutter="20" class="orderTitle" style="margin-top:3%;">
          <el-col :span="2.5">
            <b>
              <i class="el-icon-edit"></i>
            </b>
            <span>
          <b>留言</b>
        </span>
          </el-col>
        </el-row>
        <el-row class="board" style="margin-top:1%;">
          <el-col :span="2.5">
        <span>
          <b>请输入你想发表的内容：</b>
        </span>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea"
      style="margin-top:2%;"
      rows="6">
    </el-input>
    <el-col :span="1"  style="margin-left:93%;margin-top:3%;">
      <el-button type="info" @click="ToComment" style="background:#C19892;border:none">发表</el-button>
    </el-col>
  </div>
</template>

<script>
  import moment from 'moment'
  import {setCookie,getCookie} from '../../assets/js/cookie.js'
  export default {
    name: "s-comment",
    inject:['reload'],
    methods: {
      moment:moment,
      ToComment(){
        var comment=encodeURI(this.textarea)
        let data = {'lyxyname':this.lyxyname,'info':comment}
        console.log(data);
        this.$http.post('http://127.0.0.1:8088/xyl/addLy.do',data
        ).then(response => {
          console.log(response);

          /*加时间线*/
          var des=encodeURI("发表评论:  ")+comment;
          let timedate={'xyname':this.lyxyname,'type':2,'description':des}
          this.$http.post('http://127.0.0.1:8088/xyl/addTimeline',timedate).then(response => {
            console.log(response);
          });

          this.open1();
        }).catch(function (error) {
          console.log("save failed！")
        });
      },
      open1(){
        this.$message({
          message:'留言成功，等待审核',
          type:'success'
        });
        this.reload();
      }
    },
    mounted(){
      // 加载数据
      console.log("loading data.")
      this.$ajax({
        method:'get',
        url:'http://127.0.0.1:8088/xyl/xyGetAllLy',
      }).then(response=>{
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          if(response.data[i].state===1)response.data[i].state="已审核";
          else response.data[i].state="未审核";
          this.tableData.push(response.data[i]);
        }
      });
    },
    data() {
      return {
        lyxyname:getCookie("xyusername"),
        update: {
          orderId: "",
          orderSource: "",
          totalPrice: "",
          remark: ""
        },
        tableData: [],
        textarea: ''

      }
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
  .board {
    font-size: 20px;
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
