<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加角色</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
               <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="角色类型" prop="roleKey"></el-table-column>
                <el-table-column label="描述" prop="description"></el-table-column>
                <el-table-column label="操作" fixed="right" width="250px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                        <el-button type="primary" size="mini" @click="handleMenu(scope.row.id)">关联资源</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="关联资源" v-model="dialogMenuVisible" :visible.sync="dialogMenuVisible" width="300px" :close-on-click-modal="false" @close="dialogMenuClose">
                <!-- <opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></opate> -->
                <choice-menu v-if="dialogMenuVisible" @changeClose="menuClose" :id="editId"></choice-menu>
            </el-dialog>
            <el-dialog title="角色信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClose">
                <role-opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></role-opate>
            </el-dialog>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import roleOpate from './component/role-opate'
import choiceMenu from './component/choiceMenu'
export default {
    name:'roleAdmin',
    components:{
        Pagination,
        roleOpate,
        choiceMenu
    },
    mixins:[pageMixins],
    data() {
        return {
            editFlag:false,
            editId:'',
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            dialogMenuVisible:false,
            total:10,
            tableData:[],
            parentOptions:[],
            queryForm: {
                name:'',
                roleKey:'',
                page: 1,
                size: 20,
            },
        }
    },
    created() {
        this.handlePag();
    },
    methods:{
        handleOpate(boo){
            if(boo) {
                this.handlePag()
            }
            this.dialogFormVisible = false;
        },
        menuClose(flag) {
            this.dialogMenuVisible = false;
        }, 
        handleMenu(id) {
            this.editId = id;
            this.dialogMenuVisible = true;
        },
        dialogMenuClose() {
            this.editId = '';
            this.dialogMenuVisible = false;
        },
        handleAdd() {
            this.dialogFormVisible = true;
        },
        handleDelete(id) {
            this.$confirm('确定删除该用户?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.roleAdmin.roleDeletes(id).then(res => {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.handlePag();
                })
            })
        },
        handlePag(data) {
            this.tableLoading = true;
            this.$api.roleAdmin.rolePage(this.queryForm).then(res => {
                console.log(res)
                this.tableData = res.data.records;
                this.total = res.data.total;
                this.tableLoading = false;
            })
        },
        dialogClose() {
            this.editFlag = false;
            this.editId = '';
            this.dialogFormVisible = false;
        },
      // 编辑
      handleEdit(id) {
        this.dialogFormVisible = true;
        this.editFlag = true;
        this.editId = id
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
