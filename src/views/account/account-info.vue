<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button v-if="addShow" class="filter-item" type="primary" @click="handleAdd">添加用户</el-button>
                <el-select v-if="listShow" class="filter-item" v-model="queryForm.centerInfoId" placeholder="请选择所属中心">
                    <el-option v-for="(item,index) in parentOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <div v-if="listShow" class="filter-item" style="width:200px;">
                    <el-input v-model="queryForm.usernameLike" clearable placeholder="请输入用户名"></el-input>
                </div>
                <div v-if="listShow" class="filter-item" style="width:200px;">
                    <el-input v-model="queryForm.realNameLike" clearable placeholder="请输入真实姓名"></el-input>
                </div>
                <el-button v-if="listShow" class="filter-item" type="primary" :disabled="queryDisabled" @click="handleQuery">查询</el-button>
            </div>
            <el-table v-if="listShow" :data="tableData" @selection-change="handleSelectionChange" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
               <el-table-column type="selection" width="55"></el-table-column>
               <el-table-column label="急救中心" prop="centerInfoName" min-width="130"></el-table-column>
               <el-table-column label="用户名" prop="userName" min-width="120"></el-table-column>
                <el-table-column label="真实姓名" prop="nickName"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex | sexFlter}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="部门" prop="departName"></el-table-column>
                <!-- <el-table-column label="身份证" prop="idCardNumber"></el-table-column> -->
                <el-table-column label="手机号" prop="telephone" min-width="120"></el-table-column>
                <!-- <el-table-column label="角色" prop="role"></el-table-column> -->
                <el-table-column label="地址" prop="address" min-width="200px"></el-table-column>
                <el-table-column label="生日" min-width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.birthday | formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" :width="`${opateWidth}px`">
                    <template slot-scope="scope">
                        <el-button class="opate-button" type="primary" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button class="opate-button" v-if="deleteShow" type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                        <el-button class="opate-button" type="primary" size="mini" @click="handleRole(scope.row.id)">关联角色</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="人员信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" @close="dialogClose">
                <account-opate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></account-opate>
            </el-dialog>
            <!--关联角色-->
            <el-dialog title="关联角色" v-model="dialogRoleVisible" :visible.sync="dialogRoleVisible" width="500px" @close="dialogRoleClose">
                <choice-role v-if="dialogRoleVisible" @changeClose="roleClose" :id="editId"></choice-role>
            </el-dialog>
            <div ref="btmGroup" class="btm-group" v-if="listShow">
                <el-row type="flex" align="middle" justify="space-between">
                    <el-button v-if="deleteShow" @click="handleDeletes">批量删除</el-button>
                    <pagination :total="total" :page.sync="queryForm.page" :limit.sync="queryForm.size" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import opateWidth from '@/mixins/opate-width'
import accountOpate from './component/accountOpate'
import choiceRole from './component/choiceRole'
import { powerShow } from '@/utils/power-filter'
export default {
    name:'accountInfo',
    components:{
        Pagination,
        accountOpate,
        choiceRole
    },
    mixins:[pageMixins,opateWidth],
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
                return ''
            } else {
                var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
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
            total:0,
            queryDisabled:false,
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
            ids:'',
        }
    },
    created() {
        this.$api.centerAdmin.centerList().then(res => {
            this.parentOptions = res.data
        })
        this.handlePag();
    },
    methods:{
        handleSelectionChange(data) {
            this.ids = '';
            data.forEach(item => {
                this.ids += `${item.id},`
            })
        },
        handleDeletes() {
            this.handleDelete(this.ids)
        },
        roleClose(flag) {
            this.dialogRoleVisible = false;
            this.editId = '';
        },
        handleRole(id) { // 关联角色
            this.editId = id;
            this.dialogRoleVisible = true;
        },
        handleQuery() {
            this.queryForm.page = 1;
            this.queryDisabled = true;
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
                this.queryDisabled = false;
                this.total = res.data.total
                this.buttonInit();
            }).catch(() => {
                this.queryDisabled = false;
            })
        },
        dialogRoleClose() {
            this.dialogRoleClose = false;
            this.editId = '';
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
    },
    computed:{
        listShow() {
            return powerShow('user:list')
        },
        addShow() {
            return powerShow('user:create')
        },
        deleteShow() {
            return powerShow('user:deleteBatch')
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
