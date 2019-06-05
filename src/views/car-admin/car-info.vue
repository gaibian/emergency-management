<template>
    <div class="car-admin-container main-page" ref="mainContainer">
        <div class="top-info-box filter-container" ref="topAdd">
            <el-button class="filter-item" type="primary">添加车辆</el-button>
            <div class="filter-item" style="width:300px;">
                <el-input v-model="plate" placeholder="车牌号">
                    <el-button slot="append" icon="el-icon-search" @click="handleClick">选择车辆查询</el-button>
                </el-input>
            </div>
        </div>
        <select-car :flag="flag" :radio="true" @change="handleChange"></select-car>
        <el-table :data="tableData" border stripe :max-height="tableHeight" :height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
            <el-table-column label="急救中心" prop="jijiu"></el-table-column>
            <el-table-column label="车牌号" prop="plate"></el-table-column>
            <el-table-column label="车编号" prop="num"></el-table-column>
            <el-table-column label="分类" prop="label"></el-table-column>
            <el-table-column label="使用日期" prop="time"></el-table-column>
            <el-table-column label="资产类别" prop="zichan"></el-table-column>
            <el-table-column label="使用人" prop="person"></el-table-column>
            <el-table-column label="出车状态">
                <template slot-scope="scope">
                    <span>{{scope.row.status | statusFilters}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="176" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="handleEdit">编辑</el-button>
                    <el-button @click="handleDelete" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" class="btm-group">
            <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
        </div>
    </div>
</template>
<script>
import selectCar from '@/components/selectCar'
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
export default {
    name:'carAdmin',
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
            total:30,
            tableLoading:true,
            tableHeight:null,
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
        // 进行第一次的表格数据加载
        this.handlePag();
        for(let i=0;i<20;i++){
            this.tableData.push({
                jijiu:'中医院急救点',
                plate:'浙B542WX',
                num:'0128',
                label:'A型普通',
                time:'2019-09-23',
                zichan:'私有',
                person:'张三',
                status:'1',
            })
        }
    },
    methods:{
        handlePag() {
            this.tableLoading = true;
            setTimeout(() => {
                this.tableLoading = false;
            }, 2000);
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
