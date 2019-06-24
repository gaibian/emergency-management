<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加主机</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="主机编号" prop="hostNumber"></el-table-column>
                <el-table-column label="车牌号" prop="carNumber"></el-table-column>
                <el-table-column label="车编号" prop="carNo"></el-table-column>
                <el-table-column label="在线状态" prop="onlineStatus"></el-table-column>
                <el-table-column label="同步状态" prop="syncStatus"></el-table-column>
                <el-table-column label="最后在线时间" prop="lastTime"></el-table-column>
                <el-table-column label="固件版本号" prop="firmwareVersion"></el-table-column>
                <el-table-column label="软件版本号" prop="softVersion"></el-table-column>
                <el-table-column label="操作" fixed="right" width="370">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                        <el-button type="primary" size="mini" @click="handleSee(scope)">卡片信息</el-button>
                        <el-button type="primary" size="mini" @click="handleRecord(scope)">绑定卡片记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
        <el-dialog title="主机信息" close-on-click-modal v-model="dialogEditVisible" width="900px" :visible.sync="dialogEditVisible" @close="handleClose">
            <host-opate :edit="editFlag" v-if="dialogEditVisible" :editId="editId" @dialogChange="handleOpate"></host-opate>
        </el-dialog>
        <el-dialog title="卡片信息" close-on-click-modal v-model="dialogFormVisible" width="900px" :visible.sync="dialogFormVisible">
            <card :hostId="hostId" :hostNumber="hostNumber" v-if="dialogFormVisible"></card>
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
            total:0,
            editFlag:false,
            editId:'',
            hostId:'',
            hostNumber:'',
            queryForm:{
                hostNumber:'',
                page: 1,
                size: 20,
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
        handleRecord(scope) {  // 查看主机卡片的绑定记录
            this.$router.push({
                name:'cardRecord',
                query:{
                    hostNumber:scope.row.hostNumber
                }
            })
        },
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
        handleSee(scope) {
            this.hostId = scope.row.id;
            this.hostNumber = scope.row.hostNumber
            this.dialogFormVisible = true;
        },
        handlePag() {
            this.tableLoading = true;
            this.$api.hostAdmin.hostPage(this.queryForm).then(res => {
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
