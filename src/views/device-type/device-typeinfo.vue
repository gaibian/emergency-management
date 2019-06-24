<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加设备类型</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="设备类型编号" prop="no"></el-table-column>
                <el-table-column label="设备类型名称" prop="name"></el-table-column>
                <el-table-column label="公式" prop="formula"></el-table-column>
                <el-table-column label="操作" fixed="right" width="150px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
        <el-dialog title="设备类型信息" close-on-click-modal v-model="dialogEditVisible" width="800px" :visible.sync="dialogEditVisible" @close="handleClose">
            <device-opate :edit="editFlag" v-if="dialogEditVisible" :editId="editId" @dialogChange="handleOpate"></device-opate>
        </el-dialog>
    </div>
</template>
<script>
import pageMixins from '@/mixins'
import Pagination from '@/components/Pagination'
import deviceOpate from './component/device-opate'
export default {
    name:'deviceTypeinfo',
    components:{
        Pagination,
        deviceOpate
    },
    mixins:[pageMixins],
    data() {
        return {
            total:0,
            editFlag:false,
            editId:'',
            deviceId:'',
            queryForm:{
                page: 1,
                size: 20,
                no:'',
                name:''
            },
            dialogEditVisible:false,
            dialogFormVisible:false,
            tableLoading:true,
            tableHeight:null,
            tableData:[]
        }
    },
    created() {
        this.handlePag();
    },
    methods:{
        handleAdd() {
            this.dialogEditVisible = true;
        },
        handleEdit(id) {
            this.dialogEditVisible = true;
            this.editFlag = true;
            this.editId = id;
        },
        handleDelete(id) {
            this.$confirm('确定删除该数据主机?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.deviceType.deviceTypeDeletes(id).then(res => {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.handlePag();
                })
            })
        },
        handleClose() {
            this.editFlag = false;
            this.editId = '';
            this.dialogEditVisible = false;
        },
        handleOpate(boo) {
            if(boo) {
                this.handlePag();
            }
            this.dialogEditVisible = false;
        },
        handlePag() {
            this.tableLoading = true;
            this.$api.deviceType.deviceTypePage(this.queryForm).then(res => {
                this.tableData = res.data.records;
                this.total = res.data.total
                this.tableLoading = false;
            })
        },
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
</style>
