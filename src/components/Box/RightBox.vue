<template>
  <div class="RightBox">
     <span  style="margin-left:15px;">
        <b  >
          <i style="font-size: 25px;" class="el-icon-bell"></i>
        </b>
        <font size="5">活动提醒</font>
        </span>
    <el-table
      :data="acInfo"
      background-color="#B68C8C"
      style="width: 90%;margin-left:15px;margin-top:15px;border-radius:4px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column
        prop="time"
        label="日期"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="活动名称">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'table',
    data() {
      return {
        acInfo: []
      }
    },
    created() {
    },
    methods: {
      // 修改table tr行的背景色
      tableRowStyle({row, rowIndex}) {
        return 'background-color: #B68C8C'
      },
      // 修改table header的背景色
      tableHeaderColor({row, column, rowIndex, columnIndex}) {
        if (rowIndex === 0) {
          return 'background-color:#B68C8C;color: #fff;font-weight: 500;'
        }
      }
    },
    mounted(){
      // 加载数据
      console.log("loading data.")
      this.$ajax({
        method:'get',
        url:'http://127.0.0.1:8088/xyl/activityPg',
      }).then(response=>{
        console.log(response.data);
        for(let i= 0; i<response.data.length;i++) {
          this.acInfo.push(response.data[i]);
        }
      });
    },
  }

</script>

<style lang="" >
  .el-table a{
    text-decoration: none;
    border-radius: 4px;
    background-color:#B68C8C;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #B68C8C !important;
  }

</style>

