<template>
<div class="car-collection-box main-page" ref="mainContainer">
    <div class="table-box">
        <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
        <!-- <el-table-column  label="车辆编号"  prop=""></el-table-column> -->
        <el-table-column  label="中心信息"  prop="centerInfoName"></el-table-column>
        <el-table-column  label="车牌号"  prop="carNumber"></el-table-column>
        <el-table-column  label="车编号"  prop="carNo"></el-table-column>
        <el-table-column  label="设备名称" prop="deviceName"></el-table-column>
        <el-table-column  label="状态"  prop="status">
            <template slot-scope="scope">
                <el-tag :type="statusTag(scope.row.status)">{{scope.row.status | statusFilter}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column  label="告警描述"  prop="remark"></el-table-column>
        <el-table-column  label="操作">
            <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div ref="btmGroup" class="btm-group">
            <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
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
    filters:{
        statusFilter(value) {
            switch(value){
                case 0:
                return '未处理';
                break;
                case 1:
                return '已处理';
                break;
                case 2:
                return '忽略';
                break;
            }
        }
    },
    data() {
        return {
            total:30,
            tableLoading:true,
            tableData:[],
            tableHeight:null,
            deviceName:[],
            queryForm: {
                page:1,
                size:10
            },
        }
    },
    created() {
        this.handlePag();
    },
    methods:{
        statusTag(value) {
            switch(value){
                case 0:
                return 'danger';
                break;
                case 1:
                return '';
                break;
                case 2:
                return 'info';
                break;
            }
        },
        handleDelete(id) {
            this.$confirm('确定删除该信息?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.carWare.carWareDeletes(id).then(res => {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.handlePag();

                })
            })
        },
        handlePag() { 
            this.tableLoading = true;
            this.$api.carWare.carWareList(this.queryForm).then(res => {
                this.tableData = res.data.records
                this.total = res.data.total;
                this.$store.dispatch('setCarWareNum',this.total);
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