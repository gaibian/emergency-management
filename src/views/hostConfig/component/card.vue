<template>
    <div class="table-box">
        <div class="filter-container">
            <el-button class="filter-item" style="margin-bottom:0;" type="primary" size="mini" @click="handleBind">绑定卡片</el-button>
            <el-button class="filter-item" style="margin-bottom:0;" type="primary" size="mini" @click="handleRecord">绑定记录</el-button>
        </div>
        <el-table :data="tableData" :header-row-class-name="'table-header-box'" :max-height="tableHeight" v-loading="loading" stripe element-loading-text="数据加载中...">
            <el-table-column label="所属主机">
                <template slot-scope="scope">
                    <div v-if="scope.row.modifyFlag">
                        {{scope.row.host}}
                    </div>
                    <div v-else>
                        <el-input v-model="modifyForm.dataHostId"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="设备名称" min-width="100">
                <template slot-scope="scope">
                    <div v-if="scope.row.modifyFlag">
                        {{scope.row.deviceName}}
                    </div>
                    <div v-else>
                        <el-input v-model="modifyForm.deviceName"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="卡片编号" min-width="70">
                <template slot-scope="scope">
                    <div v-if="scope.row.modifyFlag">
                        {{scope.row.cardNo}}
                    </div>
                    <div v-else>
                        <el-input v-model="modifyForm.cardNo"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="设备编号" min-width="100">
                <template slot-scope="scope">
                    <div v-if="scope.row.modifyFlag">
                        {{scope.row.deviceNo}}
                    </div>
                    <div v-else>
                        <el-input v-model="modifyForm.deviceNo"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态" min-width="100">
                <template slot-scope="scope">
                    <div v-if="scope.row.modifyFlag">
                        {{scope.row.status}}
                    </div>
                    <div v-else>
                        <el-input v-model="modifyForm.status"></el-input>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column label="日期" prop="time" min-width="100"></el-table-column> -->
            <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                    <span>
                        <el-button type="primary" size="mini" @click="handleModify(scope)">{{scope.row.btnText}}</el-button>
                        <el-button size="mini" v-show="!scope.row.modifyFlag" @click="handleTableCancel(scope)">取消</el-button>
                        <el-button type="primary" size="mini" @click="handleClick(scope.row.id)">解绑</el-button>
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
                <!-- <el-col :span="6">
                    <el-form-item label="所属主机">
                        <el-select v-model="form.host" placeholder="请选择所属主机">
                            <el-option v-for="(item,index) in hostOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> -->
                <el-col :span="6">
                    <el-form-item label="设备名称">
                        <el-input v-model="form.deviceName" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="卡片编号">
                        <el-input v-model="form.cardNo" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="设备编号">
                        <el-input v-model="form.deviceNo" placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" justify="end">
                <el-button type="primary" size="mini" @click="handleSave">保存</el-button>
                <el-button size="mini" @click="handleCancel">取消</el-button>
            </el-row>
        </el-form>
    </div>
    </div>
    
</template>
<script>
import pagination from '@/components/Pagination'
import { hostAdmin } from '@/api'
export default {
    name:'cardInfo',
    props:{
        hostId:{
            type:[Number,String],
            default:''
        }
    },
    components:{
        pagination
    },
    data() {
        return {
            total:20,
            modifyFlag:true,
            listQuery:{
                dataHostId:'',
                page:2,
                limit:10
            },
            addFormFlag:false,
            form:{
                dataHostId:'',
                deviceName:'',
                deviceNo:'',
                cardNo:'',
            },
            modifyForm:{
                dataHostId:'',
                deviceName:'',
                deviceNo:'',
                cardNo:'',
            },
            tableHeight:190,
            tableData:[],
            loading:true,
        }
    },
    created() {
        this.form.dataHostId = this.hostId;
        this.listQuery.dataHostId = this.hostId;
        this.handlePag()
    },
    methods:{
        handleRecord() {  // 查看主机卡片的绑定记录
            hostAdmin.hostBindRecordFindId(this.hostId).then(res => {
                console.log(res)
            })
        },
        handleClick(id) {  // 解绑
            hostAdmin.hostUnBind(id).then(res => {
                this.$message({
                    message:'解绑成功',
                    type:'success'
                })
                this.handlePag();
            })
        },
        handleTableCancel(scope) {
            scope.row.modifyFlag = true;
            scope.row.btnText = '修改';
        },
        handleModify(scope) {  //修改
            if(scope.row.modifyFlag) {
                scope.row.btnText = '保存'
                scope.row.modifyFlag = false;
            }else{
                // 进行api提交
                hostAdmin.hostBindUpdate().then(res => {
                    this.$message({
                        message:'保存成功',
                        type:'success'
                    })
                    //scope.row.btnText = '修改'
                    this.handlePag()
                })
            }
            
        },
        handleSave() {
            hostAdmin.hostbindAdd(this.form).then(res => {
                this.$message({
                    message:'绑定卡片成功',
                    type:'success'
                })
                this.addFormFlag = false;
                this.handlePag();
            })
        },
        handleBind(id) {
            this.addFormFlag = true;
        },
        handleCancel() {
            this.addFormFlag = false;
        },
        handlePag() {
            this.loading = true;
            hostAdmin.hostbindList(this.listQuery).then(res => {
                console.log(res)
                this.tableData = res.data.map((item) => {
                    item.modifyFlag = true;
                    item.btnText = '修改'
                    return item
                });
                this.loading = false;
            })
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
