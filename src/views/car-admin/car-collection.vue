<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <select-car :flag="flag" @change="handleChange"></select-car>
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <div class="filter-item" style="width:300px;">
                    <el-input v-model="plate" placeholder="车牌号">
                        <el-button slot="append" icon="el-icon-search" @click="handleClick">选择车辆查询</el-button>
                    </el-input>
                </div>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="急救中心" prop="center"></el-table-column>
                <el-table-column label="车牌号" prop="plate"></el-table-column>
                <el-table-column label="电池" prop="jc"></el-table-column>
                <el-table-column label="电池" prop="cs"></el-table-column>
                <el-table-column label="电池" prop="rs"></el-table-column>
                <el-table-column label="胎压" prop="ty"></el-table-column>
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
    name:'carCollection',
    components:{
        selectCar,
        Pagination,
    },
    mixins:[pageMixins],
    data() {
        return {
            flag:false,
            plate:'',
            total:30,
            tableLoading:true,
            tableHeight:null,
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
            tableData:[{
                center:'本部分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            },{
                center:'江北分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            },{
                center:'江东分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            },{
                center:'江东分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            },{
                center:'江东分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            }]
        }
    },
    created() {
        this.handlePag();
    },
    methods:{
        handleChange(data) {
            if(data.keys) {
                this.plate = data.carPlate;
                console.log(data.keys)
            }
            this.flag = data.flag;
        },
        handlePag() {
            this.tableLoading = true;
            setTimeout(() => {
                this.tableLoading = false;
            }, 2000);
        },
        handleClick() {
            this.flag = true;
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
