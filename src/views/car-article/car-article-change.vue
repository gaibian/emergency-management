<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <select-car :flag="flag" @change="handleChange"></select-car>
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary">添加车辆</el-button>
                <div class="filter-item" style="width:300px;">
                    <el-input v-model="plate" placeholder="车牌号">
                        <el-button slot="append" icon="el-icon-search" @click="handleClick">选择车辆查询</el-button>
                    </el-input>
                </div>
                <div class="filter-item">
                    <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                </div>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="所属中心" prop="jijiu"></el-table-column>
                <el-table-column label="车牌号" prop="plate"></el-table-column>
                <el-table-column label="车编号" prop="carnum"></el-table-column>
                <el-table-column label="物品名称" prop="articleName"></el-table-column>
                <el-table-column label="状态" prop="state"></el-table-column>
                <el-table-column label="时间" prop="time"></el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import selectCar from '@/components/selectCar' 
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
export default {
    name:'carArticleChange',
    components:{
        selectCar,
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
            options:[{
                label:'本部分中心',
                value:'1'
            },{
                label:'江北分中心',
                value:'2'
            }]
        }
    },

    created() {
        this.tableLoading = false;
            this.tableData.push({
                jijiu:'中医院急救点',
                plate:'浙B542WX',
                carnum:'0128',
                articleName:'软担架',
                state:'设备上车',
                time:'2019-5-30 11:51:01'
            },{
                jijiu:'中医院急救点',
                plate:'浙B542WX',
                carnum:'0128',
                articleName:'软担架',
                state:'设备取下',
                time:'2019-5-30 11:58:01'
            },{
                jijiu:'中医院急救点',
                plate:'浙B542WX',
                carnum:'0128',
                articleName:'负压式骨折固定垫',
                state:'设备取下',
                time:'2019-5-30 11:55:01'
            },{
                jijiu:'中医院急救点',
                plate:'浙B542WX',
                carnum:'0128',
                articleName:'铲式担架',
                state:'设备上车',
                time:'2019-5-30 11:58:01'
            })
        
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
