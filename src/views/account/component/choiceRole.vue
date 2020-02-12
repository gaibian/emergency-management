<template>
    <div style="margin-top:12px;">
        <el-form v-model="form" label-position="left" v-loading="loading" element-loading-text="数据加载中...">
            <el-form-item label="角色">
                <el-checkbox-group 
                    v-model="form.roleIds">
                    <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <el-row class="row-button" type="flex" justify="start" style="padding-left:0;">
            <el-button size="mini" @click="handleCancel">取消</el-button>
            <el-button v-if="editShow" type="primary" size="mini" :disabled="submitDisabled" @click="handleSure">确定</el-button>
        </el-row>
    </div>
</template>
<script>
import changeObject from '@/utils/changeObject'
import { setTimeout } from 'timers';
import { powerShow } from '@/utils/power-filter'
export default {
    name:'choiceRole',
    props:{
        id:{
            type:[Number,String],
            default:''
        }
    },
    data() {
        return {
            treeData:[],
            checkedCities:[],
            cities:[],
            loading:false,
            submitDisabled:false,
            defaultProps:{
                children: 'children',
                label: 'name'
            },
            form:{
                roleIds:[],
            },
            queryForm: {
                name:'',
                roleKey:'',
                page: 1,
                size: 20,
            },
            loading:false,
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
        this.loading = true;
        await this.$api.roleAdmin.roleList(this.id).then(res => {
            this.cities = res.data.roleList;
            res.data.userRoleIds.forEach(item => {
                this.form.roleIds.push(item)
            })
            this.loading = false;  
        })
    },
    methods:{
        handleCancel() {
            this.$emit('changeClose',false)
        },
        handleSure() {
            this.submitDisabled = true;
            let data = Object.assign({},this.form);
            data.roleIds = data.roleIds.join(',');
            console.log(data.roleIds)
            this.$api.userAdmin.userGrant(this.id,data).then(res => {
                this.$message({
                    message:'设置成功',
                    type:'success'
                })
                this.submitDisabled = false;
                this.$emit('changeClose',true)
            }).catch(() => {
                this.submitDisabled = false;
            })
        }
    },
    computed:{
        editShow() {
            return powerShow('user:grant')
        }
    }
}
</script>
<style lang="scss" scoped>
.row-button{
    padding:0px 12px 20px 12px;
    box-sizing:border-box;
}
</style>
