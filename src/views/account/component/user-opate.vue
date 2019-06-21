<template>
    <div>
        <el-form :model="form" ref="form">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="用户名">
                        <el-input v-model="form.userName" clearable placeholder="请填写用户名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所属中心">
                        <el-select v-model="form.centerInfoId" placeholder="请选择所属中心">
                            <el-option v-for="(item,index) in parentOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="真实姓名">
                        <el-input v-model="form.nickName" clearable placeholder="请填写真实姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="密码">
                        <el-input v-model="form.password" :disabled="edit" clearable placeholder="请填写密码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="手机号">
                        <el-input v-model="form.telephone" clearable placeholder="请填写手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="生日">
                        <el-date-picker
                        v-model="form.birthday"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd" 
                        value-format="yyyy-MM-dd"
                        style="width:100%"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="锁定">
                        <el-select v-model="form.locked" placeholder="请选择是否锁定用户">
                            <el-option v-for="(item,index) in $dic.statusOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                            <el-option v-for="(item,index) in $dic.sexOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" clearable placeholder="请填写邮箱"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="地址信息">
                        <el-input v-model="form.address" placeholder="请填写地址信息"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="描述信息">
                        <el-input v-model="form.description" placeholder="请填写描述信息"></el-input>
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
    name:'userOpate',
    data() {
        return {
            form: {
                centerInfoId: '',
                email: '',
                sex: '',
                birthday:'',
                //idCardNumber: '',
                password:'',
                telephone:'',
                nickName:'',
                address:'',
                //roleId:'',
                locked:'',
                userName:'',
                description:'',
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
                },
            genderOptions:[{
                name:'男',
                id:'Male'
            },{
                name:'女',
                id:'Female'
            }],
            ruleOptions:[],
            parentOptions:[],
            loading:false,
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
            this.parentOptions = res.data
        })
        if(this.edit) {
            this.loading = true;
            this.$api.userAdmin.userFindId(this.editId).then(res => {
                for(let i in this.form){
                    if(i == 'birthday'){
                        this.form[i] = this.formatDate(res.data[i])
                    }else{
                        this.form[i] = res.data[i]
                    }
                    
                }
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
                let D = date.getDate() + ' ';
                return Y + M + D;
            }
        },
        handleCancel() {
            this.$emit('dialogChange',false)
        },
        addSubmit() {
            this.$api.userAdmin.userAdd(this.form).then(res => {
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
                this.$emit('dialogChange',true)
            })
        },
        editSubmit() {
            this.$api.userAdmin.userUpdate(this.editId,this.form).then(res => {
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