<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules" v-loading="loading" label-position="top" element-loading-text="数据加载中...">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="form.userName" clearable placeholder="请填写用户名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所属中心" prop="centerInfoId">
                        <tree-select :props="props"
                        :options="treeCenterData"
                        :value.sync="form.centerInfoId"
                        :clearable="isClearable"
                        :accordion="isAccordion"
                        style="width:100%">
                        </tree-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="真实姓名" prop="nickName">
                        <el-input v-model="form.nickName" clearable placeholder="请填写真实姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" v-if="!edit">
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" :disabled="edit" clearable placeholder="请填写至少6位数的密码"></el-input>
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
                        :picker-options="$prototype.pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="锁定" prop="locked">
                        <el-select v-model="form.locked" placeholder="请选择是否锁定用户" style="width:100%">
                            <el-option v-for="(item,index) in $dic.statusOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="form.sex" placeholder="请选择性别" style="width:100%">
                            <el-option v-for="(item,index) in $dic.sexOptions" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email" clearable placeholder="请填写邮箱"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="部门">
                        <tree-select :props="props"
                        :options="treeData"
                        :value.sync="form.departId"
                        :clearable="isClearable"
                        :accordion="isAccordion"
                        style="width:100%">
                        </tree-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
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
            <el-button v-if="editShow" type="primary" :disabled="submitDisabled" @click="handleEditdata">确 定</el-button>
        </div>
    </div>
</template>
<script>
import treeSelect from '@/components/treeSelect'
import changeObject from '@/utils/changeObject'
import { isPhone, validEmail, isRealName } from '@/utils/validate'
import { powerShow } from '@/utils/power-filter'
export default {
    name:'userOpate',
    components:{
        treeSelect,
    },
    data() {
        const phone = (rule, value, callback) => {
            if(!value) {
                return callback(new Error('请输入手机号码'))
            }else if(!isPhone(value)){
                callback(new Error('请输入正确格式的手机号码'))
            }else{
                callback()
            }
        }
        const email = (rule, value, callback) => {
            if(value === '') {
                callback()
            }else if(!validEmail(value)) {
                callback(new Error('邮箱格式不正确'))
            }else{
                callback()
            }
        }
        const realName = (rule, value, callback) => {
            if(!value){
                return callback(new Error('真实姓名不能为空'))
            }else if(!isRealName(value)) {
                callback(new Error('真实姓名格式不正确'))
            }else{
                callback()
            }
        }
        return {
            form: {
                centerInfoId: '',
                email: '',
                sex: '',
                birthday:'',
                password:'',
                telephone:'',
                nickName:'',
                address:'',
                departId:0,
                locked:1,
                userName:'',
                description:'',
            },
            submitDisabled:false,
            listData:[],
            treeData:[],
            treeCenterData:[],
            isClearable:true,      // 可清空（可选）
            isAccordion:true,      // 可收起（可选）
            props:{
                value: 'id',
                label: 'name',
                children: 'children',
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
            rules:{
                userName:[
                    { required: true, message:'请输入用户名', trigger:'blur' }
                ],
                centerInfoId:[
                    { required: true, message:'请选择所属中心', trigger:'change' }
                ],
                nickName:[
                    { required: true, validator:realName, trigger:'blur' }
                ],
                password:[
                    { required: true, message:'请输入密码', trigger:'blur' }
                ],
                locked:[
                    { required: true, message:'请选择是否锁定', trigger:'change' }
                ],
                sex:[
                    { required: true, message:'请选择性别', trigger:'change' }
                ],
                email:[
                    { validator:email, trigger:'blur' }
                ]
            }
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
        this.loading = true;
        let attr = {
            id: 'id',
            parentId: 'parentId',
            name: 'name',
            remark: 'remark',
            status:'status',
            rootId: 0
        };
        
        await this.$api.depart.departList().then(res => {
            let data = this.$prototype.copyArr(res.data)
            this.treeData = this.treeChange(data,attr)
            console.log(this.treeData)
        })
        await this.$api.centerAdmin.centerTreeList().then(res => {
            this.treeCenterData = res.data

            //let data = this.$prototype.copyArr(res.data)
            // data.unshift({
            //     name:'顶级',
            //     id:0,
            //     parentId:null,
            // })
            // this.treeCenterData = changeObject(data,{
            //     id: 'id',
            //     parendId: 'parentId',
            //     name: 'name',
            //     rootId: null
            // },this.form.centerInfoId)
        })
        if(this.edit) {
            
            this.$api.userAdmin.userFindId(this.editId).then(res => {
                for(let i in this.form){
                    if(i == 'birthday'){
                        this.form[i] = this.formatDate(res.data[i])
                    }else{
                        this.form[i] = res.data[i]
                    }
                }
                console.log(this.form)
                this.loading = false;
            })
        }else{
                this.loading = false;
        }
    },
    methods:{
        formatDate(datetime) {
            if (datetime === null) {
                return ''
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
            this.submitDisabled = true;
            this.$api.userAdmin.userAdd(this.form).then(res => {
                this.$message({
                    message:'添加成功',
                    type:'success'
                })
                this.submitDisabled = false;
                this.$emit('dialogChange',true)
            }).catch(() => {
                this.submitDisabled = false;
            })
        },
        editSubmit() {
            this.submitDisabled = true;
            this.$api.userAdmin.userUpdate(this.editId,this.form).then(res => {
                this.$message({
                    message:'更新成功',
                    type:'success'
                })
                this.submitDisabled = false;
                this.$emit('dialogChange',true)
            }).catch(() => {
                this.submitDisabled = false;
            })
        },
        handleEditdata() {
            this.$refs.form.validate(pass => {
                if(pass) {
                    if(!this.edit) {
                        this.addSubmit();
                    }else{
                        this.editSubmit()
                    }
                }
            })
            
        },
        treeChange(data,attributes) {
            const resData = data
            const tree = []
            for (let i = 0; i < resData.length; i++) {
                if (resData[i].parentId === attributes.rootId) {
                const obj = {
                    id: resData[i][attributes.id],
                    name: resData[i][attributes.name],
                    parentId: resData[i][attributes.parentId],
                    remark: resData[i][attributes.remark],
                    status: resData[i][attributes.status],
                    children: []
                }
                tree.push(obj)
                resData.splice(i, 1)
                i--
                }
            }
            run(tree)
            function run(chiArr) {
                if (resData.length !== 0) {
                for (let i = 0; i < chiArr.length; i++) {
                    for (let j = 0; j < resData.length; j++) {
                    if (chiArr[i].id === resData[j][attributes.parentId]) {
                        const obj = {
                        id: resData[j][attributes.id],
                        name: resData[j][attributes.name],
                        remark: resData[j][attributes.remark],
                        // parentId: resData[i][attributes.parentId],
                        status: resData[j][attributes.status],
                        children: []
                        }
                        chiArr[i].children.push(obj)
                         resData.splice(j, 1)
                        j--
                    }
                    }
                    run(chiArr[i].children)
                }
                }
            }
            return tree
        }  
    },
    computed:{
        editShow() {
            let flag = false;
            if(this.edit){
                powerShow('user:update') ? flag = true : flag = false
            }else{
                flag = true;
            }
            return flag
        }
    }
}
</script>
<style lang="scss" scoped>
.dialog-footer{padding-bottom: 20px;}
</style>