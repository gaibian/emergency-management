<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加中心</el-button>
            </div>
            <el-table :data="tableData" default-expand-all :max-height="tableHeight" style="width: 100%;margin-bottom: 20px;" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :header-row-class-name="'table-header-box'" v-loading="loading" stripe element-loading-text="数据加载中..." >
                <el-table-column label="中心名称" min-width="100px">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="scope.row.children ? 'fenbu' : 'yiyuan'" style="color:rgb(64, 158, 255)"></svg-icon>
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="longitude" label="经度"></el-table-column>
                <el-table-column prop="latitude" label="纬度"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 1 ? '' : 'danger'">{{scope.row.status | status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                         <svg-icon :icon-class="'edit'" style="font-size:18px;cursor:pointer;margin-right:8px;color:#409EFF" @click="handleEdit(scope.row.id)">编辑</svg-icon>
                        <svg-icon :icon-class="'delete'" style="font-size:18px;cursor:pointer;color:#F56C6C" @click="handleDelete(scope.row.id)">删除</svg-icon>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 编辑 -->
        <el-dialog title="中心信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClose">
            <center-optea :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></center-optea>
        </el-dialog>
    </div>
</template>
<script>
import pageMixins from '@/mixins'
// import { centerAdmin } from '@/api'
import centerOptea from './component/center-optea'
export default {
    name:'centralInfo',
    components:{
        centerOptea
    },
    mixins:[pageMixins],
    filters:{
        status(value) {
            if(value == 0) {
                return '禁用'
            }else if(value == 1){
                return '启用'
            }
        }
    },
    data() {
        return {
            tableData:[],
            tableHeight:null,
            dialogFormVisible:false,
            editId:'',
            editFlag:false,
            loading:true,
        }
    },
    created() {
        this.handlePag()
    },
    methods:{
        handlePag() {
            this.loading = true;
            this.$api.centerAdmin.centerTreeList().then(res => {
                console.log(res)
                this.tableData = res.data;
                this.loading = false;
            })
        },
        handleAdd() {
            this.dialogFormVisible = true;
        },
        handleEdit(id) {
            this.dialogFormVisible = true;
            this.editFlag = true;
            this.editId = id;
        },
        handleDelete(id) {
            this.$confirm('确定删除该中心?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.centerAdmin.centerDeletes(id).then(res => {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.handlePag();
                })
            })
        },
        handleOpate(flag) {
            if(flag) {
                this.handlePag()
            }
            this.dialogFormVisible = false;
        },
        dialogClose() {
            this.editId = '';
            this.editFlag = false;
            this.dialogFormVisible = false;
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