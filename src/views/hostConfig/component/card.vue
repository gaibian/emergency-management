<template>
    <div class="table-box">
        <div class="filter-container">
            <el-button class="filter-item" style="margin-bottom:0;" type="primary" size="mini" @click="handleBind">绑定卡片</el-button>
            <el-button class="filter-item" style="margin-bottom:0;" type="primary" size="mini" @click="handleRecord">绑定记录</el-button>
        </div>
        <el-table :data="tableData" :header-row-class-name="'table-header-box'" :max-height="tableHeight" v-loading="loading" stripe element-loading-text="数据加载中...">
            <el-table-column label="所属主机" prop="host"></el-table-column>
            <el-table-column label="设备名称" prop="hostName" min-width="100"></el-table-column>
            <el-table-column label="卡片编号" prop="cardNum" min-width="70"></el-table-column>
            <el-table-column label="设备编号" prop="equipmentNum" min-width="100"></el-table-column>
            <el-table-column label="状态" prop="jcaddress" min-width="100"></el-table-column>
            <el-table-column label="日期" prop="time" min-width="100"></el-table-column>
            <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                    <span>
                        <el-button type="primary" size="mini" @click="handleClick(scope)">解绑</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <div class="btm-group">
            <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="loading = true" @pagination="handlePag"></pagination>
        </div>
        <div class="form-box" v-show="addFormFlag">
        <!-- <el-row>绑定卡片</el-row> -->
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-form-item label="所属主机">
                        <el-select v-model="form.host" placeholder="请选择所属主机">
                            <el-option v-for="(item,index) in hostOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="设备名称">
                        <el-input v-model="form.hostName" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="卡片编号">
                        <el-input v-model="form.cardNum" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="设备编号">
                        <el-input v-model="form.equipmentNum" placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" justify="end">
                <el-button type="primary" size="mini">保存</el-button>
                <el-button size="mini" @click="handleCancel">取消</el-button>
            </el-row>
        </el-form>
    </div>
    </div>
    
</template>
<script>
import pagination from '@/components/Pagination'
export default {
    name:'cardInfo',
    components:{
        pagination
    },
    data() {
        return {
            total:20,
            listQuery:{
                page:2,
                limit:10
            },
            addFormFlag:false,
            hostOptions:[{
                name:'1号主机',
                id:1
            },{
                name:'2号主机',
                id:2
            }],
            form:{
                host:'',
                hostName:'',
                cardNum:'',
                equipmentNum:'',
            },
            tableHeight:190,
            tableData:[{
                host:'1号主机',
                hostName:'电本',
                cardNum:'HUJ987',
                equipmentNum:'8754467',
                jcaddress:'绑定',
                time:'2019-09-23'
            },{
                host:'1号主机',
                hostName:'电本',
                cardNum:'HUJ987',
                equipmentNum:'8754467',
                jcaddress:'绑定',
                time:'2019-09-23'
            },{
                host:'1号主机',
                hostName:'电本',
                cardNum:'HUJ987',
                equipmentNum:'8754467',
                jcaddress:'绑定',
                time:'2019-09-23'
            },{
                host:'1号主机',
                hostName:'电本',
                cardNum:'HUJ987',
                equipmentNum:'8754467',
                jcaddress:'绑定',
                time:'2019-09-23'
            },{
                host:'1号主机',
                hostName:'电本',
                cardNum:'HUJ987',
                equipmentNum:'8754467',
                jcaddress:'绑定',
                time:'2019-09-23'
            },{
                host:'1号主机',
                hostName:'电本',
                cardNum:'HUJ987',
                equipmentNum:'8754467',
                jcaddress:'绑定',
                time:'2019-09-23'
            },{
                host:'1号主机',
                hostName:'电本',
                cardNum:'HUJ987',
                equipmentNum:'8754467',
                jcaddress:'绑定',
                time:'2019-09-23'
            }],
            loading:true,
        }
    },
    created() {
        this.handlePag()
    },
    methods:{
        handleRecord() {

        },
        handleClick(scope) {

        },
        handleBind() {
            this.addFormFlag = true;
        },
        handleCancel() {
            this.addFormFlag = false;
        },
        handlePag() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }
    }
}
</script>
<style lang="scss" scoped>
.form-box{
    background:#eff4f7;
    padding:12px;
    box-sizing:border-box;
    border:#e5e5e5 1px solid;
    margin:12px 0;
}
</style>
