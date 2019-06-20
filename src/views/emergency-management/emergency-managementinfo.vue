<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <select-car :flag="flag" @change="handleChange"></select-car>
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <div class="filter-item" style="width:300px;">
                    <el-input v-model="plate" placeholder="车牌号">
                        <el-button slot="append" icon="el-icon-search" @click="handleClick">选择车辆查询</el-button>
                    </el-input>
                </div>
                <div class="filter-item">
                    <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                </div>
                <el-button class="filter-item" type="primary">导出数据</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="任务编号" prop="rwnum" min-width="100px"></el-table-column>
                <el-table-column label="任务时间" prop="rwtime" min-width="200px"></el-table-column>
                <el-table-column label="接车地址" prop="jcaddress" min-width="350px"></el-table-column>
                <el-table-column label="主叫号码" prop="maintel" min-width="150px"></el-table-column>
                <el-table-column label="所属中心" prop="jijiu" min-width="150px"></el-table-column>
                <el-table-column label="车编号" prop="carnum" min-width="80px"></el-table-column>
                <el-table-column label="车牌号" prop="plate" min-width="150px"></el-table-column>
                <el-table-column label="派车时间" prop="pctime" min-width="200px"></el-table-column>
                <el-table-column label="急救医生" prop="doctor" min-width="100px"></el-table-column>
                <el-table-column label="司机" prop="driver" min-width="100px"></el-table-column>
                <el-table-column label="担架员" prop="stretcher" min-width="100px"></el-table-column>
                <el-table-column label="车辆状态" prop="carstatus" min-width="100px"></el-table-column>
                <el-table-column label="呼叫原因" prop="hjreason" min-width="150px"></el-table-column>
                <el-table-column label="GPS里程数" prop="GPSmileage" min-width="100px"></el-table-column>
                <el-table-column label="操作" fixed="right" min-width="100px">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="'rwjd'" style="font-size:18px;cursor:pointer;margin-right:8px;color:#409EFF" @click="handlerwjd(scope.$index, scope.row)">任务节点</svg-icon>
                        <svg-icon :icon-class="'guiji'" style="font-size:18px;cursor:pointer;color:#F56C6C">轨迹</svg-icon>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="任务节点" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" center @close="handleClose">
                <emopate v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></emopate>
            </el-dialog>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.pageIndex" :limit.sync="queryForm.pageSize" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import selectCar from '@/components/selectCar' 
import Pagination from '@/components/Pagination'
import emopate from './component/em-opate'
import pageMixins from '@/mixins'
export default {
    name:'emergencyManagementinfo',
    components:{
        selectCar,
        Pagination,
        emopate
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
            total:30,
            editFlag:false,
            editId:'',
            tableData:[],
            queryForm: {
                taskNoLike:'',
                instructStatus:'',
                minAge:'',
                maxAge:'',
                carNumberLike:'',
                addressLike:'',
                startTime:'',
                endTime:'',
                pageIndex: 1,
                pageSize: 20,
            },
        }
    },
    created() {
        this.handlePag()
    },
    methods:{
        handleOpate(boo) {
            if(boo) {
                this.handlePag()
            }
            this.dialogFormVisible = false;
        },
        handlePag(data) {
            this.tableLoading = true;
            this.$api.taskRecord.zteTaskList(this.queryForm).then(res => {
                this.tableData = res.data;
                this.tableLoading = false;
            })
        },
        handleClick() {
            this.flag = true;
        },
        handlerwjd() {
            this.dialogFormVisible = true;
        },
        handleClose() {
            this.editFlag = false;
            this.editId = '';
            this.dialogFormVisible = false;
        },
        handleChange(data) {
            if(data.keys) {
                this.plate = data.carPlate;
            }
            this.flag = data.flag;
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


