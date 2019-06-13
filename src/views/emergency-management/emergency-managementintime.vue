<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary">所有车辆GIS定位</el-button>
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
            <el-dialog title="任务节点" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="50%" center>
                <div style="height:500px;">
                    <emopate v-if="dialogFormVisible" @dialogChange="handleOpate"></emopate>
                </div>
                
            </el-dialog>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
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
            tableData:[],
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
            },
        }
    },
    created() {
        this.tableLoading = false;
        for(let i=0;i<10;i++){
            this.tableData.push({
                rwnum:'125403',
                rwtime:'2019-05-15 10:15:01',
                jcaddress:'浙江省宁波市鄞州区钟公庙街道宁南北路365',
                maintel:'13333333333',
                jijiu:'中医院急救点',
                carnum:'030',
                plate:'浙B542WX',
                pctime:'2019-5-15 10:16:20',
                doctor:'张三三',
                driver:'李四四',
                stretcher:'刘星星',
                carstatus:'任务中',
                hjreason:'有人路边晕倒',
                GPSmileage:'320公里'
            })
        }
    },
    methods:{
        handleOpate(boo) {
            console.log(boo)
            this.tableLoading = true;
            setTimeout(() => {
                this.tableLoading = false;
            },200)
            this.dialogFormVisible = false;
        },
        handlePag(data) {
            setTimeout(() => {
                this.tableLoading = false;
            }, 2000);
            console.log(data)
        },
        handleClick() {
            this.flag = true;
        },
        handlerwjd() {
            this.dialogFormVisible = true;
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


