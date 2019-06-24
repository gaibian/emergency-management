<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加车辆</el-button>
                <el-input class="filter-item" style="width:200px;" v-model="queryForm.carNo" placeholder="请输入车编号"></el-input>
                <el-input class="filter-item" style="width:200px;" v-model="queryForm.carNumber" placeholder="请输入车牌号"></el-input>
                <el-button class="filter-item" type="primary" @click="handleQuery">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="所属中心" prop="centerInfoName"></el-table-column>
                <el-table-column label="车牌号" prop="carNumber"></el-table-column>
                <el-table-column label="车编号" prop="carNo"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-tag :type="carStatus(scope.row.status)">{{scope.row.status | statusFilter}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
            <!-- 编辑 -->
            <el-dialog title="车辆信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="handleClose">
                <opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></opate>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import opate from './component/car-opate'
export default {
    name:'carAdmin',
    components:{
        Pagination,
        opate
    },
    mixins:[pageMixins],
    filters:{
        statusFilter(value) {
            switch(value) {
                case 0:
                    return '未上班/下班'
                    break;
                case 1:
                    return '任务中'
                    break;
                case 2:
                    return '待命中'
                    break;
            }
        }
    },
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
                page:1,  // 第几个
                size:10,  // 一页多少数据
            },
        }
    },
    created() {
        // 默认加载列表
        this.handlePag();
    },
    methods:{
        handleQuery() {
            this.handlePag()
        },
        handleClose(){
            this.dialogFormVisible = false;
            this.editFlag = false;
            this.editId = '';
        },
        carStatus(status) {
            switch(status) {
                case 0:
                    return 'info'
                    break;
                case 1:
                    return ''
                    break;
                case 2:
                    return 'success'
                    break;
            }
        },
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
                this.$api.carAdmin.carDeletes(id).then(res => {
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
            this.$api.carAdmin.carPage(this.queryForm).then(res => {
                this.tableData = res.data.records
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
