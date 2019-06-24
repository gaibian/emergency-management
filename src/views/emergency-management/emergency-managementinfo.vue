<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
  
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="任务编号" prop="taskNo" min-width="120px"></el-table-column>
                <el-table-column label="任务时间" min-width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.taskTime | formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="主叫号码" prop="telphone" min-width="120px"></el-table-column>
                <el-table-column label="车牌号" prop="carNumber" min-width="120px"></el-table-column>
                <!-- <el-table-column label="派车时间" min-width="120px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sendTime | formatDate}}</span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column label="急救医生" prop="doctorName" min-width="100px"></el-table-column>
                <el-table-column label="司机" prop="driverName" min-width="100px"></el-table-column>
                <el-table-column label="担架员" prop="stretcherName" min-width="100px"></el-table-column> -->
                <!-- <el-table-column label="GPS里程数" prop="countGPS" min-width="100px"></el-table-column> -->
                <!-- <el-table-column label="车辆状态" min-width="100px">
                    <template slot-scope="scope">
                        <el-tag :type="carStatus(scope.row.status)">{{scope.row.status | carStatus}}</el-tag>
                    </template>
                </el-table-column> -->
                <el-table-column label="呼叫原因" prop="reason" min-width="150px"></el-table-column>
                <el-table-column label="接车地址" prop="address" min-width="300px"></el-table-column>
                <el-table-column label="操作" fixed="right" min-width="200px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handlerwjd(scope.row.id)">任务节点</el-button>
                        <el-button type="primary" size="mini" @click="handleLocus(scope.row.id)">查看轨迹</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="任务节点" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" center @close="handleClose">
                <emopate v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></emopate>
            </el-dialog>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>

import Pagination from '@/components/Pagination'
import emopate from './component/em-opate'
import pageMixins from '@/mixins'
export default {
    name:'emergencyManagementinfo',
    components:{

        Pagination,
        emopate
    },

    mixins:[pageMixins],
    data() {
        return {
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            total:0,
            editId:'',
            tableData:[],
            queryForm: {
                page: 1,
                size: 20,
            },
        }
    },
    created() {
        this.handlePag()
    },
    methods:{
        // carStatus(value) {
        //     switch(value) {
        //         case 0:
        //             return '未上班/下班'
        //             break;
        //         case 1:
        //             return '任务中'
        //             break;
        //         case 2:
        //             return '待命中'
        //             break;
        //     }
        // },
        handleOpate(boo) {
            if(boo) {
                this.handlePag()
            }
            this.dialogFormVisible = false;
        },
        handlePag(data) {
            this.tableLoading = true;
            this.$api.taskRecord.zteTaskList(this.queryForm).then(res => {
                this.tableData = res.data.records;
                this.total = res.data.total;
                this.tableLoading = false;
            })
        },
        handlerwjd(id) {
            this.dialogFormVisible = true;
            this.editId = id;
        },
        handleLocus(id) {
            this.$router.push({
                name:'wheelPath',
                query:{
                    id:id
                }
            })
        },
        handleClose() {
            this.editId = '';
            this.dialogFormVisible = false;
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


