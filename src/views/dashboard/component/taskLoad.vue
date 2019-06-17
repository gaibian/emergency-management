<template>
    <div class="task-load-container">
        <div class="task-load-box">
            <el-row type="flex">
                <el-col>
                    <div class="charts-title">急救任务量</div>
                </el-col>
                <el-col style="text-align:right">
                    <div class="charts-title">总出车<span>{{total}}</span>次</div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="height:90%;margin-top:20px;">
                <el-col :span="6" style="height:100%">
                    <div class="count-title">总览</div>
                    <task-count :id="'allCount'"></task-count>
                </el-col>
                <el-col :span="6" style="height:100%">
                    <div class="count-title">第一分中心</div>
                    <task-count :id="'oneCount'"></task-count>
                </el-col>
                <el-col :span="6" style="height:100%">
                    <div class="count-title">第二分中心</div>
                    <task-count :id="'twoCount'"></task-count>
                </el-col>
                <el-col :span="6" style="height:100%">
                    <div class="count-title">第三分中心</div>
                    <task-count :id="'threeCount'"></task-count>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import taskCount from './taskCount'
export default {
    name:'taskLoad',
    components:{
        taskCount
    },
    data() {
        return {
            total:1989
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
.task-load-container{
    width:100%;
    height:358px;
    .task-load-box{
        width:100%;
        height:100%;
        padding:12px;
        box-sizing:border-box;
        background:#fff;
        .count-title{
            width:100%;
            text-align:center;
            color:#606266;
            background:#edf1f2;
            padding:10px 0;
            font-size:14px;
            box-sizing:border-box;
        }
    }
}
.charts-title{
    width:100%;
    height:10%;
    font-size:16px;
    color:#606266;
    span{
        color:#F56C6C;
        margin:0 4px;
    }
}
</style>

