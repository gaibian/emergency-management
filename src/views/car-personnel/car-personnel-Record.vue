<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <select-presonnel :flag="flag" @change="handleChange"></select-presonnel>
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <div class="filter-item" style="width:300px;">
                    <el-input v-model="plate" placeholder="人员">
                        <el-button slot="append" icon="el-icon-search" @click="handleClick">选择人员查询</el-button>
                    </el-input>
                </div>
                <div class="filter-item">
                    <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                </div>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
            <el-table-column label="急救中心" prop="jijiu"></el-table-column>
            <el-table-column label="车牌号" prop="plate"></el-table-column>
            <el-table-column label="车编号" prop="num"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="员工编号" prop="peoplenum"></el-table-column>
            <el-table-column label="职务" prop="job"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="打卡时间" prop="time"></el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import selectPresonnel from '@/components/selectPresonnel'
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
export default {
    name:'carPersonnelRecord',
    components:{
        selectPresonnel,
        Pagination
    },
    mixins:[pageMixins],
    data() {
        return {
            fenbu:'',
            flag:false,
            plate:'',
            tableLoading:true,
            tableHeight:null,
            value6:'',
            total:30,
            tableData:[],
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
        }
    },
    created() {
        this.tableLoading = false;
        for(let i=0;i<30;i++){
            this.tableData.push({
                jijiu:'中医院急救点',
                plate:'浙B542WX',
                num:'0128',
                name:'张三',
                peoplenum:'0211',
                job:'急救医生',
                state:'上班',
                time:'2019-5-30 08:51:01'
            })
        } 
    },
    methods:{
        handlePag(data) {
            setTimeout(() => {
                this.tableLoading = false;
            }, 2000);
            console.log(data)
        },
        handleClick() {
            this.flag = true;
        },
        handleChange(data) {
            if(data.keys) {
                this.plate = data.carPlate;
                console.log(data.keys)
            }
            this.flag = data.flag;
        },
        handleEdit() {
            console.log('编辑了')
        },
        handleDelete() {
            console.log('删除了')
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
