<template>
<div>
    <el-table :header-row-class-name="'table-header-box'" :data="gridData" style="margin-top:30px;">
        <el-table-column prop="taskNo" label="任务编号"></el-table-column>
        <el-table-column prop="type" label="节点类型">
          <!-- <template slot-scope="scope">
            <span>{{scope.row.type | typeFilter}}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="节点时间" width="200px">
          <template slot-scope="scope">
            <span>{{scope.row.nodeTime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="longitude" label="经度"></el-table-column>
        <el-table-column prop="latitude" label="纬度"></el-table-column>
        <el-table-column prop="countGps" label="GPS累计距离" width="110px"></el-table-column>
        <!-- <el-table-column label="创建时间" width="200px">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDate}}</span>
          </template>
        </el-table-column> -->
    </el-table>
    <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleEditdata">确 定</el-button>
      </div>
</div> 
</template>

<script>
  export default {
    name:"emOpate",
    props:{
      editId:{
        type:[Number,String],
        default:'',
      }
    },
    filters:{
      typeFilter(value) {
        switch(value) {
          case 1:
            return '急救派车'
            break;
          case 2:
            return '驶向现场'
            break;
          case 3:
            return '到达现场'
            break;
          case 4:
            return '病人上车'
            break;
          case 5:
            return '送达医院'
            break;
          case 6:
            return '途中待命'
            break;
          case 7:
            return '站内待命'
            break;
        }
      },
      formatDate(value) {
            if (value === null) {
                return '空'
            } else {
                var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = date.getDate() + '';
                return Y + M + D;
            }
        },
    },
    data() {
      return {
        gridData: [],
      };
    },
    created() {
      this.loading = true;
      this.$api.taskNodeAdmin.taskNodeFindId(this.editId).then(res => {
        console.log(res)
          this.gridData = res.data;
          this.loading = false;
      })
    },
    methods:{
      handleCancel() {
        this.$emit('dialogChange',false)
      },
      handleEditdata() {
        this.$emit('dialogChange',false)
      }
    }
  };
</script>
<style lang="scss" scoped>
.dialog-footer{
  width:100%;
  padding:12px 0;
  box-sizing:border-box;
}
</style>