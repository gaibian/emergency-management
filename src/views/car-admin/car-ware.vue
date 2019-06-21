<template>
<div class="car-collection-box main-page" ref="mainContainer">
    <div class="table-box">
        <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
        <!-- <el-table-column  label="车辆编号"  prop=""></el-table-column> -->
        <el-table-column  label="车牌号"  prop="carInfoId"></el-table-column>
        <el-table-column  label="设备名称" minWidth = 200px>
            <template slot-scope="scope">
                <el-tag :key="tag" v-for="tag in scope.row.deviceName" @close="handleClose(tag)">{{tag}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column  label="状态"  prop="status"></el-table-column>
        <el-table-column  label="告警描述"  prop="remark"></el-table-column>
        </el-table>
        <div ref="btmGroup" class="btm-group">
            <pagination :total="total" v-show="total > 0" :page.sync="queryForm.pageIndex" :limit.sync="queryForm.pageSize" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
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
            total:30,
            tableLoading:true,
            tableData:[],
            tableHeight:null,
            deviceName:[],
            queryForm: {
                pageIndex:1,
                pageSize:10
            },
        }
    },
    created() {
        this.handlePag();
    },
    methods:{
        handleClose(tag) {
        this.deviceName.splice(this.deviceName.indexOf(tag), 1);
      },
        handlePag() { 
            this.tableLoading = true;
            this.$api.carWare.carWareList(this.queryForm).then(res => {
                console.log(res)
                this.tableData = res.data.list
                this.total = res.data.total;
                this.tableLoading = false;
            })
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