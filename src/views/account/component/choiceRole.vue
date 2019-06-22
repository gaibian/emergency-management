<template>
    <div>
        <!-- <el-tree
        v-loading="loading"
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        @check="checkChange"
        highlight-current
        :props="defaultProps">
        </el-tree> -->
        <el-select v-model="form.roleIds" multiple placeholder="请选择角色">
            <el-option v-for="(item,index) in roleOptions" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-row :gutter="20" class="row-button">
            <el-button size="mini" @click="handleCancel">取消</el-button>
            <el-button type="primary" size="mini" @click="handleSure">确定</el-button>
        </el-row>
    </div>
</template>
<script>
import changeObject from '@/utils/changeObject'
import { setTimeout } from 'timers';
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
            roleOptions:[],
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
            this.roleOptions = res.data.roleList;
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
            let data = Object.assign({},this.form);
            data.roleIds = data.roleIds.join(',');
            this.$api.userAdmin.userGrant(this.id,data).then(res => {
                this.$message({
                    message:'设置成功',
                    type:'success'
                })
                this.$emit('changeClose',true)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.row-button{
    padding:20px 12px;
    box-sizing:border-box;
}
</style>
