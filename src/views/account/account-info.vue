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
                <el-table-column label="操作" fixed="right" width="250px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                        <el-button type="primary" size="mini" @click="handleRole(scope.row.id)">关联角色</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="人员信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="dialogClose">
                <opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></opate>
            </el-dialog>
            <!--关联角色-->
            <el-dialog title="关联角色" v-model="dialogRoleVisible" :visible.sync="dialogRoleVisible" width="300px" :close-on-click-modal="false" @close="dialogRoleClose">
                <!-- <opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></opate> -->
                <choice-role v-if="dialogRoleVisible" @changeClose="roleClose" :id="editId"></choice-role>
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
import opate from './component/user-opate'
import choiceRole from './component/choiceRole'
export default {
    name:'accountInfo',
    components:{
        Pagination,
        opate,
        choiceRole
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
            dialogRoleVisible:false,
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
        roleClose(flag) {
            console.log(flag)
            this.dialogRoleVisible = false;
        },
        handleRole(id) { // 关联角色
            this.editId = id;
            this.dialogRoleVisible = true;
        },
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
        dialogRoleClose() {
            this.dialogRoleClose = false;
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
