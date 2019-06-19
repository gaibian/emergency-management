<template>
    <div>
        <el-form :model="form" ref="form">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="角色名称">
                        <el-input v-model="form.name" clearable placeholder="请填写角色名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="角色类型">
                        <el-select v-model="form.roleType" placeholder="请选择角色类型">
                            <el-option v-for="(item,index) in roleOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="描述">
                        <el-input v-model="form.description" clearable placeholder="请填写描述"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="配置权限">
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
import { roleAdmin } from '@/api'
export default {
    name:'roleOpate',
    data() {
        return {
            form: {
                name: '',
                description: '',
                roleType: '',
                permissions: '',
            },
            roleOptions:[],
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
            roleAdmin.roleFindId(this.editId).then(res => {
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
            roleAdmin.roleAdd(this.form).then(res => {
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
        },
        editSubmit() {
            roleAdmin.roleUpdate(this.editId,this.form).then(res => {
                this.$message({
                    message:'更新成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
        },
        handleEditdata() {
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