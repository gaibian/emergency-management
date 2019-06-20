<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加人员</el-button>
                <div class="filter-item" style="width:200px;">
                    <el-input v-model="plate" placeholder="请输入姓名"></el-input>
                </div>
                <div class="filter-item" style="width:200px;">
                    <el-input v-model="plate" placeholder="请输入工号"></el-input>
                </div>
                <div class="filter-item">
                <el-select v-model="value1" placeholder="请选择所属中心">
                    <el-option v-for="item in centerOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                </div>
                <div class="filter-item">
                <el-select v-model="value2" placeholder="请选择在职状态">
                    <el-option v-for="item in zzztoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                </div>
                <el-button class="filter-item" type="primary">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" :max-height="tableHeight" stripe v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="急救中心" prop="centerInfo.name"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="员工工号" prop="jobNo"></el-table-column>
                <el-table-column label="IC卡编号" prop="idcard"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex | capitalize}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="手机号码" prop="telphone"></el-table-column>
                <el-table-column label="职务">
                    <template slot-scope="scope">
                        <span>{{scope.row.post | capitalize01}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="在职状态" prop="status"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="'edit'" style="font-size:18px;cursor:pointer;margin-right:8px;color:#409EFF" @click="handleEdit(scope.row.id)">编辑</svg-icon>
                        <svg-icon :icon-class="'delete'" style="font-size:18px;cursor:pointer;color:#F56C6C" @click="handleDelete(scope.row.id)">删除</svg-icon>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="人员信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
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
import { personInfo,centerAdmin } from '@/api'
export default {
    name:'carPersonnelInfo',
    components:{
        Pagination,
        peropate
    },
    mixins:[pageMixins],
    filters: {
		capitalize (sex) {
			if (sex == 0) {
				return '女'
				}
			else {
				return '男'
			}
        },
        capitalize01 (post) {
			if (post == 0) {
				return '急救医生'
			}
			else if(post == 1){
				return '担架员'
            }
            else{
                return '驾驶员'
            }
        },
        
    },
    data() {
        return {
            flag:false,
            plate:'',
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            editFlag:false,
            editId:'',
            total:30,
            value1: '',
            value2: '',
            tableData:[],
            queryForm: {
                centerInfoId:'',
                name:'',
                jobNo:'',
                post:'',
                idcard:'',
                sex:'',
                telphone:'',
                status:'',
                page:1,
                size:10,
            },
            centerOptions:[],
            zzztoptions:[{
                value:'在职',
                id:1
            },{
                value:'离职',
                id:0
            }],
        }
    },

    created() {
        // 默认加载列表
        this.handlePag();
    },
    methods:{
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
                personInfo.personDeletes(id).then(res => {
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
            personInfo.personList(this.queryForm).then(res => {
                 console.log(res)
                 this.tableData = res.data.list;
                 this.total = res.data.total
                // this.tableData = res.data.data
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
