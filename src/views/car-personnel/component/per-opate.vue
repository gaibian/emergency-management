<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="所属中心">
                        <el-select v-model="form.centerInfoId" placeholder="请选择中心信息">
                            <el-option v-for="(item,index) in centerOptions" :key="index" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='员工工号'>
                        <el-input v-model="form.jobNo" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='IC卡编号'>
                        <el-input v-model="form.idcard" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='性别'>
                        <el-select v-model="form.sex" placeholder="请选择状态">
                            <el-option v-for="(item,index) in optionSex" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='手机号码'>
                        <el-input v-model="form.telphone" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="职务">
                        <el-select v-model="form.post" placeholder="请选择状态">
                            <el-option v-for="(item,index) in optionPost" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='状态'>
                        <el-select v-model="form.status" placeholder="请选择状态">
                            <el-option v-for="(item,index) in optionStatus" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
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
import { personInfo,centerAdmin } from '@/api'
export default {
    name:'opate',
    data() {
        return {
            form: {
                centerInfoId:'',
                name: '',
                post:'',
                jobNo: '',
                status: '',
            },
            loading:false,
            centerOptions:[],
             optionSex:[{
                name:'女',
                id:0
            },{
                name:'男',
                id:1
            }],
             optionPost:[{
                name:'急救医生',
                id:'DOCTOR'
            },{
                name:'担架员',
                id:'STRETCHER'
            },{
                name:'驾驶员',
                id:'DRIVER'
            }],
            optionStatus:[{
                name:'离职',
                value:0
            },{
                name:'在职',
                value:1
            }]
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
            this.centerOptions = res.data
        })
        if(this.edit) {
            this.loading = true;
            personInfo.personFindId(this.editId).then(res => {
                this.form = res.data;
                this.loading = false;
            })
        }
    },
    methods:{
        handleCancel() {
            this.$emit('dialogChange',false)
        },
        addSubmit() {
            personInfo.personAdd(this.form).then(res => {
                console.log(res)
                this.$message({
                    message:'人员添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            }) 
        },
        editSubmit() {
             personInfo.personUpdate(this.editId,this.form).then(res => {
                this.$message({
                    message:'人员更新成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
        },
        handleEditdata() {
            // 添加提交
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