<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加主机</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="配置编号" prop="configNum"></el-table-column>
                <el-table-column label="车辆ID" prop="plateId"></el-table-column>
                <el-table-column label="在线状态" prop="currentStatus"></el-table-column>
                <el-table-column label="同步状态" prop="synStatus"></el-table-column>
                <el-table-column label="最后在线时间" prop="lastTime"></el-table-column>
                <el-table-column label="固件版本号" prop="gVersionNum"></el-table-column>
                <el-table-column label="软件版本号" prop="rVersionNum"></el-table-column>
                <el-table-column label="操作" fixed="right" min-width="130">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                        <el-button type="primary" size="mini" @click="handleSee(scope.row.id)">卡片信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.pageIndex" :limit.sync="queryForm.pageSize" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
        <el-dialog title="主机信息" close-on-click-modal v-model="dialogEditVisible" width="800px" :visible.sync="dialogEditVisible" @close="handleClose">
            <host-opate :edit="editFlag" v-if="dialogEditVisible" :editId="editId" @dialogChange="handleOpate"></host-opate>
        </el-dialog>
        <el-dialog title="卡片信息" close-on-click-modal v-model="dialogFormVisible" width="800px" :visible.sync="dialogFormVisible">
            <card :hostId="hostId" v-if="dialogFormVisible"></card>
        </el-dialog>
    </div>
</template>
<script>
import pageMixins from '@/mixins'
import Pagination from '@/components/Pagination'
import card from './component/card'
import hostOpate from './component/host-opate'
export default {
    name:'hostList',
    components:{
        Pagination,
        card,
        hostOpate
    },
    mixins:[pageMixins],
    data() {
        return {
            total:29,
            editFlag:false,
            editId:'',
            hostId:'',
            queryForm:{
                hostNumber:'',
                pageIndex: 1,
                pageSize: 20,
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
                this.$api.hostAdmin.hostDeletes(id).then(res => {
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
        handleSee(id) {
            this.hostId = id;
            this.dialogFormVisible = true;
        },
        handlePag() {
            this.tableLoading = true;
            this.$api.hostAdmin.hostList(this.queryForm).then(res => {
                this.tableData = res.data;
                //this.total = res.total
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
