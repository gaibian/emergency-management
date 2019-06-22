<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <!-- <el-button class="filter-item" type="primary">所有车辆GIS定位</el-button> -->
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="任务编号" prop="taskNo" min-width="120px"></el-table-column>
                <el-table-column label="任务时间" min-width="120px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.taskTime | formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="主叫号码" prop="telphone" min-width="120px"></el-table-column>
                <el-table-column label="车牌号" prop="carNumber" min-width="120px"></el-table-column>
                <el-table-column label="派车时间" min-width="120px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sendTime | formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="急救医生" prop="doctorName" min-width="100px"></el-table-column>
                <el-table-column label="司机" prop="driverName" min-width="100px"></el-table-column>
                <el-table-column label="担架员" prop="stretcherName" min-width="100px"></el-table-column>
                <el-table-column label="GPS里程数" prop="countGPS" min-width="100px"></el-table-column>
                <el-table-column label="车辆状态" min-width="100px">
                    <template slot-scope="scope">
                        <el-tag :type="carStatus(scope.row.status)">{{scope.row.status | carStatus}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="呼叫原因" prop="reason" min-width="150px"></el-table-column>
                <el-table-column label="接车地址" prop="address" min-width="300px"></el-table-column>
                <el-table-column label="操作" fixed="right" min-width="200px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handlerwjd(scope.row.id)">查看节点</el-button>
                        <el-button type="primary" size="mini" @click="handleGj(scope.row.id)">查看定位</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="任务节点" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" width="900px" :close-on-click-modal="false" @close="handleClose">
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
    name:'emergencyManagementintime',
    components:{
        Pagination,
        emopate
    },
    filters:{
        carStatus(value) {
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
        },
        formatDate(value) {
            if (value === null) {
                return '空'
            } else {
                var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + '';
                return Y + M + D;
            }
        },
    },
    mixins:[pageMixins],
    data() {
        return {
            flag:false,
            plate:'',
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            value6:'',
            total:10,
            editId:'',
            tableData:[],
            queryForm: {
                page: 1,
                size: 20,
                carNumber:'',
                status:'',
                startTime:'',
                endTime:'',
            },
        }
    },
    created() {
        this.handlePag()
        this.tableLoading = false;
    },
    methods:{
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
        handleGj(scope) {
            this.$router.push({
                name:'gisInfo',
                query:{
                    id:1
                }
            })
        },
        handleOpate(boo) {
            console.log(boo)
            this.tableLoading = true;
            setTimeout(() => {
                this.tableLoading = false;
            },200)
            this.dialogFormVisible = false;
        },
        handlePag(data) {
            this.tableLoading = true;
            this.$api.taskInfoAdmin.taskInfoPage(this.queryForm).then(res => {
                console.log(res)
                this.tableData = res.data.records;
                this.total = res.data.total;
                this.tableLoading = false;
            })
        },
        handleClose() {
            this.editId = '';
            this.dialogFormVisible = false;
        },
        handlerwjd(id) {
            this.dialogFormVisible = true;
            this.editId = id;
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


