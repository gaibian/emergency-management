<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加人员</el-button>
                <div class="filter-item" style="width:200px;">
                    <el-input  v-model="queryForm.name" placeholder="请输入姓名" clearable></el-input>
                </div>
                <div class="filter-item" style="width:200px;">
                    <el-input v-model="queryForm.jobNo" placeholder="请输入工号" clearable ></el-input>
                </div>
                <div class="filter-item" style="width:200px">
                    <select-tree :id.sync="queryForm.centerInfoId" :placeholder.sync="treeVal" :data="treeData"></select-tree>
                </div>
                <div class="filter-item">
                <el-select v-model="queryForm.status" placeholder="请选择在职状态" clearable>
                    <el-option v-for="item in $dic.workStatusOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                </div>
                <el-button class="filter-item" type="primary" @click="queryClick">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" :max-height="tableHeight" stripe v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="急救中心" prop="centerInfoName"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="员工工号" prop="jobNo"></el-table-column>
                <el-table-column label="IC卡编号" prop="idcard"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex | sexCapitalize}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="手机号码" prop="telphone"></el-table-column>
                <el-table-column label="职务">
                    <template slot-scope="scope">
                        <span>{{scope.row.post | postCapitalize}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="在职状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 1 ? '' : 'danger'">{{scope.row.status | postStatus}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="人员信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="handleClose">
                <peropate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></peropate>
            </el-dialog>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import peropate from './component/per-opate'
import pageMixins from '@/mixins'
import selectTree from '@/components/selectTree'
import changeObject from '@/utils/changeObject'

export default {
    name:'carPersonnelInfo',
    components:{
        Pagination,
        peropate,
        selectTree
    },
    mixins:[pageMixins],
    filters: {
		sexCapitalize (value) {
			if (value == 0) {
				return '女'
				}
			else {
				return '男'
			}
        },
        postStatus(value) {
            if(value == 1){
                return '在职'
            }else{
                return '离职'
            }
        },
        postCapitalize (value) {
            switch(value) {
                case 'DOCTOR':
                    return '急救医生';
                    break;
                case 'STRETCHER':
                    return '担架员'
                    break;
                case 'DRIVER':
                    return '驾驶员';
                    break;
            }
        },
    },
    data() {
        return {
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            editFlag:false,
            editId:'',
            total:0,
            tableData:[],
            treeVal:'请选择中心信息',
            listData:[],
            treeData:[],
            queryForm: {
                centerInfoId:'',
                nameLike:'',
                jobNoLike:'',
                post:'',
                status:'',
                page:1,
                size:10,
            },
        }
    },
    created() {
        let attr = {
            id: 'id',
            parendId: 'parentId',
            name: 'name',
            rootId: null
        };
        this.$api.centerAdmin.centerList().then(res => {
            this.listData = this.$prototype.copyArr(res.data)
            let data = this.$prototype.copyArr(res.data)
            this.treeData = changeObject(data,attr)
        })
        // 默认加载列表
        this.handlePag();
    },
    methods:{
        handleClose() {
            this.editFlag = false;
            this.editId = '';
            this.dialogFormVisible = false;
        },
        queryClick() {
            this.handlePag();
        },
        handleOpate(boo){
            if(boo) {
                this.handlePag();
            }
            this.dialogFormVisible = false;
        }, 
        handleAdd() {
            this.dialogFormVisible = true;
        },
        handleDelete(id) {
            this.$confirm('确定删除该人员?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.personInfo.personDeletes(id).then(res => {
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                    this.handlePag();

                })
            })
        },
        handlePag() {
            this.tableLoading = true;
            this.$api.personInfo.personList(this.queryForm).then(res => {
                 this.tableData = res.data.records;
                 this.total = res.data.total
                this.tableLoading = false;
            })
        },
        // 编辑
        handleEdit(id) {
        this.dialogFormVisible = true;
        this.editFlag = true;
        this.editId = id
      },
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
