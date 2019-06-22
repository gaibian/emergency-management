<template>
    <el-popover placement="bottom-start" width="300" trigger="click">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        <el-button slot="reference" :style="`width:100%;text-align:left;color:${color}`">{{placeholder}}</el-button>
    </el-popover>
</template>
<script>
export default {
    name:'selectTree',
    props:{
        placeholder:{
            type:String,
            default:'请选择'
        },
        data:{
            type:[Array],
            default:[]
        },
        id:{
            default:null
        }
    },
    watch:{
        placeholder() {
            if(this.placeholder.indexOf('请选择') === -1){
                this.color = '#606266'
            }else{
                this.color = '#C0C4CC'
            }
        }
    },
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            color:'#C0C4CC'
        }
    },
    methods:{
        handleNodeClick(data) {
            this.$emit('update:placeholder',data.name)
            this.$emit('update:id', data.id)
        },
    }
}
</script>
