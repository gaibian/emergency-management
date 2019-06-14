<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <el-table :data="tableData" default-expand-all style="width: 100%;margin-bottom: 20px;" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :header-row-class-name="'table-header-box'" stripe element-loading-text="数据加载中..." >
                <el-table-column label="中心名称" min-width="100px">
                    <template slot-scope="scope">
                    <svg-icon :icon-class="scope.row.children ? 'fenbu' : 'yiyuan'" style="color:rgb(64, 158, 255)"></svg-icon>
                    <span style="margin-left: 10px">{{ scope.row.zxname }}</span>
                </template>
                </el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column prop="accuracy" label="经度"></el-table-column>
                <el-table-column prop="latitude" label="纬度"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="note" label="备注"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import pageMixins from '@/mixins'
export default {
    name:'centralinfo',
    components:{
    },
    mixins:[pageMixins],
    data() {
        return {
        tableData: [{
          id: 1,
          zxname: '急救中心',
          status: '状态状态',
          accuracy: '120°55',
          latitude: '28°51',
          address: '--',
          note: '这是一段备注',
          children: [
              {
          id: 2,
          zxname: '第一分中心',
          status: '状态状态',
          accuracy: '135°13',
          latitude: '35°21',
          address: '--',
          note: '这是一段备注这是一段备注这是一段备注',
          children: [{
              id: 21,
              zxname: '中医院急救点',
              status: '状态状态',
              accuracy: '129°18',
              latitude: '38°54',
              address: '浙江省宁波市海曙区丽园北路819号',
              note: '暂无',
            }, {
              id: 22,
              zxname: '第二医院急救点',
              status: '状态状态',
              accuracy: '136°24',
              latitude: '41°52',
              address: '浙江省宁波市海曙区西北街41号',
              note: '这是一段备注',
          }]
          }, {
          id: 3,
          zxname: '第二分中心',
          status: '状态状态',
          accuracy: '145°65',
          latitude: '36°23',
          address: '--',
          note: '暂无',
          children: [{
              id: 31,
              zxname: '李惠利医院急救点',
              status: '状态状态',
              accuracy: '138°51',
              latitude: '42°19',
              address: '浙江省宁波市鄞州区兴宁路57号',
              note: '这是一段备注'
              }, {
              id: 32,
              zxname: '鄞州人民医院急救点',
              status: '状态状态',
              accuracy: '139°64',
              latitude: '38°31',
              address: '浙江省宁波市鄞州区百丈东路251号',
              note: '暂无'
              }, {
              id: 33,
              zxname: '李惠利东部医院急救点',
              status: '状态状态',
              accuracy: '148°26',
              latitude: '36°28',
              address: '浙江省宁波市鄞州区江南路1111号',
              note: '暂无',
          }]
          }, {
          id: 4,
          zxname: '第三分中心',
          status: '状态状态',
          accuracy: '139°27',
          latitude: '46°12',
          address: '--',
          note: '暂无',
          children: [{
              id: 41,
              zxname: '第九医院急救点',
              status: '状态状态',
              accuracy: '148°29',
              latitude: '42°35',
              address: '浙江省宁波市江北区祥北路68号',
              note: '这是一段备注这是一段备注',
              }, {
              id: 42,
              zxname: '宁波大学附属医院急救点',
              status: '状态状态',
              accuracy: '142°64',
              latitude: '38°17',
              address: '浙江省宁波市人民路247号',
              note: '暂无',
              }, {
              id: 43,
              zxname: '妇儿医院北部医院急救点',
              status: '状态状态',
              accuracy: '148°65',
              latitude: '49°12',
              address: '浙江省宁波市柳汀街339号',
              note: '这是一段备注',
          }]
          }
]
          }, 
        ]}
    },
    methods:{  
    }
        }
</script>
<style lang="scss" scoped>
.table-box{
    padding:12px;
    box-sizing:border-box;
    background:#fff;
    border-radius:6px;
    overflow:hidden;
}
</style>