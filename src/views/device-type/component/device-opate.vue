<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading" element-loading-text="数据加载中...">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="设备编号">
                        <el-input placeholder="请输入设备编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="设备名称">
                        <el-input v-model="form.firmware_version" placeholder="请输入设备名称"></el-input>
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
    name:'devicOpate',
    data() {
        return {
            form: {
                
            },
            loading:false,
          
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
        if(this.edit) {
            this.loading = true;
            await this.$api.deviceType.deviceTypeFindId(this.editId).then(res => {
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
            this.$api.deviceType.deviceTypeAdd(this.form).then(res => {
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
        },
        editSubmit() {
            this.$api.deviceType.deviceTypeUpdate(this.editId,this.form).then(res => {
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