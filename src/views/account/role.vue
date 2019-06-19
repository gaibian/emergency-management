<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加角色</el-button>
                <!-- <el-select class="filter-item" v-model="queryForm.centerInfoId" placeholder="请选择所属中心">
                    <el-option v-for="(item,index) in parentOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-button class="filter-item" type="primary">查询</el-button> -->
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
               <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="角色类型" prop="roleType"></el-table-column>
                <el-table-column label="描述" prop="description"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="'edit'" style="font-size:18px;cursor:pointer;margin-right:8px;color:#409EFF" @click="handleEdit(scope.row.id)">编辑</svg-icon>
                        <svg-icon :icon-class="'delete'" style="font-size:18px;cursor:pointer;color:#F56C6C" @click="handleDelete(scope.row.id)">删除</svg-icon>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="角色信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClose">
                <role-opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></role-opate>
            </el-dialog>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.limit" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import roleOpate from './component/role-opate'
import { userAdmin,centerAdmin,roleAdmin } from '@/api'
export default {
    name:'roleAdmin',
    components:{
        Pagination,
        roleOpate
    },
    mixins:[pageMixins],
    data() {
        return {
            editFlag:false,
            editId:'',
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            total:10,
            tableData:[],
            parentOptions:[],
            queryForm: {
                centerInfoId:'',
                usernameLike:'',
                realNameLike:'',
                pageIndex: 1,
                pageSize: 20,
            },
        }
    },
    created() {
        // roleAdmin.roleList().then(res => {
        //     this.parentOptions = res.data
        //     this.parentOptions.push({
        //         name:'无',
        //         id:null
        //     })
        // })
        this.handlePag();
    },
    methods:{
        handleOpate(boo){
            if(boo) {
                this.handlePag()
            }
            this.dialogFormVisible = false;
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
                userAdmin.userDeletes(id).then(res => {
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
            roleAdmin.roleList(this.queryForm).then(res => {
                console.log(res)
                this.tableData = res;
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
