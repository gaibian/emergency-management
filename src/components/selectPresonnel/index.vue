<template>
    <div class="select-car-container">
        <el-dialog v-el-drag-dialog title="选择人员" :visible.sync="dialogTreeVisible" :modal-append-to-body="false" width="360px" center :before-close="handleClose">
            <!--选择急救点-编号-->
            <el-row class="choice-type" type="flex" align="middle" justify="center">
                <el-button size="mini" @click="handlePlate">急救点</el-button>
                <el-button size="mini" @click="handleNum">车辆编号</el-button>
            </el-row>
            <div class="car-dialog">
                <el-scrollbar style="height:100%">
                    <el-tree
                    :data="treeData"
                    ref="tree"
                    default-expand-all
                    show-checkbox
                    node-key="id"
                    :accordion="true"
                    @check="checkChange"
                    :props="defaultProps">
                    </el-tree>
                </el-scrollbar>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleClick">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import elDragDialog from '@/directive/el-drag-dialog'
export default {
    name:'selectCar',
    directives: { elDragDialog },
    props:{
        flag:{
            type: Boolean,
            default:false
        },
        radio:{
            type: Boolean,
            default: false
        }
    },
    watch:{
        flag() {
            this.dialogTreeVisible = this.flag
        }
    },
    data() {
        return {
            editCheckId:'',
            carPlate:'浙B102NN',
            dialogTreeVisible:false,
            treeData:[{
                id:1,
                label:'宁波市急救中心',
                children:[{
                    id:2,
                    label:'本部分中心',
                    children:[{
                        id:101,
                        label:'张三',
                        plate:'李四',
                        num:'1号车'
                    },{
                        id:102,
                        label:'张三三',
                        plate:'李小二',
                        num:'2号车'
                    },{
                        id:103,
                        label:'张墙',
                        plate:'李梅',
                        num:'3号车'
                    }]
                },{
                    id:3,
                    label:'海曙分中心',
                    children:[{
                        id:104,
                        label:'韩梅梅',
                        plate:'李雷',
                        num:'4号车'
                    },{
                        id:105,
                        label:'李翔',
                        plate:'张强',
                        num:'5号车'
                    },{
                        id:106,
                        label:'李丽',
                        plate:'崔旭东',
                        num:'6号车'
                    }]
                },{
                    id:4,
                    label:'江北分中心',
                    children:[{
                        id:107,
                        label:'李莉',
                        plate:'张思',
                        num:'7号车'
                    },{
                        id:108,
                        label:'张翔',
                        plate:'刘翔',
                        num:'8号车'
                    },{
                        id:109,
                        label:'刘丽',
                        plate:'李响',
                        num:'9号车'
                    }]
                },{
                    id:5,
                    label:'江东分中心',
                    children:[{
                        id:110,
                        label:'刘立明',
                        plate:'张立新',
                        num:'10号车'
                    },{
                        id:111,
                        label:'张斌',
                        plate:'李志军',
                        num:'11号车'
                    },{
                        id:112,
                        label:'刘志坚',
                        plate:'李晨',
                        num:'12号车'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            form:{
                center:'',
                point:'',
                plate:'',
            },
            centerOptions:[{
                label:'本部分中心',
                value:1
            },{
                label:'江北分中心',
                value:2
            },{
                label:'江东分中心',
                value:3
            },{
                label:'海曙分中心',
                value:4
            }]
        }
    },
    created() {

    },
    methods:{
        handlePlate() {
            this.treeEach('plate')
        },
        handleNum() {
            this.treeEach('num')
        },
        treeEach(val) {
            let fun = (arr) => {
                arr.forEach(item => {
                    let child = item.children;
                    if(child && child.length > 0) {
                        fun(child)
                    }else{
                        item.label = item[val]
                    }
                })
            }
            fun(this.treeData)
        },
        handleClose() {
            this.close()
        },
        handleClick() {
            this.sure()
        },
        handleCancel() {
            this.close()
        },
        checkChange(item, node, self) {
            // 实现单选
            if(this.radio) {
                if(item.children && item.children.length != 0) {
                    this.$refs.tree.setCheckedKeys([])
                }else{
                    if(node.checkedKeys.length > 0) {
                        this.$refs.tree.setCheckedKeys([item.id])
                    }
                }
            }
            
        },
        sure() {
            this.dialogTreeVisible = false;
            let data = {
                carPlate:this.carPlate,
                flag: this.dialogTreeVisible,
                keys:this.$refs.tree.getCheckedKeys(),
            }
            this.$emit('change',data)
        },
        close() {
            this.dialogTreeVisible = false;
            let data = {
                flag: this.dialogTreeVisible,
            }
            this.$emit('change',data)
        }
    }
}
</script>
<style lang="scss" scoped>
.car-dialog{
    width:100%;
    height:260px;
    overflow:hidden;
    margin:12px 0;
}
.choice-type{
    width:100%;
    margin:0;
    padding:12px 0;
    border-top:#e5e5e5 1px solid;
    //border-bottom:#e5e5e5 1px solid;
}
</style>
