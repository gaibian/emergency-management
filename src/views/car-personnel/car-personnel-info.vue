<template>
    <div class="car-admin-container main-page" ref="mainContainer">
        <div class="top-info-box filter-container" ref="topAdd">
            <el-button class="filter-item" type="primary">添加人员</el-button>
            <div class="filter-item" style="width:300px;">
                <el-input v-model="plate" placeholder="人员">
                    <el-button slot="append" icon="el-icon-search" @click="handleClick">选择人员查询</el-button>
                </el-input>
            </div>
        </div>
        <select-presonnel :flag="flag" @change="handleChange"></select-presonnel>
        <el-table :data="tableData" border stripe :max-height="tableHeight" :height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="员工工号" prop="ygnum"></el-table-column>
            <el-table-column label="IC卡编号" prop="ICnum"></el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
            <el-table-column label="手机号码" prop="tel"></el-table-column>
            <el-table-column label="急救中心" prop="jijiu"></el-table-column>
            <el-table-column label="职务" prop="job"></el-table-column>
            <el-table-column label="在职状态" prop="status"></el-table-column>
            <el-table-column label="操作" width="176">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-popover placement="top" width="160" v-model="scope.row.visible2">
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="scope.row.visible2 = false">取消</el-button>
                            <el-button type="primary" size="mini" @click.native.prevent="deleteRow(scope.$index, tableData)">确定</el-button>
                        </div>
                        <el-button type="text" size="small" slot="reference">删除</el-button>
                    </el-popover>   
                    <!-- <el-button @click="handleDelete" type="danger">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" class="btm-group">
            <pagination :total="30" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
        </div>
    </div>
</template>
<script>
import selectPresonnel from '@/components/selectPresonnel'
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
export default {
    name:'carPersonnelInfo',
    components:{
        selectPresonnel,
        Pagination
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
            tableData:[],
            optionSex:[{
                value:'男'
            },{
                value:'女'
            }],
            optionJijiu:[{
                value:'本部分中心'
            },{
                value:'江北分中心'
            }],
             optionJob:[{
                value:'急救医生'
            },{
                value:'担架员'
            },{
                value:'驾驶员'
            }],
            form: {
                name: '',
                ygnum: '',
                ICnum: '',
                sex: '',
                job: '',
                card: ''
            },
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
                name:'张三三',
                num:'0128',
                sex:'女',
                job:'急救医生',
                card:'621422210001352'
            })
        }
    },
    methods:{
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
        row["index"]=index;
		this.form = Object.assign({}, row);
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
