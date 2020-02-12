<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加资源</el-button>
            </div>
            <el-table :data="tableData" row-key="id" tooltip-effect="dark" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @selection-change="handleSelectionChange" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
               <el-table-column type="selection" width="55"></el-table-column>
               <el-table-column label="名称" prop="name"></el-table-column>
                <el-table-column label="资源Key" prop="sourceKey"></el-table-column>
                <el-table-column label="资源类型">
                    <template slot-scope="scope">
                        <el-tag :type="handleType(scope.row.type)"><span>{{scope.row.type | typeFilter}}</span></el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="连接" prop="sourceUrl"></el-table-column> -->
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="资源信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClose">
                <menu-opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></menu-opate>
            </el-dialog>
            <div ref="btmGroup" class="btm-group" style="padding:12px 0;box-sizing:border-box">
                <el-row type="flex" justify="space-between">
                    <el-button size="mini" @click="handleDeletes">批量删除</el-button>
                </el-row>
            </div>
            <!-- <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import menuOpate from './component/menu-opate'
import changeObject from '@/utils/changeObject'
export default {
    name:'menuAdmin',
    components:{
        Pagination,
        menuOpate
    },
    mixins:[pageMixins],
    filters:{
        typeFilter(value) {
            switch(value) {
                case 0:
                    return '目录'
                    break;
                case 1:
                    return '页面'
                    break;
                case 2:
                    return '按钮'
                    break; 
            }
        }
    },
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
                name:'',
            },
            ids:''
        }
    },
    created() {
        this.handlePag();
    },
    methods:{
        handleType(value) {
            switch(value) {
                case 0:
                    return ''
                    break;
                case 1:
                    return 'success'
                    break;
                case 2:
                    return 'danger'
                    break;
            }
        },
        // 多选
        handleSelectionChange(data) {
            this.ids = '';
            data.forEach(item => {
                this.ids += `${item.id},`
            })
        },
        handleDeletes() {
            this.$api.menuAdmin.menuDeletes(this.ids).then(res => {
                this.$message({
                    message:'删除成功',
                    type:'success'
                })
                this.handlePag();
            })
        },
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
            this.$confirm('确定删除该资源?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.menuAdmin.menuDeletes(id).then(res => {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.handlePag();
                })
            })
        },
        handlePag(data) {
            let attr = {
                id: 'id',
                parendId: 'parentId',
                sourceKey:'sourceKey',
                name: 'name',
                type: 'type',
                rootId: null
            };
            this.tableLoading = true;
            this.$api.menuAdmin.menuList(this.queryForm).then(res => {
                console.log(res)
                let data = this.$prototype.copyArr(res.data)
                let newData = changeObject(data,attr)
                console.log(newData)
                this.tableData = newData;
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
