<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <!-- <select-car :flag="flag" @change="handleChange"></select-car> -->
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <!-- <div class="filter-item" style="width:300px;">
                    <el-input v-model="plate" placeholder="车牌号">
                        <el-button slot="append" icon="el-icon-search" @click="handleClick">选择车辆查询</el-button>
                    </el-input>
                </div> -->
                <el-button class="filter-item" type="primary" @click="handleAdd">添加物品</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="所属中心" prop="jijiu"></el-table-column>
                <el-table-column label="车牌号" prop="plate"></el-table-column>
                <el-table-column label="车编号" prop="carnum"></el-table-column>
                <el-table-column label="物品名称" prop="articleName"></el-table-column>
                <el-table-column label="状态" prop="state"></el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>

        </div>
        <el-dialog title="物品信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="handleClose">
            <article-opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></article-opate>
        </el-dialog>
    </div>
</template>
<script>
// import selectCar from '@/components/selectCar'
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import articleOpate from './component/article-opate'
export default {
    name:'carArticleInfo',
    components:{
        // selectCar,
        Pagination,
        articleOpate
    },
    mixins:[pageMixins],
    data() {
        return {
            fenbu:'',
            flag:false,
            plate:'',
            tableLoading:false,
            tableHeight:null,
            editId:'',
            editFlag:false,
            dialogFormVisible:false,
            total:30,
            tableData:[],
            queryForm: {
                page: 1,
                size: 20,
            },
        }
    },
    created() {
        this.handlePag();
    },
    methods:{
        handlePag(data) {
            this.tableLoading = true;
            this.$api.articleAdmin.articleList(this.queryForm).then(res => {
                this.tableData = res.data;
                //this.total = res.tot
                this.tableLoading = false;
            })
        },
        handleOpate(oob) {
            if(oob) {
                this.handlePag();
            }
            this.dialogFormVisible = false;
        },
        // handleClick() {
        //     this.flag = true;
        // },
        // handleChange(data) {
        //     if(data.keys) {
        //         this.plate = data.carPlate;
        //         console.log(data.keys)
        //     }
        //     this.flag = data.flag;
        // },
        handleAdd() {
            this.dialogFormVisible = true;
        },
        handleEdit() {
            this.dialogFormVisible = true;
            this.editFlag = true;
            this.editId = id
        },
        handleClose() {
            this.dialogFormVisible = false;
            this.editFlag = false;
            this.editId = ''
        },
        handleDelete(id) {
            this.$confirm('确定删除该物品?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.articleAdmin.articleDeletes(id).then(res => {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.handlePag();
                })
            })
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
