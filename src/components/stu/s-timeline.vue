<template>
  <div id="app">
    <el-carousel :interval="2000" type="card" height="300px" >
      <el-carousel-item v-for="item in ImgUrl" :key="item">
        <img v-bind:src="item" style="width:800px"/>
      </el-carousel-item>
    </el-carousel>
      <div class="demo">
      <div class="demo-them light">
        <timeline timeline-theme="lightblue">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column >
              <template slot-scope="props">
                <timeline-item bg-color="#9dd8e0" font-color="#e166ab">{{ moment(props.row.ttime).format('YYYY-MM-DD HH:mm:ss')}}</timeline-item>
                <timeline-item bg-color="#b0e6d1" icon-size="medium">{{props.row.description}}</timeline-item>
              </template>
            </el-table-column>
          </el-table>
        </timeline>
      </div>
    </div>
  </div>
</template>

<script>
  import { Timeline, TimelineItem, TimelineTitle } from '../../assets/js/timelinee.js'
  import moment from 'moment'
  import {getCookie} from "../../assets/js/cookie";
    export default {
        name: "s-timeline",
      components: {
        Timeline,
        TimelineItem,
        TimelineTitle
      },
      mounted(){
        // 加载数据
        let name=this.xyname;
        console.log("loading data.")
        this.$http.post('http://localhost:8088/xyl/getTimeline?xyname='+name
        ).then(response=>{
          console.log(response.data);
          for(let i= 0; i<response.data.length;i++) {
            this.tableData.push(response.data[i]);
          }
        });
      },
      methods: {
        moment: moment
      },
      data() {
        return {
          ImgUrl:[
            '/static/1.jpg','/static/2.jpg','/static/3.jpg','/static/4.jpg'
          ],
          xyname:getCookie("xyusername"),
          tableData: [],
        };
      },
    }

</script>

<style scoped>
  .append {
    font-size: .8em;
    margin-top: 3px;
    color: #646C7C;
  }

  a {
    color: #bf6dcf;
    font-weight: bold;
    text-decoration: none;
  }

  .icon-heart {
    width: 20px;
  }

  .demo {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-gap: 1rem;
  }

  .demo-theme.dark {
    background: #3a3939;
  }

  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
</style>

