<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading" element-loading-text="数据加载中...">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="上级资源">
                        <select-tree :id.sync="form.parentId" :placeholder.sync="treeVal" :data="treeData"></select-tree>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="资源名称">
                        <el-input v-model="form.name" clearable placeholder="请填写角色名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="sourceKey">
                        <el-input v-model="form.sourceKey" clearable placeholder="请填写sourceKey"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="资源类型">
                        <el-select v-model="form.type" placeholder="请选择资源类型">
                            <el-option v-for="item in $dic.menuTypeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="描述">
                        <el-input v-model="form.description" clearable placeholder="请填写描述"></el-input>
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
import selectTree from '@/components/selectTree'
import changeObject from '@/utils/changeObject'
export default {
    name:'menuOpate',
    components:{
        selectTree
    },
    data() {
        return {
            form: {
                parentId:'',
                name: '',
                description: '',
                sourceKey: '',
                type:'',
            },
            treeVal:'请选择上级资源',
            treeData:[],
            parentOptions:[],
            loading:false,
            listData:[],
            
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
        let attr = {
            id: 'id',
            parendId: 'parentId',
            sourceKey:'sourceKey',
            name: 'name',
            type: 'type',
            rootId: null
        };
        await this.$api.menuAdmin.menuList().then(res => {
            this.listData = this.$prototype.copyArr(res.data)
            let data = this.$prototype.copyArr(res.data)
            this.treeData = changeObject(data,attr)
        })
        if(this.edit) {
            this.loading = true;
            await this.$api.menuAdmin.menuFindId(this.editId).then(res => {
                for(let i in this.form){
                    this.form[i] = res.data[i]
                }
                this.listData.forEach(item => {
                    if(this.form.parentId === null || this.form.parentId == '') {
                        this.treeVal = '顶级'
                    }else if(item.id === this.form.parentId){
                        this.treeVal = item.name;
                    }
                })
                
                this.loading = false;
            })
        }
    },
    methods:{
        
        handleCancel() {
            this.$emit('dialogChange',false)
        },
        addSubmit() {
            this.$api.menuAdmin.menuAdd(this.form).then(res => {
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
        },
        editSubmit() {
            this.$api.menuAdmin.menuUpdate(this.editId,this.form).then(res => {
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