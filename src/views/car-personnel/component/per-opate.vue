<template>
    <div>
        <el-form :model="form" ref="form" label-width="100px">
            <el-form-item label="所属中心" :label-width="formLabelWidth">
            <el-input v-model="form.jijiu" clearable></el-input>
            </el-form-item>
            <el-form-item label="车牌号" :label-width="formLabelWidth">
            <el-input v-model="form.plate" clearable></el-input>
            </el-form-item>
            <el-form-item label="车编号" :label-width="formLabelWidth">
            <el-input v-model="form.carnum" clearable></el-input>
            </el-form-item>
            <el-form-item label="车辆状态" :label-width="formLabelWidth">
            <el-select v-model="form.status" clearable placeholder="请选择">
                <el-option v-for="item in optionJob" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="对应行数" :label-width="formLabelWidth" style="display:none;">
            <el-input v-model="form.index"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleEditdata(form)">确 定</el-button>
        </div>
    </div>
</template>


<script>
export default {
    name:'opate',
    data() {
        return {
            form: {
                name: '',
                user: '',
                password: '',
                role: '',
                state: '',
            },
            optionrole:[{
                value:'管理员'
            },{
                value:'操作员'
            }],
            optionJob:[{
                value:'可用'
            },{
                value:'不可用'
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
            this.form = Object.assign(this.editId);
            console.log(this.editId)
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
            this.form={};
        },
        addSubmit() {
            this.$emit('dialogChange',false)
            this.form={};
        },
        editSubmit() {
             this.$emit('dialogChange',false)
            // editSave(this.editId,this.form).then(res => {
            //     this.$emit('dialogChange',false)
            // })
            this.form={};
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