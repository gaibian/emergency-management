<template>
<div>
    <el-table :data="gridData">
        <el-table-column property="ssrw" label="所属任务"></el-table-column>
        <el-table-column property="jdtype" label="节点类型"></el-table-column>
        <el-table-column property="jdtime" label="节点时间"></el-table-column>
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
          jdtype: '途中待命',
          jdtime: '2019-5-18 10:25:21',
          accuracy: '120°55',
          latitude: '28°51',
          GPSljjl: '25公里',
        }, {
          ssrw: '0123',
          jdtype: '途中待命',
          jdtime: '2019-5-18 10:25:21',
          accuracy: '120°55',
          latitude: '28°51',
          GPSljjl: '25公里',
        }, {
          ssrw: '0123',
          jdtype: '途中待命',
          jdtime: '2019-5-18 10:25:21',
          accuracy: '120°55',
          latitude: '28°51',
          GPSljjl: '25公里',
        }, {
          ssrw: '0123',
          jdtype: '途中待命',
          jdtime: '2019-5-18 10:25:21',
          accuracy: '120°55',
          latitude: '28°51',
          GPSljjl: '25公里',
        }],
        dialogTableVisible: false,
      };
    }
  };
</script>