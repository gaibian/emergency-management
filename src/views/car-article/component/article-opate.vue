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
                    <el-form-item label="物品编号">
                        <el-input v-model="form.cardNo" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='物品名称'>
                        <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="请选择状态">
                            <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.name" :value="item.id"></el-option>
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
import { articleAdmin,centerAdmin } from '@/api'
export default {
    name:'articleOpate',
    data() {
        return {
            form: {
                centerInfoId: '',
                cardNo: '',
                name: '',
                no:'',
                spec:'',
            },
            // statusOptions:[{
            //     name:'启用',
            //     id:1
            // },{
            //     name:'禁用',
            //     id:0
            // }],
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
        await centerAdmin.centerList().then(res => {
            this.centerOptions = res.data
        })
        if(this.edit) {
            this.loading = true;
            articleAdmin.articleFindId(this.editId).then(res => {
                console.log(res)
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
            articleAdmin.articleAdd(this.form).then(res => {
                console.log(res)
                this.$message({
                    message:'物品添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            }) 
        },
        editSubmit() {
            articleAdmin.articleUpdate(this.editId,this.form).then(res => {
                this.$message({
                    message:'物品更新成功',
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