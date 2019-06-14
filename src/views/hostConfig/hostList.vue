<template>
    <div class="car-collection-box main-page" ref="mainContainer">
        <div class="table-box">
            <div class="top-info-box filter-container" ref="topAdd">
                <el-button class="filter-item" type="primary" @click="handleAdd">添加主机</el-button>
            </div>
            <el-table :data="tableData" :header-row-class-name="'table-header-box'" stripe :max-height="tableHeight" v-loading="tableLoading" element-loading-text="数据加载中...">
                <el-table-column label="配置编号" prop="configNum"></el-table-column>
                <el-table-column label="车辆ID" prop="plateId"></el-table-column>
                <el-table-column label="在线状态" prop="currentStatus"></el-table-column>
                <el-table-column label="同步状态" prop="synStatus"></el-table-column>
                <el-table-column label="最后在线时间" prop="lastTime"></el-table-column>
                <el-table-column label="固件版本号" prop="gVersionNum"></el-table-column>
                <el-table-column label="软件版本号" prop="rVersionNum"></el-table-column>
                <el-table-column label="操作" fixed="right" min-width="130">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini">编辑</el-button>
                        <el-button type="primary" size="mini" @click="handleSee(scope)">卡片信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" class="btm-group">
                <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="tableLoading = true" @pagination="handlePag"></pagination>
            </div>
        </div>
        <el-dialog title="卡片信息" close-on-click-modal v-model="dialogFormVisible" width="800px" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <card v-if="dialogFormVisible"></card>
        </el-dialog>
    </div>
</template>
<script>
import pageMixins from '@/mixins'
import Pagination from '@/components/Pagination'
import card from './component/card'
export default {
    name:'hostList',
    components:{
        Pagination,
        card
    },
    mixins:[pageMixins],
    data() {
        return {
            total:29,
            listQuery:{
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
            dialogFormVisible:false,
            tableLoading:true,
            tableHeight:null,
            tableData:[{
                configNum:'278986',
                plateId:28,
                currentStatus:'正常',
                synStatus:'正常',
                lastTime:'2019-09-26',
                gVersionNum:'NJ98086',
                rVersionNum:'NJ98267',
            }]
        }
    },
    created() {
        this.handlePag();
    },
    methods:{
        handleAdd() {

        },
        handleSee(scope) {
            this.dialogFormVisible = true;
        },
        handlePag() {
            this.tableLoading = true;
            setTimeout(() => {
                this.tableLoading = false;
            }, 2000);
        },
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
