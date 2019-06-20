<template>
<div>
    <el-table :data="gridData" style="margin-top:30px;">
        <el-table-column property="ssrw" label="所属任务"></el-table-column>
        <el-table-column property="" label="节点类型">
        </el-table-column>
        <el-table-column property="jdtime" label="节点时间" width="200px"></el-table-column>
        <el-table-column property="accuracy" label="经度"></el-table-column>
        <el-table-column property="latitude" label="纬度"></el-table-column>
        <el-table-column property="GPSljjl" label="GPS累计距离"></el-table-column>
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
    data() {
      return {
        gridData: [],
      };
    },
    created() {
      this.loading = true;
      this.$api.taskRecord.zteTaskFindId(this.editId).then(res => {
        console.log(res);
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