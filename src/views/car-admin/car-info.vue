<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <!-- <select-car :flag="flag" :radio="true" @change="handleChange"></select-car> -->
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加车辆</el-button>
                <div class="filter-item" style="width:300px;">
                    <el-input v-model="queryForm.carNo" placeholder="车牌号">
                        <el-button slot="append" icon="el-icon-search">选择车辆查询</el-button>
                    </el-input>
                </div>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="所属中心" prop="centerInfoId"></el-table-column>
                <el-table-column label="车牌号" prop="carNo"></el-table-column>
                <el-table-column label="车编号" prop="carNumber"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="'edit'" style="font-size:18px;cursor:pointer;margin-right:8px;color:#409EFF" @click="handleEdit(scope.row.id)">编辑</svg-icon>
                        <svg-icon :icon-class="'delete'" style="font-size:18px;cursor:pointer;color:#F56C6C" @click="handleDelete(scope.row.id)">删除</svg-icon>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.pageIndex" :limit.sync="queryForm.pageSize" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
            <!-- 编辑 -->
            <el-dialog title="车辆信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
                <opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></opate>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import selectCar from '@/components/selectCar'
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import opate from './component/car-opate'
// 导入车辆管理的api模块
import { carAdmin } from '@/api'


export default {
    name:'carAdmin',
    components:{
        selectCar,
        Pagination,
        opate
    },
    mixins:[pageMixins],
    data() {
        return {
            total:30,
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            editFlag:false,
            editId:'',
            tableData:[],
            queryForm:{
                centerInfoId:'',
                carNumber:'',
                carNo:'',
                pageIndex:1,  // 第几个
                pageSize:10,  // 一页多少数据
            },
        }
    },
    created() {
        // 默认加载列表
        this.handlePag();
    },
    methods:{
        handleOpate(boo){
            if(boo) {
                this.handlePag();
            }
            this.dialogFormVisible = false;
        }, 
        handleAdd() {
            this.dialogFormVisible = true;
        },
        handleDelete(id) {
            this.$confirm('确定删除该车辆?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                carAdmin.carDeletes(id).then(res => {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.handlePag();

                })
            })
        },
        handlePag() {  //初始化加载列表 或者是更新列表
            this.tableLoading = true;
            carAdmin.carList(this.queryForm).then(res => {
                console.log(res)
                this.tableData = res.data.list
                this.total = res.data.total;
                this.tableLoading = false;
            })
        },
        // 编辑
        handleEdit(id) {
        this.dialogFormVisible = true;
        this.editFlag = true;
        this.editId = id
      },
    }
}
</script>
<style lang="scss" scoped>
.car-admin-container{
    width:100%;
    height:100%;
    font-size:16px;
    color:#333;
}
.table-box{
    padding:12px;
    box-sizing:border-box;
    background:#fff;
    border-radius:6px;
    overflow:hidden;
}
.btm-group{
    padding-top:12px;
    box-sizing: border-box;
}
.top-info-box{
    width:100%;
}
</style>
