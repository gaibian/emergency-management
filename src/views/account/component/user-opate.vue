<template>
    <div>
        <el-form :model="form" ref="form">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username" clearable placeholder="请填写用户名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所属中心">
                        <el-select v-model="form.centerInfoId" placeholder="请选择所属中心">
                            <el-option v-for="(item,index) in parentOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="真实姓名">
                        <el-input v-model="form.realName" clearable placeholder="请填写真实姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="密码">
                        <el-input v-model="form.password" clearable placeholder="请填写密码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="身份证">
                        <el-input v-model="form.idCardNumber" clearable placeholder="请填写身份证"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="手机号">
                        <el-input v-model="form.phone" clearable placeholder="请填写手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="角色">
                        <el-select v-model="form.roleId" placeholder="请选择角色">
                            <el-option v-for="(item,index) in ruleOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别">
                        <el-select v-model="form.gender" placeholder="请选择性别">
                            <el-option v-for="(item,index) in genderOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" clearable placeholder="请填写邮箱"></el-input>
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
import { userAdmin,centerAdmin } from '@/api'
export default {
    name:'userOpate',
    data() {
        return {
            form: {
                centerInfoId: '',
                email: '',
                gender: '',
                idCardNumber: '',
                password:'',
                phone:'',
                realName:'',
                roleId:'',
                username:'',
            },
            genderOptions:[{
                name:'男',
                id:'Male'
            },{
                name:'女',
                id:'Female'
            }],
            ruleOptions:[],
            parentOptions:[],
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
        await centerAdmin.centerList().then(res => {
            this.parentOptions = res.data
            this.parentOptions.push({
                name:'无',
                id:null
            })
        })
        if(this.edit) {
            this.loading = true;
            userAdmin.userFindId(this.editId).then(res => {
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
            userAdmin.userAdd(this.form).then(res => {
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
        },
        editSubmit() {
            userAdmin.userUpdate(this.editId,this.form).then(res => {
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