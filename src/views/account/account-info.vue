<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <select-presonnel :flag="flag" @change="handleChange"></select-presonnel>
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <div class="filter-item" style="width:300px;">
                <el-input v-model="plate" placeholder="请输入姓名或工号"></el-input>
                </div>
                <div class="filter-item">
                </div>
                <div class="filter-item">
                </div>
                <el-button class="filter-item" type="primary">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
               <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="账号" prop="user"></el-table-column>
                <el-table-column label="密码" prop="password"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="状态" prop="state"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="'edit'" style="font-size:18px;cursor:pointer;margin-right:8px;color:#409EFF" @click="handleEdit(scope.$index, scope.row)">编辑</svg-icon>
                        <svg-icon :icon-class="'delete'" style="font-size:18px;cursor:pointer;color:#F56C6C" @click="handleDelete(scope)">删除</svg-icon>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="人员信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width=30%>
                <opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></opate>
            </el-dialog>
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
import opate from './component/opate'
export default {
    name:'accountInfo',
    components:{
        selectPresonnel,
        Pagination,
        opate
    },
    mixins:[pageMixins],
    data() {
        return {
            editFlag:false,
            fenbu:'',
            flag:false,
            plate:'',
            editId:{},
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            value6:'',
            total:10,
            value1: '',
            value2: '',
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
        for(let i=0;i<10;i++){
            this.tableData.push({
                name:'张三',
                user:'admin',
                password:'123456',
                role:'管理员',
                state:'可用',
                id:2,
            })
        }
        
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
    //   deleteRow(index, rows) {
    //     rows.splice(index, 1);
    //   },
      // 编辑
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.editFlag = true;
        this.editId =  Object.assign(row);
      },
      // 更新一行数据
    //   handleEditdata(data1) {
    //     this.dialogFormVisible = false
    //     console.log(data1)
    //     this.$set(this.tableData,data1['index'],data1)
    //   },
    },
    // handleEdit(formName) {
    //     this.$refs[formName].resetFields();
    //   }
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
