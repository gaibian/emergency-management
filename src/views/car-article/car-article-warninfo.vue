<template>
    <div class="gis-info-container">
        <!-- <div class="choice-btn" @click="handleClick">车辆信息</div> -->
        <!-- <select-car :flag="flag" @change="handleChange"></select-car>
        <car-collection></car-collection> -->
        <el-table :data="tableData" border style="width: 30%; position: absolute; z-index: 1; right:15px; box-shadow: 0px 0px 15px #f7caca; top:15px;">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="设备名称：">
                        <span>{{ props.row.spname }}</span>
                    </el-form-item>
                    <el-form-item label="状态:">
                        <div>{{ props.row.status }}</div>
                    </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column  label="车辆编号"  prop="plate" width="100px"></el-table-column>
            <el-table-column  label="车牌号"  prop="carnum"></el-table-column>
            <el-table-column  label="告警描述"  prop="gjinfo"></el-table-column>
        </el-table>
        <div id="container"></div>
    </div>
</template>
<script>
// import selectCar from '@/components/selectCar'
import { setTimeout } from 'timers';
export default {
    name: 'carArticleWarninfo',
    data() {
        return {
            flag:false,
            tableData:[],
        }
    },
    created() {
        this.$store.dispatch('setPageLoading',true)
    },
    created() {
        this.tableLoading = false;
        for(let i=0;i<4;i++){
            this.tableData.push({
                plate: '030',
                carnum: '浙B01110',
                gjinfo: '告警信息告警信息告警信息',
                spname:"软担架,氧气瓶,铲式担架",
                status: ["未处理","未处理","未处理"],
            })
        }
    },
    methods:{
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