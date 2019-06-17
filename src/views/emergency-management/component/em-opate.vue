<template>
<div>
    <el-table :data="gridData" style="margin-top:30px;">
        <el-table-column property="ssrw" label="所属任务"></el-table-column>
        <el-table-column property="" label="节点类型">
          <template slot-scope="scope">
              <el-tag  @close="handleClose(tag)">{{ scope.row.jdtype }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="jdtime" label="节点时间" width="200px"></el-table-column>
        <el-table-column property="accuracy" label="经度"></el-table-column>
        <el-table-column property="latitude" label="纬度"></el-table-column>
        <el-table-column property="GPSljjl" label="GPS累计距离"></el-table-column>
    </el-table>
</div> 
</template>

<script>
  export default {
    data() {
      return {
        gridData: [{
          ssrw: '0123',
          jdtype: '站内待命',
          jdtime: '2019-5-18 10:25:21',
          accuracy: '120°55',
          latitude: '28°51',
          GPSljjl: '21.2公里',
        }, {
          ssrw: '0123',
          jdtype: '任务中',
          jdtime: '2019-5-18 10:35:47',
          accuracy: '120°55',
          latitude: '28°51',
          GPSljjl: '24.3公里',
        }, {
          ssrw: '0123',
          jdtype: '途中待命',
          jdtime: '2019-5-18 11:02:14',
          accuracy: '120°55',
          latitude: '28°51',
          GPSljjl: '34.9公里',
        }, {
          ssrw: '0123',
          jdtype: '下班',
          jdtime: '2019-5-18 18:01:54',
          accuracy: '120°55',
          latitude: '28°51',
          GPSljjl: '54.2公里',
        }],
        dialogTableVisible: false,
      };
    },
    methods:{
        handleClose(tag) {
        this.jdtype.splice(this.jdtype.indexOf(tag), 1);
      },
    }
  };
</script>