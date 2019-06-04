<template>
    <div class="gis-info-container">
        <!-- <div class="choice-btn" @click="handleClick">车辆信息</div> -->
        <!-- <select-car :flag="flag" @change="handleChange"></select-car>
        <car-collection></car-collection> -->
        <el-table :data="tableData" style="width: 30%; position: absolute; z-index: 1; right:15px; box-shadow: 0px 0px 10px #fab8b8; top:15px;">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="物品名称：">
            <span>{{ props.row.spname }}</span>
          </el-form-item>
          <el-form-item label="状态:">
            <div>{{ props.row.state }}</div>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column  label="车辆编号"  prop="num"></el-table-column>
    <el-table-column  label="车牌号"  prop="carnum"></el-table-column>
    <el-table-column  label="急救中心"  prop="jijiu"></el-table-column>
    <el-table-column  label="异常数量"  prop="abnormal"></el-table-column>
  </el-table>
        <div id="container"></div>
    </div>
</template>
<script>
// import selectCar from '@/components/selectCar'
import { setTimeout } from 'timers';
export default {
    name: 'gisInfo',
    data() {
        return {
            flag:false,
            map:null,
            tableData:[],
        }
    },
    created() {
        this.$store.dispatch('setPageLoading',true)
    },
    mounted() {
        this.map = new AMap.Map('container',{
            zoom:18,
            center:[120.15,30.28],
            viewMode: '2D',  //设置地图模式
            lang:'zh_cn',  //设置地图语言类型
        });
        this.map.on('complete', () => {
            // 地图图块加载完成后触发
            this.$store.dispatch('setPageLoading',false)
            this.init();
        });
    },
    destroyed() {
        console.log('注销了GIS')
        this.map.destroy();
    },
    created() {
        this.tableLoading = false;
        for(let i=0;i<2;i++){
            this.tableData.push({
               num: '030',
          carnum: '浙B01110',
          jijiu: '中医院急救点',
          abnormal:'1',
          spname: '软担架',
          state: '不在位'
            })
        }
    },
    methods:{
        init() {
            let marker = new AMap.Marker({
                position:[121.56,29.88],
                icon: require('../../assets/j-car.png')
            })
            this.map.add(marker)
        },
        handleClick() {
            this.flag = true;
        },
        handleChange(data) {
            if(data.keys) {
                console.log(data.keys)
            }
            this.flag = data.flag
        }
    }
}
</script>
<style lang="scss" scoped>
.gis-info-container{
    position:relative;
    width:100%;
    height:calc(100vh - 84px);
    color:#ccc;
}
.choice-btn{
    position:fixed;
    top:320px;
    right:0;
    z-index:99;
    padding:0 12px;
    height:44px;
    line-height:44px;
    background:rgb(24, 144, 255);
    font-size:16px;
    color:#fff;
    border-radius:6px 0px 0px 6px;
    cursor: pointer;
}
#container{
    width:100%;
    height:100%;
}
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    color: #F56C6C
  }
</style>
