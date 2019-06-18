<template>
  <div class="dashboard-container main-page">
    <!--车辆信息-->
    <el-row :gutter="20" type="flex">
        <el-col>
            <el-row :gutter="20" style="margin-bottom:12px;">
                <el-col :span="6">
                    <div class="car-item success">
                        <el-row :gutter="30" type="flex" align="middle" style="height:100%;text-align:center">
                            <el-col>
                                <h2 class="title">任务中</h2>
                            </el-col>
                            <el-col>
                                <p class="num">
                                    <count-to :startVal="0" :endVal="10" :duration='2000'></count-to>
                                </p>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="car-item warning">
                        <el-row :gutter="30" type="flex" align="middle" style="height:100%;text-align:center">
                            <el-col>
                                <h2 class="title">途中待命</h2>
                            </el-col>
                            <el-col>
                                <p class="num">
                                    <count-to :startVal="0" :endVal="6" :duration='2000'></count-to>
                                </p>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="car-item danger">
                        <el-row :gutter="30" type="flex" align="middle" style="height:100%;text-align:center">
                            <el-col>
                                <h2 class="title">站点待命</h2>
                            </el-col>
                            <el-col>
                                <p class="num">
                                    <count-to :startVal="0" :endVal="17" :duration='2000'></count-to>
                                </p>
                            </el-col>
                        </el-row>
                        
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="car-item info">
                        <el-row :gutter="30" type="flex" align="middle" style="height:100%;text-align:center">
                            <el-col>
                                <h2 class="title">未上班\下班</h2>
                            </el-col>
                            <el-col>
                                <p class="num">
                                    <count-to :startVal="0" :endVal="10" :duration='2000'></count-to>
                                </p>
                            </el-col>
                        </el-row>
                        
                    </div>
                </el-col>
            </el-row>
            <!--任务量-->
            <task-load></task-load>
        </el-col>
        <el-col class="right-item">
            <abnormal></abnormal>
        </el-col>
    </el-row>
    <!--急救任务时间-->
    <el-row :gutter="20" style="margin-top:12px;">
        <el-col :span="12" style="height:360px">
            <aid-time></aid-time>
        </el-col>
        <el-col :span="12" style="height:360px">
            <line-time></line-time>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import aidTime from './component/aidTime'
import lineTime from './component/lineTime'
import abnormal from './component/abnormal'
import taskLoad from './component/taskLoad'
export default {
  name: 'Dashboard',
  components:{
      aidTime,
      lineTime,
      abnormal,
      taskLoad
  },
  data() {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.dashboard-container{
  width:100%;
  height:100%;
}
.right-item{
    width:460px;
}
.car-item{
    width:100%;
    height:70px;
    border-radius:4px;
    padding:12px;
    box-sizing:border-box;
    .title{
        font-size:16px;
        color:#fff;
        font-weight:normal;
        margin:0;

    }
    .num{
        font-size:23px;
        color:#fff;
        margin:0;
    }
    &.success{
        background:#67C23A;
    }
    &.warning{
        background:#E6A23C;
    }
    &.danger{
        background:#F56C6C;
    }
    &.info{
        background:#909399;
    }
}
</style>
