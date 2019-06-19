<template>
    <div>
        <el-form :model="form" ref="form" label-width="100px">
            <el-form-item label="所属中心" :label-width="formLabelWidth">
            <el-select v-model="form.centerInfoId" clearable placeholder="请选择">
                <el-option v-for="(item,index) in centerOptions" :key="index" :value="item.id" :label="item.name"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.nameLike" clearable></el-input>
            </el-form-item>
            <el-form-item label="员工工号" :label-width="formLabelWidth">
            <el-input v-model="form.jobNoLike" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="IC卡编号" :label-width="formLabelWidth">
            <el-input v-model="form.ICnum" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" clearable placeholder="请选择">
                <el-option v-for="item in optionSex" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.tel" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="职务" :label-width="formLabelWidth">
            <el-select v-model="form.postLike" clearable placeholder="请选择">
                <el-option v-for="item in optionJob" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="在职状态" :label-width="formLabelWidth">
            <el-select v-model="form.status" clearable placeholder="请选择">
                <el-option v-for="item in optionStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleEditdata(form)">确 定</el-button>
        </div>
    </div>
</template>


<script>
import { personInfo } from '@/api'
export default {
    name:'opate',
    data() {
        return {
            form: {
                centerInfoId:'',
                nameLike: '',
                postLike:'',
                jobNoLike: '',
                status: '',
            },
            //  optionSex:[{
            //     value:'男'
            // },{
            //     value:'女'
            // }],
            centerOptions:[{
                value:'本部分中心'
            },{
                value:'江北分中心'
            }],
             optionJob:[{
                value:'急救医生'
            },{
                value:'担架员'
            },{
                value:'驾驶员'
            }],
            optionStatus:[{
                value:'在职'
            },{
                value:'离职'
            }],
            formLabelWidth: '100px',
        }
    },
    props:{
        edit:{
            type:Boolean,
            default:false
        },
        editId:{
            type:[Number,Object,String],
            default:''
        }
    },
    created() {
        console.log(this.$refs.form)
        if(this.edit) {
            personInfo.personFindId(this.editId).then(res => {
                this.form = res.data;
            })
            // this.form = Object.assign(this.editId);
            // console.log(this.editId)
        }
    },
    mounted() {
        console.log(this.$refs.form.$el)
    },
    updated() {
        console.log('更新了')
        //this.form = Object.assign(this.editId);
    },
    destroyed() {
        
    },
    methods:{
        handleCancel() {
            this.$emit('dialogChange',false)
            // this.form={};
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
        handleEditdata(data1) {
            this.dialogFormVisible = false
            console.log(data1)
            // 添加提交
            if(!this.edit) {
                this.addSubmit();
                // this.tableData.push(this.user)
            }else{
                this.editSubmit()
            }
            // js 数据格式   =》 1.按值引用string number  2.按地址引用的 【】 {}
            //this.$set(this.tableData,data1['index'],data1)
        },
    }
}
</script>
<style lang="scss" scoped>
.dialog-footer{padding-bottom: 20px;}
</style>