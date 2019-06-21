<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading" element-loading-text="数据加载中...">
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
                        <el-input v-model="form.name" clearable placeholder="请填写姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='员工工号'>
                        <el-input v-model="form.jobNo" clearable placeholder="请填写员工工号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='IC卡编号'>
                        <el-input v-model="form.idcard" clearable placeholder="请填写IC卡编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='性别'>
                        <el-select v-model="form.sex" placeholder="请选择性别">
                            <el-option v-for="(item,index) in $dic.sexOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='手机号码'>
                        <el-input v-model="form.telphone" clearable placeholder="请填写手机号码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="职务">
                        <el-select v-model="form.post" placeholder="请选择职务">
                            <el-option v-for="(item,index) in $dic.postOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='状态'>
                        <el-select v-model="form.status" placeholder="请选择状态">
                            <el-option v-for="(item,index) in $dic.workStatusOptions" :key="index" :label="item.name" :value="item.id"></el-option>
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
export default {
    name:'perOpate',
    data() {
        return {
            form: {
                centerInfoId:'',
                name: '',
                post:'',
                idcard:'',
                jobNo: '',
                status: '',
                telphone:'',
                sex:''
            },
            loading:false,
            centerOptions:[],
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
        await this.$api.centerAdmin.centerList().then(res => {
            this.centerOptions = res.data
        })
        if(this.edit) {
            this.loading = true;
            this.$api.personInfo.personFindId(this.editId).then(res => {
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
            this.$api.personInfo.personAdd(this.form).then(res => {
                console.log(res)
                this.$message({
                    message:'人员添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            }) 
        },
        editSubmit() {
             this.$api.personInfo.personUpdate(this.editId,this.form).then(res => {
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