<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加用户</el-button>
                <el-select class="filter-item" v-model="queryForm.centerInfoId" placeholder="请选择所属中心">
                    <el-option v-for="(item,index) in parentOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <div class="filter-item" style="width:200px;">
                    <el-input v-model="queryForm.usernameLike" placeholder="请输入用户名"></el-input>
                </div>
                <div class="filter-item" style="width:200px;">
                    <el-input v-model="queryForm.realNameLike" placeholder="请输入真实姓名"></el-input>
                </div>
                <el-button class="filter-item" type="primary" @click="handleQuery">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
               <el-table-column label="急救中心" prop="centerInfoName"></el-table-column>
               <el-table-column label="用户名" prop="userName"></el-table-column>
                <el-table-column label="真实姓名" prop="nickName"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex | sexFlter}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="身份证" prop="idCardNumber"></el-table-column> -->
                <el-table-column label="手机号" prop="telephone"></el-table-column>
                <!-- <el-table-column label="角色" prop="role"></el-table-column> -->
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="生日">
                    <template slot-scope="scope">
                        <span>{{scope.row.birthday | formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="'edit'" style="font-size:18px;cursor:pointer;margin-right:8px;color:#409EFF" @click="handleEdit(scope.row.id)">编辑</svg-icon>
                        <svg-icon :icon-class="'delete'" style="font-size:18px;cursor:pointer;color:#F56C6C" @click="handleDelete(scope.row.id)">删除</svg-icon>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="人员信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClose">
                <opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></opate>
            </el-dialog>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import selectPresonnel from '@/components/selectPresonnel'
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import opate from './component/user-opate'
import { userAdmin,centerAdmin } from '@/api'
export default {
    name:'accountInfo',
    components:{
        selectPresonnel,
        Pagination,
        opate
    },
    mixins:[pageMixins],
    filters:{
        sexFlter(value) {
            if(value == 1) {
                return '男'
            }else{
                return '女'
            }
        },
        formatDate(value) {
            if (value === null) {
                return '空'
            } else {
                var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + ' ';
                console.log(Y + M + D)
                return Y + M + D;
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
                centerInfoId:'',
                usernameLike:'',
                realNameLike:'',
                page: 1,
                size: 20,
            },
        }
    },
    created() {
        this.$api.centerAdmin.centerList().then(res => {
            this.parentOptions = res.data
           
        })
        this.handlePag();
    },
    methods:{
        handleQuery() {
            this.handlePag();
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
            this.$confirm('确定删除该用户?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(()=>{
                this.$api.userAdmin.userDeletes(id).then(res => {
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
            this.$api.userAdmin.userList(this.queryForm).then(res => {
                this.tableData = res.data.records;
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
