<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <select-car :flag="flag" :radio="true" @change="handleChange"></select-car>
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加车辆</el-button>
                <div class="filter-item" style="width:300px;">
                    <el-input v-model="plate" placeholder="车牌号">
                        <el-button slot="append" icon="el-icon-search" @click="handleClick">选择车辆查询</el-button>
                    </el-input>
                </div>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="所属中心" prop="jijiu"></el-table-column>
                <el-table-column label="车牌号" prop="plate"></el-table-column>
                <el-table-column label="车编号" prop="carnum"></el-table-column>
                <el-table-column label="车辆状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status | statusFilters}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="'edit'" style="font-size:18px;cursor:pointer;margin-right:8px;color:#409EFF" @click="handleEdit(scope.$index, scope.row)">编辑</svg-icon>
                        <svg-icon :icon-class="'delete'" style="font-size:18px;cursor:pointer;color:#F56C6C" @click="handleDelete(scope)">删除</svg-icon>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
            <!-- 编辑 -->
            <el-dialog title="车辆信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width='30%'>
                <opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></opate>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import selectCar from '@/components/selectCar'
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import opate from './component/car-opate'
import { carAdmin } from '@/api'

export default {
    name:'carAdmin',
    components:{
        selectCar,
        Pagination,
        opate
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
            dialogFormVisible: false,
            editFlag:false,
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
        // carAdmin.carList(1).then(data => {})
        // carAdmin.carAdd(form).then(data => {
        //     this.$message({
        //         message:data.message
        //     })
        // })
        this.handlePag();
        for(let i=0;i<20;i++){
            this.tableData.push({
                id:'1',
                jijiu:'中医院急救点',
                plate:'浙B542WX',
                carnum:'0128',
                status:'1',
            })
        }
        // 合并对象
        const cites = [{
            name:'xiaojun',
            value:'no'
        },{
            name:'zhouquan',
            value:'yes'
        }]
        let o = {
            name:'112'
        }
        let j = {
            age:'21'
        }
        let s = { ...o, ...j }
        console.log(s)
        const result = cites.reduce((accumnlator,item) => {
            return {
                ...accumnlator,
                [item.name]: item.value
            }
        },{})
        console.log(result)
    },
    methods:{
 
        handleOpate(boo){
            console.log(boo)
            this.tableLoading = true;
            setTimeout(() => {
                this.tableLoading = false;
            },200)
            this.dialogFormVisible = false;
        }, 
        handleAdd() {
            this.dialogFormVisible = true;
            this.editFlag = false;
        },
        handleDelete(scope) {
            this.$confirm('确定删除该人员?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                // agencyDelete(scope.row.id).then(res => {
                //     if(res !== 'error'){
                //         _g.toastMsg('success','删除成功')
                //         this.update = !this.update;
                //     }
                // })
            })
        },
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
        // 编辑
        handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.editFlag = true;
        this.editId =  Object.assign(row);
      },
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
.table-box{
    padding:12px;
    box-sizing:border-box;
    background:#fff;
    border-radius:6px;
    overflow:hidden;
}
.btm-group{
    padding-top:12px;
    box-sizing: border-box;
}
.top-info-box{
    width:100%;
}
</style>
