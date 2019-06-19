<template>
    <div>
        <el-form :model="form" ref="form">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="所属中心">
                        <el-select v-model="form.centerInfoId" placeholder="请选择中心信息">
                            <el-option v-for="(item,index) in centerOptions" :key="index" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="车牌号">
                        <el-input v-model="form.carNo" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='车编号'>
                        <el-input v-model="form.carNumber" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="请选择状态">
                            <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            
            
            

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleEditdata(form)">确 定</el-button>
        </div>
    </div>
</template>


<script>
import { carAdmin,centerAdmin } from '@/api'
export default {
    name:'opate',
    data() {
        return {
            form: {
                centerInfoId: '',
                carNumber: '',
                carNo: '',
                status:'',
            },
            statusOptions:[{
                name:'启用',
                id:1
            },{
                name:'禁用',
                id:0
            }],
            centerOptions:[],
            optionrole:[{
                value:'管理员'
            },{
                value:'操作员'
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
    async created() {
        await centerAdmin.centerList().then(res => {
            this.centerOptions = res.data
        })
        if(this.edit) {
            carAdmin.carFindId(this.editId).then(res => {
                console.log(res)
                this.form = res.data;
            })
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
        // 写js 内存泄漏
        
    },
    methods:{
        handleCancel() {
            this.$emit('dialogChange',false)
            //this.form={};
        },
        addSubmit() {
            carAdmin.carAdd(this.form).then(res => {
                console.log(res)
                this.$message({
                    message:'车辆添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            }) 
        },
        editSubmit() {
            carAdmin.carUpdate(this.editId,this.form).then(res => {
                this.$message({
                    message:'车辆更新成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
             
            // editSave(this.editId,this.form).then(res => {
            //     this.$emit('dialogChange',false)
            // })
            //this.form={};
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