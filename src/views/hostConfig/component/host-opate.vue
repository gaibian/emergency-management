<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading" element-loading-text="数据加载中...">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="主机编号">
                        <el-input v-model="form.hostNumber" placeholder="请输入主机编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车辆">
                        <el-select v-model="form.car_info_id" placeholder="请选择车辆">
                            <el-option v-for="(item,index) in carOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="固件版本号">
                        <el-input v-model="form.firmware_version" placeholder="请输入固件版本号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="软件版本号">
                        <el-input v-model="form.soft_version" placeholder="请输入软件版本号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleEditdata">确 定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'hostOpate',
    data() {
        return {
            form: {
                hostNumber: '',
                car_info_id: '',
                firmware_version: '',
                soft_version: '',
            },
            loading:false,
            carOptions:[],
          
        }
    },
    props:{
        edit:{
            type:Boolean,
            default:false
        },
        editId:{
            type:[Number,String],
            default:''
        }
    },
    async created() {
        await this.$api.carAdmin.carList().then(res => {
            this.carOptions = res.data
        })
        if(this.edit) {
            this.loading = true;
            await this.$api.hostAdmin.hostFindId(this.editId).then(res => {
                for(let i in this.form){
                    this.form[i] = res.data[i]
                }
                this.loading = false;
            })
        }
    },
    methods:{
        handleCancel() {
            this.$emit('dialogChange',false)
        },
        addSubmit() {
            this.$api.hostAdmin.hostAdd(this.form).then(res => {
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
        },
        editSubmit() {
            this.$api.hostAdmin.hostUpdate(this.editId,this.form).then(res => {
                console.log(res)
                this.$message({
                    message:'更新成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
             
        },
        handleEditdata(data1) {
            if(!this.edit) {
                this.addSubmit();
            }else{
                this.editSubmit()
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.dialog-footer{padding-bottom: 20px;}
</style>