<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading" element-loading-text="数据加载中...">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="中心名称">
                        <el-input v-model="form.name" placeholder="请输入中心信息"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="上级中心">
                        <el-select v-model="form.parentId" placeholder="请选择上级中心">
                            <el-option v-for="(item,index) in parentOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="经度">
                        <el-input v-model="form.longitude" placeholder="请输入经度"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="维度">
                        <el-input v-model="form.latitude" placeholder="请输入维度"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="状态">
                        <el-select v-model="form.status" placeholder="请选择状态">
                            <el-option v-for="(item,index) in $dic.statusOptions" :label="item.name" :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="地址">
                        <el-input v-model="form.address" placeholder="请输入所在地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input v-model="form.remark" placeholder="请填写备注"></el-input>
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
export default {
    name:'centerOpate',
    data() {
        return {
            form: {
                address: '',
                latitude: '',
                longitude: '',
                name: '',
                parentId:null,
                remark:'',
                status:'',
            },
            loading:false,
            parentOptions:[],
            // statusOptions:[{
            //     name:'启用',
            //     id:1
            // },{
            //     name:'禁用',
            //     id:0
            // }],
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
            this.parentOptions = res.data
            this.parentOptions.push({
                name:'无',
                id:null
            })
        })
        if(this.edit) {
            this.loading = true;
            await this.$api.centerAdmin.centerFindId(this.editId).then(res => {
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
            this.$api.centerAdmin.centerAdd(this.form).then(res => {
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
        },
        editSubmit() {
            this.$api.centerAdmin.centerUpdate(this.editId,this.form).then(res => {
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