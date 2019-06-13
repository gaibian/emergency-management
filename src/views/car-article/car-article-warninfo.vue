<template>
<div class="car-collection-box main-page" ref="mainContainer">
    <div class="table-box">
        <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
        <el-table-column  label="车辆编号"  prop="plate"></el-table-column>
            <el-table-column  label="车牌号"  prop="carnum"></el-table-column>
            <el-table-column  label="设备名称" minWidth = 200px>
                <template slot-scope="scope">
                    <el-tag :key="tag" v-for="tag in scope.row.spname" @close="handleClose(tag)">{{tag}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column  label="状态"  prop="status"></el-table-column>
            <el-table-column  label="告警描述"  prop="gjinfo"></el-table-column>
        </el-table>
        <div ref="btmGroup" class="btm-group">
            <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
        </div>
    </div>
    </div>
</template>
<script>
// import selectCar from '@/components/selectCar'
import { setTimeout } from 'timers';
import Pagination from '@/components/Pagination'
export default {
    name: 'carArticleWarninfo',
    components:{
        Pagination,
    },
    data() {
        return {
            flag:false,
             total:30,
            tableData:[],
            tableHeight:null,
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id',
                spname:[],
            },
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
                spname:['软担架', '氧气瓶', '铲式担架','心电除颤仪'],
                status: '未处理'
            })
        }
    },
    methods:{
        handleClose(tag) {
        this.spname.splice(this.spname.indexOf(tag), 1);
      },
        handlePag(data) {
            setTimeout(() => {
                this.tableLoading = false;
            }, 2000);
            console.log(data)
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
.table-box{
    padding:12px;
    box-sizing:border-box;
    background:#fff;
    border-radius:6px;
    overflow:hidden;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
</style>