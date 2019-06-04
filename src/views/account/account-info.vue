<template>
    <div class="car-admin-container main-page" ref="mainContainer">
        <div class="top-info-box filter-container" ref="topAdd">
            <el-button class="filter-item" type="primary">添加人员</el-button>
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
                    <el-popover placement="top" width="160" v-model="scope.row.visible2">
                        <p>确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="scope.row.visible2 = false">取消</el-button>
                            <el-button type="primary" size="mini" @click.native.prevent="deleteRow(scope.$index, tableData)">确定</el-button>
                        </div>
                        <el-button type="text" size="small" slot="reference">删除</el-button>
                    </el-popover>   
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" class="btm-group">
            <pagination :total="30" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
        </div>
        <!-- 编辑 -->
  <el-dialog title="人员信息" v-model="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width=30%>
    <el-form :model="form" label-width="100px">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.user" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role" clearable placeholder="请选择">
            <el-option v-for="item in optionrole" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.state" clearable placeholder="请选择">
            <el-option v-for="item in optionJob" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对应行数" :label-width="formLabelWidth" style="display:none;">
          <el-input v-model="form.index"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEditdata(form)">确 定</el-button>
    </div>
  </el-dialog>
    </div>
</template>
<script>
import selectPresonnel from '@/components/selectPresonnel'
import Pagination from '@/components/Pagination'
import pageMixins from '@/mixins'
export default {
    name:'carAdmin',
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
            optionrole:[{
                value:'管理员'
            },{
                value:'操作员'
            }],
            optionJob:[{
                value:'可用'
            },{
                value:'不可用'
            }],
            form: {
                name: '',
                user: '',
                password: '',
                role: '',
                state: '',
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
                name:'张三',
                user:'admin',
                password:'123456',
                role:'管理员',
                state:'可用',
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
