<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <select-presonnel :flag="flag" @change="handleChange"></select-presonnel>
        <div class="table-box">
            <div class="filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加人员</el-button>
                <div class="filter-item" style="width:300px;">
                <el-input v-model="plate" placeholder="请输入姓名或工号"></el-input>
                </div>
                <div class="filter-item">
                <el-select v-model="value1" placeholder="请选择所属中心">
                    <el-option v-for="item in jijiuoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                </div>
                <div class="filter-item">
                <el-select v-model="value2" placeholder="请选择在职状态">
                    <el-option v-for="item in zzztoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                </div>
                <el-button class="filter-item" type="primary">查询</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="急救中心" prop="jijiu"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="员工工号" prop="ygnum"></el-table-column>
                <el-table-column label="IC卡编号" prop="ICnum"></el-table-column>
                <el-table-column label="性别" prop="sex"></el-table-column>
                <el-table-column label="手机号码" prop="tel"></el-table-column>
                <el-table-column label="职务" prop="job"></el-table-column>
                <el-table-column label="在职状态" prop="status"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <svg-icon :icon-class="'edit'" style="font-size:18px;cursor:pointer;margin-right:8px;color:#409EFF" @click="handleEdit(scope.$index, scope.row)">编辑</svg-icon>
                        <svg-icon :icon-class="'delete'" style="font-size:18px;cursor:pointer;color:#F56C6C" @click="handleDelete(scope)">删除</svg-icon>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="人员信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width=30%>
                <peropate :edit="editFlag" v-if="dialogFormVisible" :editId="editId" @dialogChange="handleOpate"></peropate>
            </el-dialog>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import selectPresonnel from '@/components/selectPresonnel'
import Pagination from '@/components/Pagination'
import peropate from './component/per-opate'
import pageMixins from '@/mixins'
export default {
    name:'carPersonnelInfo',
    components:{
        selectPresonnel,
        Pagination,
        peropate
    },
    mixins:[pageMixins],
    data() {
        return {
            fenbu:'',
            flag:false,
            plate:'',
            tableLoading:true,
            tableHeight:null,
            formLabelWidth: '100px',
            dialogFormVisible: false,
            value6:'',
            total:30,
            value1: '',
            value2: '',
            tableData:[],
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
            form: {
                jijiu:'',
                name: '',
                ygnum: '',
                ICnum: '',
                sex: '',
                tel:'',
                job: '',
                status: ''
            },
            jijiuoptions:[{
                value:'中医院'
            },{
                value:'李惠利东部医院'
            }],
            zzztoptions:[{
                value:'在职'
            },{
                value:'离职'
            }],
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
                jijiu:'中医院急救点',
                name: '张三三',
                ygnum: '0128',
                ICnum: '01',
                sex: '女',
                tel:'13333333333',
                job: '急救医生',
                status: '在职'
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
            this.$confirm('确定删除该人员?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
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
        // handleEdit() {
        //     console.log('编辑了')
        // },
        // handleDelete() {
        //     console.log('删除了')
        // }
        // 删除一行
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      // 编辑
      handleEdit: function (index, row) {
		this.dialogFormVisible = true;
        this.editFlag = true;
        this.editId =  Object.assign(row);
      },
      // 更新一行数据
      handleEditdata: function (data1) {
        this.dialogFormVisible = false
        console.log(data1)
        // js 数据格式   =》 1.按值引用string number  2.按地址引用的 【】 {}
        this.$set(this.tableData,data1['index'],data1)
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
