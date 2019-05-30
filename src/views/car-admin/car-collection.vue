<template>
    <div class="car-collection-box" :class="statusFlag ? 'active' : ''">
        <div class="status-btn" @click="statusFlag = !statusFlag">
            <i class="el-icon-caret-top" style="color:#1890ff"></i>
        </div>
        <div class="collection-title">急救点采集信息</div>
        <el-table :data="tableData" border maxHeight="246" stripe>
            <el-table-column label="急救中心" prop="center"></el-table-column>
            <el-table-column label="车牌号" prop="plate"></el-table-column>
            <el-table-column label="急救仓灭火器" prop="jc"></el-table-column>
            <el-table-column label="铲式担架" prop="cs"></el-table-column>
            <el-table-column label="软担架" prop="rs"></el-table-column>
            <el-table-column label="胎压" prop="ty"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'carCollection',
    data() {
        return {
            statusFlag:true,
            tableData:[{
                center:'本部分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            },{
                center:'江北分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            },{
                center:'江东分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            },{
                center:'江东分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            },{
                center:'江东分中心',
                plate:'浙B102NN',
                jc:'在位',
                cs:'在位',
                rs:'不在位',
                ty:'30pa'
            }]
        }
    }
}
</script>      
<style lang="scss" scoped>
.car-collection-box{
    position: absolute;
    left:0;
    bottom:0;
    width:100%;
    height:300px;
    background:#fff;
    z-index:99;
    padding:12px;
    box-sizing:border-box;
    transition:transform .28s;
    transform:translate(0,100%);
    &.active{
        transform:translate(0,0);
    }
    .collection-title{
        width:100%;
        font-size:16px;
        color:#1890ff;
        margin-bottom:12px;
    }
    .status-btn{
        position: absolute;
        top:-18px;
        left:0;
        width:100%;
        text-align: center;
        cursor: pointer;
        i{
            font-size:26px;
        }
    }
}
</style>
