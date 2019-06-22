<template>
    <div>
        <el-tree
        v-loading="loading"
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        @check="checkChange"
        highlight-current
        :props="defaultProps">
        </el-tree>
        <el-row :gutter="20" class="row-button">
            <el-button size="mini" @click="handleCancel">取消</el-button>
            <el-button type="primary" size="mini" @click="handleSure">确定</el-button>
        </el-row>
    </div>
</template>
<script>
import changeObject from '@/utils/changeObject'
export default {
    name:'choiceMenu',
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
                resourceIds:'',
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
        this.$api.menuAdmin.menuLists(this.id).then(res => {
            console.log(res);
            let data = this.$prototype.copyArr(res.data.resourceList);
            this.treeData = changeObject(data,attr)
            this.$refs.tree.setCheckedKeys(res.data.resourceIds)
            this.loading = false;
        })
        // this.$api.menuAdmin.menuList().then(res => {
        //     let data = this.$prototype.copyArr(res.data)
        //     this.treeData = changeObject(data,attr)
        //     this.loading = false;
        // })
    },
    methods:{
        checkChange(data,boo,v) {
            let arr = this.$refs.tree.getCheckedKeys();
            this.form.resourceIds = arr.join(',')
        },
        handleCancel() {
            this.$emit('changeClose',false)
        },
        handleSure() {
            this.$api.roleAdmin.roleGrant(this.id,this.form).then(res => {
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
