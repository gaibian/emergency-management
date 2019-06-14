<template>
    <div class="table-box" style="margin-top:20px">
        <el-table :data="tableData" :header-row-class-name="'table-header-box'" :max-height="tableHeight" v-loading="loading" stripe element-loading-text="数据加载中...">
            <el-table-column label="任务编号" prop="rwnum"></el-table-column>
            <el-table-column label="任务时间" prop="rwtime" min-width="100"></el-table-column>
            <el-table-column label="车编号" prop="carnum" min-width="70"></el-table-column>
            <el-table-column label="车牌号" prop="plate" min-width="100"></el-table-column>
            <el-table-column label="接车地址" prop="jcaddress" min-width="300"></el-table-column>
            <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                    <span>
                        <el-button type="primary" size="mini" @click="handleClick(scope)">选择</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <div class="btm-group">
            <pagination :total="total" v-show="total > 0" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @loadingChange="loading = true" @pagination="handlePag"></pagination>
        </div>
    </div>
</template>
<script>
import pagination from '@/components/Pagination'
export default {
    name:'wheelChoice',
    components:{
        pagination
    },
    data() {
        return {
            total:20,
            listQuery:{
                page:2,
                limit:10
            },
            tableHeight:400,
            tableData:[{
                rwnum:'123678',
                rwtime:'2019-09-26',
                carnum:'267',
                plate:'浙B102NN',
                jcaddress:'浙江省宁波市鄞州区钟公庙街道宁南北路365'
            },{
                rwnum:'123678',
                rwtime:'2019-09-26',
                carnum:'267',
                plate:'浙B102NN',
                jcaddress:'浙江省宁波市鄞州区钟公庙街道宁南北路365'
            },{
                rwnum:'123678',
                rwtime:'2019-09-26',
                carnum:'267',
                plate:'浙B102NN',
                jcaddress:'浙江省宁波市鄞州区钟公庙街道宁南北路365'
            },{
                rwnum:'123678',
                rwtime:'2019-09-26',
                carnum:'267',
                plate:'浙B102NN',
                jcaddress:'浙江省宁波市鄞州区钟公庙街道宁南北路365'
            },{
                rwnum:'123678',
                rwtime:'2019-09-26',
                carnum:'267',
                plate:'浙B102NN',
                jcaddress:'浙江省宁波市鄞州区钟公庙街道宁南北路365'
            },{
                rwnum:'123678',
                rwtime:'2019-09-26',
                carnum:'267',
                plate:'浙B102NN',
                jcaddress:'浙江省宁波市鄞州区钟公庙街道宁南北路365'
            }],
            loading:true,
        }
    },
    created() {
        this.handlePag()
    },
    methods:{
        handleClick(scope) {

        },
        handlePag() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
