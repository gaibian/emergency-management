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
                    <el-form-item label="车牌号">
                        <el-input v-model="form.carNo" clearable placeholder="请填写车牌号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='车编号'>
                        <el-input v-model="form.carNumber" clearable placeholder="请填写车编号"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="请选择车辆状态">
                            <el-option v-for="(item,index) in $dic.carStatusOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> -->
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
    name:'opate',
    data() {
        return {
            form: {
                centerInfoId: '',
                carNumber: '',
                carNo: '',
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
            type:[Number,Object,String],
            default:''
        }
    },
    async created() {
        await this.$api.centerAdmin.centerList().then(res => {
            this.centerOptions = res.data
        })
        if(this.edit) {
            this.loading = true;
            this.$api.carAdmin.carFindId(this.editId).then(res => {
                console.log(res)
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
            this.$api.carAdmin.carAdd(this.form).then(res => {
                console.log(res)
                this.$message({
                    message:'车辆添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            }) 
        },
        editSubmit() {
            this.$api.carAdmin.carUpdate(this.editId,this.form).then(res => {
                this.$message({
                    message:'车辆更新成功',
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
        }
    }
}
</script>
<style lang="scss" scoped>
.dialog-footer{padding-bottom: 20px;}
</style>