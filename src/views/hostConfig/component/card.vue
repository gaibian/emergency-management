<template>
    <div class="table-box">
        <div class="filter-container">
            <el-button class="filter-item" style="margin-bottom:0;" type="primary" size="mini" @click="handleBind">绑定卡片</el-button>
        </div>
        <el-table :data="tableData" :header-row-class-name="'table-header-box'" :max-height="tableHeight" v-loading="loading" stripe element-loading-text="数据加载中...">
            <el-table-column label="所属主机">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.hostNumber}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="设备名称" min-width="100">
                <template slot-scope="scope">
                    <div v-if="scope.row.modifyFlag">
                        {{scope.row.deviceName}}
                    </div>
                    <div v-else>
                        <el-input v-model="scope.row.deviceName"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="卡片编号" min-width="70">
                <template slot-scope="scope">
                    <div v-if="scope.row.modifyFlag">
                        {{scope.row.cardNo}}
                    </div>
                    <div v-else>
                        <el-input v-model="scope.row.cardNo"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="设备编号" min-width="100">
                <template slot-scope="scope">
                    <div v-if="scope.row.modifyFlag">
                        {{scope.row.deviceNo}}
                    </div>
                    <div v-else>
                        <el-input v-model="scope.row.deviceNo"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="路数" prop="hardwareChannels"></el-table-column>
            <!-- <el-table-column label="状态" min-width="100">
                <template slot-scope="scope">
                    <div>
                        <el-tag :type="scope.row.status == 0 ? 'danger' : ''">{{scope.row.status | cardStatus}}</el-tag>
                    </div>
                </template>
            </el-table-column> -->
            <!-- <el-table-column label="日期" prop="time" min-width="100"></el-table-column> -->
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <span>
                        <el-button type="primary" size="mini" @click="handleModify(scope)">{{scope.row.btnText}}</el-button>
                        <el-button size="mini" v-show="!scope.row.modifyFlag" @click="handleTableCancel(scope)">取消</el-button>
                        <el-button type="danger" size="mini" @click="handleClick(scope.row.id)">解绑</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <!---->
        <div class="btm-group">
            <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.size" @loadingChange="loading = true" @pagination="handlePag"></pagination>
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
                    <el-form-item label="设备编号">
                        <el-input v-model="form.deviceNo" placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="卡片编号">
                        <el-input v-model="form.cardNo" placeholder="请输入设备名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="路数">
                        <el-input v-model="form.hardwareChannels" placeholder="请输入路数"></el-input>
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
export default {
    name:'cardInfo',
    props:{
        hostId:{
            type:[Number,String],
            default:''
        },
        hostNumber:{
            type:String,
            default:''
        }
    },
    filters:{
        cardStatus(value) {
            if(value == 0) {
                return '未绑定'
            }else{
                return '绑定'
            }
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
                page:1,
                size:10
            },
            addFormFlag:false,
            form:{
                dataHostId:'',
                deviceName:'',
                deviceNo:'',
                cardNo:'',
                hardwareChannels:'',
            },
            // recordForm:{
            //     page:1,
            //     size:10,
            //     hostNumberLike:'',
            // },
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
        handleClick(id) {  // 解绑
            this.$api.hostAdmin.hostUnBind(id).then(res => {
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
                this.$api.hostAdmin.hostBindFindId(scope.row.id).then(res => {
                    console.log(res)
                    
                    for(let i in scope.row){
                        scope.row[i] = res.data[i]
                    }
                    console.log(scope.row)
                    scope.row.btnText = '保存'
                    scope.row.modifyFlag = false;
                })
                
            }else{
                // 进行api提交
                let data = {}
                for(let i in scope.row){
                    if(i != 'id'){
                        data[i] = scope.row[i]
                    }
                }
                console.log(data)
                this.$api.hostAdmin.hostBindUpdate(scope.row.id,data).then(res => {
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
            this.$api.hostAdmin.hostBindAdd(this.form).then(res => {
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
            this.$api.hostAdmin.hostBindList(this.listQuery).then(res => {
                console.log(res)
                this.tableData = res.data.records.map((item) => {
                    item.modifyFlag = true;
                    item.btnText = '修改'
                    return item
                });
                this.total = res.data.total
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
