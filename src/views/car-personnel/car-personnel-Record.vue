<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-select class="filter-item" v-model="queryForm.centerInfoId" placeholder="请选择所属中心" clearable style="width:200px">
                    <el-option v-for="item in centerOptions" :key="item.value" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-input class="filter-item" v-model="queryForm.personNameLike" placeholder="请输入姓名" style="width:200px;"></el-input>
                <el-input class="filter-item" v-model="queryForm.carNo" placeholder="请输入车牌号" style="width:200px"></el-input>
                <el-input class="filter-item" v-model="queryForm.carNumber" placeholder="请输入车编号" style="width:200px;"></el-input>
                <el-date-picker class="filter-item" v-model="queryTime" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                <el-button class="filter-item" type="primary" @click="queryClick">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="用户名" prop="personDto.name"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.personDto.sex | sexFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="中心" prop="personDto.centerInfoName"></el-table-column>
                <el-table-column label="车牌号" prop="carInfoDto.carNo"></el-table-column>
                <el-table-column label="车编号" prop="carInfoDto.carNumber"></el-table-column>
                <el-table-column label="员工编号" prop="personDto.jobNo"></el-table-column>
                <el-table-column label="职务">
                    <template slot-scope="scope">
                        <span>{{scope.row.personDto.post | postFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="手机号" prop="personDto.telphone"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.personDto.status == 1 ? 'danger' : ''">{{scope.row.personDto.status | statusFilter}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="打卡时间">
                    <template slot-scope="scope">
                        <span>{{ scope.row.clockTime | formatDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span>
                            <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
export default {
    name:'carPersonnelRecord',
    components:{
        Pagination
    },
    mixins:[pageMixins],
    filters:{
        sexFilter(value) {
            if(value == 1) {
                return '男'
            }else{
                return '女'
            }
        },
        statusFilter(value) {
            if(value == 1) {
                return '下班'
            }else{
                return '上班'
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
        postFilter(value) {
            switch(value) {
                case "DRIVER":
                    return '驾驶员'
                    break;
                case 'DOCTOR':
                    return '医生'
                    break;
                case 'STRETCHER':
                    return '担架员'
                    break;
            }
        }
    },
    data() {
        return {
            tableLoading:true,
            tableHeight:null,
            queryTime:'',
            total:30,
            tableData:[],
            queryForm: {
                page:1,
                size:10,
                personNameLike:'',
                centerInfoIdIn:'',
                carNo:'',
                carNumber:'',
                startTime:'',
                endTime:'',
                type:'',
            },
            centerOptions:[],
        }
    },
    watch:{
        queryTime() {
            this.queryForm.startTime = this.queryTime[0];
            this.queryForm.endTime = this.queryTime[1];
        }
    },
    created() {
        this.$api.centerAdmin.centerList().then(res => {
            this.centerOptions = res.data;
        })
        this.handlePag();
    },
    methods:{
        handlePag(data) {
            this.tableLoading = true;
            this.$api.punchInRecord.punchInRecordList(this.queryForm).then(res => {
                console.log(res)
                this.tableData = res.data.records
                this.total = res.data.total;
                this.tableLoading = false;
            })
        },
        handleDelete(id) {
            this.$confirm('确定删除该打开记录?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.punchInRecord.punchInRecordDeletes(id).then(res => {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.handlePag();

                })
            })
        },
        queryClick() {
            this.handlePag();
        }
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
