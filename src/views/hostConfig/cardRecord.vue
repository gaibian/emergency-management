<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <!-- <el-button class="filter-item" type="primary" @click="handleAdd">添加主机</el-button> -->
                <!-- <el-input v-model="queryForm.carNo" placeholder="请输入卡片编号"></el-input> -->
                <!-- <el-select class="filter-item" v-model="queryForm.dataHostId" placeholder="请选择主机">
                    <el-option v-for="(item) in hostOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select> -->
                <el-input class="filter-item" v-model="queryForm.hostNumberLike" placeholder="请输入主机编号" style="width:200px"></el-input>
                <el-button class="filter-item" type="primary" @click="queryClick">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="主机编号" prop="dataHost.hostNumber"></el-table-column>
                <el-table-column label="车辆编号" prop="dataHost.carNo"></el-table-column>
                <el-table-column label="车牌号" prop="dataHost.carNumber"></el-table-column>
                <el-table-column label="主机编号" prop="dataHost.hostNumber"></el-table-column>
                <el-table-column label="卡片编号" prop="cardNo"></el-table-column>
                <el-table-column label="设备名称" prop="deviceName"></el-table-column>
                <el-table-column label="设备编号" prop="deviceNo"></el-table-column>
                <!-- <el-table-column label="同步状态" prop="syncStatus"></el-table-column> -->
                <!-- <el-table-column label="最后在线时间" prop="lastTime"></el-table-column>
                <el-table-column label="固件版本号" prop="firmwareVersion"></el-table-column>
                <el-table-column label="软件版本号" prop="softVersion"></el-table-column> -->
                <el-table-column label="操作" fixed="right" width="250">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
        <!-- <el-dialog title="主机信息" close-on-click-modal v-model="dialogEditVisible" width="900px" :visible.sync="dialogEditVisible" @close="handleClose">
            <host-opate :edit="editFlag" v-if="dialogEditVisible" :editId="editId" @dialogChange="handleOpate"></host-opate>
        </el-dialog>
        <el-dialog title="卡片信息" close-on-click-modal v-model="dialogFormVisible" width="900px" :visible.sync="dialogFormVisible">
            <card :hostId="hostId" v-if="dialogFormVisible"></card>
        </el-dialog> -->
    </div>
</template>
<script>
import pageMixins from '@/mixins'
import Pagination from '@/components/Pagination'
//import card from './component/card'
//import hostOpate from './component/host-opate'
export default {
    name:'cardRecord',
    components:{
        Pagination,
        // card,
        // hostOpate
    },
    mixins:[pageMixins],
    data() {
        return {
            total:29,
            editFlag:false,
            editId:'',
            hostId:'',
            queryForm:{
                hostNumberLike:'',
                page: 1,
                size: 20,
            },
            dialogEditVisible:false,
            dialogFormVisible:false,
            tableLoading:true,
            tableHeight:null,
            tableData:[],
        }
    },
    created() {
        this.handlePag();
    },
    activated() {
        this.queryInit()
    },
    methods:{
        queryInit() {
            let queryNumber = this.$route.query.hostNumber;
            if(queryNumber){
                this.queryForm.hostNumberLike = queryNumber;
                this.handlePag();
            }
        },
        queryClick() {
            this.handlePag();
        },
        handleDelete(id) {
            this.$confirm('确定删除该记录?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.hostAdmin.hostBindRecordDeletes(id).then(res => {
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
            this.$api.hostAdmin.hostBindRecordList(this.queryForm).then(res => {
                this.tableData = res.data.records;
                console.log(this.tableData)
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
