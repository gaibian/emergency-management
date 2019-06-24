<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <el-input class="filter-item" style="width:200px;" v-model="queryForm.hostNumber" placeholder="请输入主机编号"></el-input>
                <el-date-picker class="filter-item" v-model="queryTime" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                <el-button class="filter-item" type="primary" @click="handleQuery">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="主机编号" prop="hostNumber"></el-table-column>
                <el-table-column label="操作事件" prop="operEvent"></el-table-column>
                <el-table-column label="操作时间" prop="operTime"></el-table-column>
             <el-table-column label="操作描述" prop="remark"></el-table-column>
             <el-table-column label="创建时间" min-width="150px">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime | formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="160px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                    
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
            <!-- 编辑 -->
            <el-dialog title="数据解析信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
                <opate v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></opate>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import opate from './component/ana-opate'
export default {
    name:'operRecord',
    components:{
        Pagination,
        opate
    },
    mixins:[pageMixins],
    filters:{
        driverFilter(value) {
            if(value == 1) {
                return '开关量'
            }else{
                return '模拟量'
            }
        }
    },
    watch:{
        queryTime() {
            this.queryForm.startTime = this.queryTime[0];
            this.queryForm.endTime = this.queryTime[1];
        }
    },
    data() {
        return {
            total:0,
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            editId:'',
            tableData:[],
            queryTime:'',
            queryForm:{
                hostNumber:'',
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
        handleOpate(boo){
            if(boo) {
                this.handlePag();
            }
            this.dialogFormVisible = false;
        }, 
        handleDelete(id) {
            this.$confirm('确定删除该数据?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.dataAdmin.operRecordDeletes(id).then(res => {
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
            this.$api.dataAdmin.operRecordPage(this.queryForm).then(res => {
                this.tableData = res.data.records
                this.total = res.data.total;
                this.tableLoading = false;
            })
        },
        // 编辑
        handleSee(id) {
        this.dialogFormVisible = true;
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
