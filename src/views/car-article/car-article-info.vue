<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <!-- <select-car :flag="flag" @change="handleChange"></select-car> -->
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加物品</el-button>
                <el-input class="filter-item" style="width:200px;" v-model="queryForm.name" placeholder="请输入物品名称"></el-input>
                <el-input class="filter-item" style="width:200px;" v-model="queryForm.no" placeholder="请输入物品编号"></el-input>
                <el-button class="filter-item" type="primary" @click="queryClick">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="物品编号" prop="no"></el-table-column>
                <el-table-column label="中心" prop="centerInfoName"></el-table-column>
                <el-table-column label="物品名称" prop="name"></el-table-column>
                <el-table-column label="物品卡号" prop="cardNo"></el-table-column>
                <el-table-column label="操作" fixed="right" width="250">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
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
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import articleOpate from './component/article-opate'
export default {
    name:'carArticleInfo',
    components:{
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
                name:'',
                no:'',
            },
        }
    },
    created() {
        this.handlePag();
    },
    methods:{
        queryClick() {
            this.handlePag()
        },
        handlePag(data) {
            this.tableLoading = true;
            this.$api.articleAdmin.articlePage(this.queryForm).then(res => {
                this.tableData = res.data.records;
                this.total = res.data.total;
                this.tableLoading = false;
            })
        },
        handleOpate(oob) {
            if(oob) {
                this.handlePag();
            }
            this.dialogFormVisible = false;
        },
        handleAdd() {
            this.dialogFormVisible = true;
        },
        handleEdit(id) {
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
