<template>
    <div class="car-admin-container main-page" ref="mainContainer">
        <div class="top-info-box filter-container" ref="topAdd">
            <div class="filter-item" style="width:300px;">
                <el-input v-model="plate" placeholder="车牌号">
                    <el-button slot="append" icon="el-icon-search" @click="handleClick">选择车辆查询</el-button>
                </el-input>
            </div>
            <div class="filter-item">
                  <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
            </div>
        </div>
        <select-presonnel :flag="flag" @change="handleChange"></select-presonnel>
        <el-table :data="tableData" border stripe :maxHeight="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
            <el-table-column label="急救中心" prop="jijiu"></el-table-column>
            <el-table-column label="车牌号" prop="plate"></el-table-column>
            <el-table-column label="车编号" prop="num"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="员工编号" prop="peoplenum"></el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
            <el-table-column label="职务" prop="job"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="时间" prop="time"></el-table-column>
        </el-table>
        <div ref="btmGroup" class="btm-group">
            <pagination :total="30" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
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
            tableData:[],
            options:[{
                label:'本部分中心',
                value:'1'
            },{
                label:'江北分中心',
                value:'2'
            }]
        }
    },
    filters:{
        statusFilters(val) {
            switch(val) {
                case '1':
                return '待命中'
                break;
            }
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
                sex:'女',
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
.car-admin-container{
    width:100%;
    height:100%;
    font-size:16px;
    color:#333;
}
.btm-group{
    padding-top:12px;
    box-sizing: border-box;
}
.top-info-box{
    width:100%;
}
</style>
