<template>
  <div>
    <!--<div v-for="item in ly" :key="item">-->
      <!--<el-col :span="20" style="margin: 5px">-->
        <!--<el-card shadow="hover">-->
          <!--{{item.info}}-->
        <!--</el-card>-->
      <!--</el-col>-->
    <!--</div>-->


    <router-view v-if="isRouterAlive">

    </router-view>
  </div>
</template>

<script>
export default {
  name: "MainBox",
  data() {
    return {
      msg: "欢迎使用校友录",
      isRouterAlive:true,
      ly:[],
      ImgUrl:[
        '/static/1.jpg','/static/2.jpg','/static/3.jpg','/static/4.jpg'
      ],
    };
  },
  provide(){
    return{
      reload:this.reload,
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(()=>(this.isRouterAlive=true));
    }
  },
  mounted(){
    console.log("ly")
    this.$ajax({
      method:'get',
      url:'http://localhost:8088/xyl/xyGetAllLy',
    }).then(response=>{
      console.log(response.data);
      for(let i= 0; i<response.data.length;i++) {
        if(response.data[i].best ==1)
          this.ly.push(response.data[i]);
      }
    });
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

 .el-carousel__item h3 {
   color: #475669;
   font-size: 14px;
   opacity: 0.75;
   line-height: 200px;
   margin: 0;
   width:800px

 }

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
