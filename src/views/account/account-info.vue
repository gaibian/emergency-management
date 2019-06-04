<template>
    <div class="car-admin-container main-page" ref="mainContainer">
        <div class="top-info-box filter-container" ref="topAdd">
            <el-button class="filter-item" type="primary" @click="handleAdd">添加人员</el-button>
            <div class="filter-item" style="width:300px;">
                <el-input v-model="plate" placeholder="请输入人员编号或姓名">
                    <el-button slot="append" icon="el-icon-search">查询</el-button>
                </el-input>
            </div>
        </div>
        <select-presonnel :flag="flag" @change="handleChange"></select-presonnel>
        <el-table :data="tableData" border stripe :max-height="tableHeight" :height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="账号" prop="user"></el-table-column>
            <el-table-column label="密码" prop="password"></el-table-column>
            <el-table-column label="角色" prop="role"></el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="操作" width="176">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button @click="handleDelete(scope)">删除</el-button>
                    <!-- <el-popover placement="top" width="160" v-model="scope.row.visible2">
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="scope.row.visible2 = false">取消</el-button>
                            <el-button type="primary" size="mini" @click.native.prevent="deleteRow(scope.$index, tableData)">确定</el-button>
                        </div>
                        <el-button type="text" size="small" slot="reference">删除</el-button>
                    </el-popover>-->
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" class="btm-group">
            <pagination :total="30" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
        </div>
        <!-- 编辑 -->
    <el-dialog title="人员信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width=30%>
        <opate :edit="editFlag" :id="editId" @dialogChange="handleOpate"></opate>
    </el-dialog>
    </div>
</template>
<script>
import selectPresonnel from '@/components/selectPresonnel'
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
import opate from './component/opate'
import { setTimeout } from 'timers';
export default {
    name:'accountInfo',
    components:{
        selectPresonnel,
        Pagination,
        opate
    },
    mixins:[pageMixins],
    data() {
        return {
            editFlag:false,
            fenbu:'',
            flag:false,
            plate:'',
            editId:null,
            tableLoading:true,
            tableHeight:null,
            dialogFormVisible: false,
            tableData:[],
        }
    },
    filters:{
        statusFilters(val) {
            switch(val) {
                case '1':
                return '待命中'
                break;
            }
        }
    },
    created() {
        this.tableLoading = false;
        for(let i=0;i<20;i++){
            this.tableData.push({
                name:'张三',
                user:'admin',
                password:'123456',
                role:'管理员',
                state:'可用',
                id:1,
            })
        }
    },
    methods:{
        handleOpate(boo){
            console.log(boo)
            this.tableLoading = true;
            setTimeout(() => {
                this.tableLoading = false;
            },200)
            this.dialogFormVisible = false;
        }, 
        handleAdd() {
            this.dialogFormVisible = true;
            this.editFlag = false;
        },
        handleDelete(scope) {
            this.$confirm('确定删除该代理人?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                // agencyDelete(scope.row.id).then(res => {
                //     if(res !== 'error'){
                //         _g.toastMsg('success','删除成功')
                //         this.update = !this.update;
                //     }
                // })
            })
        },
        handlePag(data) {
            setTimeout(() => {
                this.tableLoading = false;
            }, 2000);
            console.log(data)
        },
        handleClick() {
            this.flag = true;
        },
        handleChange(data) {
            if(data.keys) {
                this.plate = data.carPlate;
                console.log(data.keys)
            }
            this.flag = data.flag;
        },
    //   deleteRow(index, rows) {
    //     rows.splice(index, 1);
    //   },
      // 编辑
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.editFlag = true;
        row["index"]=index;
        this.editId = row.id
        console.log(this.editId)
        this.form = Object.assign({}, row);
      },
      // 更新一行数据
      
    }
}
</script>
<style lang="scss" scoped>
.car-admin-container{
    width:100%;
    height:100%;
    font-size:16px;
    color:#333;
}
.btm-group{
    padding-top:12px;
    box-sizing: border-box;
}
.top-info-box{
    width:100%;
}
.el-dialog__body{
    padding: 0 !important;
}
.el-select{
    width: 100%;
}
</style>
