<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading" element-loading-text="数据加载中...">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="所属中心">
                        <!-- <el-select v-model="form.centerInfoId" placeholder="请选择中心信息">
                            <el-option v-for="(item,index) in centerOptions" :key="index" :value="item.id" :label="item.name"></el-option>
                        </el-select> -->
                        <select-tree :id.sync="form.centerInfoId" :placeholder.sync="treeVal" :data="treeData"></select-tree>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='物品名称'>
                        <el-input v-model="form.name" clearable placeholder="请填写物品名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="物品编号">
                        <el-input v-model="form.no" clearable placeholder="请填写物品编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='物品卡号'>
                        <el-input v-model="form.cardNo" clearable placeholder="请填写物品卡号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label='生产日期'>
                        <el-date-picker
                        v-model="form.proTime"
                        align="right"
                        type="date"
                        placeholder="选择生产日期"
                        format="yyyy-MM-dd" 
                        value-format="yyyy-MM-dd"
                        style="width:100%">
                        </el-date-picker>
                        <!-- <el-input v-model="form.proTime" clearable placeholder="请填写规格"></el-input> -->
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label='规格'>
                        <el-input v-model="form.spec" clearable placeholder="请填写规格"></el-input>
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
    name:'articleOpate',
    components:{
        selectTree
    },
    data() {
        return {
            form: {
                centerInfoId: '',
                cardNo: '',
                name: '',
                no:'',
                proTime:'',
                spec:'',
            },
            loading:false,
            treeVal:'请选择中心信息',
            listData:[],
            treeData:[],
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
            name: 'name',
            rootId: null
        };
        await this.$api.centerAdmin.centerList().then(res => {
            this.listData = this.$prototype.copyArr(res.data)
            let data = this.$prototype.copyArr(res.data)
            this.treeData = changeObject(data,attr)
        })
        if(this.edit) {
            this.loading = true;
            this.$api.articleAdmin.articleFindId(this.editId).then(res => {
                for(let i in this.form){
                    if(i == 'proTime'){
                            this.form[i] = this.formatDate(res.data[i])
                    }else{
                        this.form[i] = res.data[i]
                    }
                }
                this.listData.forEach(item => {
                    if(item.id === this.form.centerInfoId) {
                        this.treeVal = item.name;
                    }
                })
                
                this.loading = false;
            })
        }
    },
    methods:{
        formatDate(datetime) {
            console.log(datetime)
            if (datetime === null) {
                return '空'
            } else {
                var date = new Date(datetime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + '';
                return Y + M + D;
            }
        },
        handleCancel() {
            this.$emit('dialogChange',false)
        },
        addSubmit() {
            this.$api.articleAdmin.articleAdd(this.form).then(res => {
                console.log(res)
                this.$message({
                    message:'物品添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            }) 
        },
        editSubmit() {
            this.$api.articleAdmin.articleUpdate(this.editId,this.form).then(res => {
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