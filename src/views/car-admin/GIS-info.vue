<template>
    <div class="gis-info-container">
        <div class="choice-bar-container">
            <div class="content-box">
                <div class="filter-container" style="padding-bottom:0">
                    <div style="width:300px;margin-right:32px;" class="filter-item">
                        <el-input v-model="plate" placeholder="请选择车辆">
                            <el-button slot="append" icon="el-icon-search" @click="handleClick">选择车辆</el-button>
                        </el-input>
                    </div>
                    <div class="filter-item">
                        <span class="status-title">状态:</span>
                        <el-radio v-model="radio" label="1">任务中</el-radio>
                        <el-radio v-model="radio" label="2">途中待命</el-radio>
                        <el-radio v-model="radio" label="3">站点待命</el-radio>
                        <el-radio v-model="radio" label="4">未上班\下班</el-radio>
                    </div>
                </div>
            </div>
        </div>
        <select-car :flag="flag" @change="handleChange"></select-car>
        <div id="container" ref="container"></div>
    </div>
</template>
<script>
import selectCar from '@/components/selectCar'
import { setTimeout } from 'timers';
import Bus from '@/utils/bus'
export default {
    name: 'gisInfo',
    components: {
        selectCar,
    },
    data() {
        return {
            radio:'1',
            plate:'',
            flag:false,
            map:null,
        }
    },
    created() {
        this.$store.dispatch('setPageLoading',true)
    },
    activated() {
        // 别的页面进入缓存需要更新数据
        console.log(this.$route)
    },
    mounted() {
        console.log('缓存了')
        this.map = new AMap.Map('container',{
            zoom:18,
            showIndoorMap:false,
            center:[121.56,29.88],
            viewMode: '2D',  //设置地图模式
            lang:'zh_cn',  //设置地图语言类型
        });
        this.map.on('complete',this.complete);
        // if(!Bus.map) {
        //     console.log('sss')
        //     Bus.map = new AMap.Map('container',{
        //         zoom:18,
        //         showIndoorMap:false,
        //         center:[121.56,29.88],
        //         viewMode: '2D',  //设置地图模式
        //         lang:'zh_cn',  //设置地图语言类型
        //     });
        //     Bus.map.on('complete',this.complete);
        // }else{
        //     console.log(Bus.map.getZoom())
        //     Bus.map.setLang('zh_cn')
        //     Bus.map.on('complete',() => {
        //         console.log('地图加载完成')
        //     });
        //     this.$store.dispatch('setPageLoading',false)
        // }
        
    },
    destroyed() {
        // if(this.map) {
        //     this.map.off('complete',this.complete)
        //     this.map.destroy();
        // }
        //console.log(this.map)
    },
    methods:{
        complete() {
            this.$store.dispatch('setPageLoading',false)
            this.init();
        },
        init() {
            let data = [{
                position:[121.564363,29.881213],
                status:'#67C23A'
            },{
                position:[121.56786786,29.882344678],
                status:'#E6A23C'
            },{
                position:[121.567807,29.88435645],
                status:'#F56C6C'
            },{
                position:[121.566707,29.88335645],
                status:'#F56C6C'
            },{
                position:[121.5623424,29.8834636],
                status:'#409EFF'
            },{
                position:[121.56324267,29.8828786],
                status:'#409EFF'
            },{
                position:[121.56234234,29.8868785],
                status:'#409EFF'
            },{
                position:[121.56209834,29.8887785],
                status:'#409EFF'
            },{
                position:[121.5620975234,29.88348785],
                status:'#409EFF'
            },{
                position:[121.56834234,29.88876785],
                status:'#409EFF'
            }]
            let markerArr = [];
            
            data.forEach((item,index) => {
                let marker = new AMap.Marker({
                    position:item.position,
                    content:`<div class="loader3"><i style="background:${item.status}"></i><span style="background:${item.status}"></span><span style="background:${item.status}"></span><svg-icon :icon-class="'car-location'"></svg-icon></div>`,
                })
                markerArr.push(marker)
            })
            this.map.add(markerArr)
            
            this.map.setFitView();
        },
        handleClick() {
            this.flag = true;
        },
        handleChange(data) {
            if(data.keys) {
                console.log(data.keys)
            }
            this.flag = data.flag
        }
    }
}
</script>
<style lang="scss">
.gis-info-container{
    width:100%;
    position:relative;
}
.status-title{
    font-size:16px;
    color:#606266;
    margin-right:12px;
}
.choice-bar-container{
    width:100%;
    position: absolute;
    top:12px;
    left:0;
    padding:0 12px;
    box-sizing:border-box;
    z-index:99;
    overflow:hidden;
    .content-box{
        width:100%;
        padding:12px 12px 0 12px;
        box-sizing:border-box;
        background:#fff;
        box-shadow:0px 0px 8px rgba(0,0,0,0.1);
    }
}
.loader3 {
    position: relative;
   width:60px;
   height:60px;
   display:inline-block;
   padding:0px;
   text-align:left;
   i{
       display:block;
       width:16px;
       height:16px;
       border:#fff 2px solid;
       border-radius:50%;
       position: absolute;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%)
    //    box-shadow：0px 0px 8px rgba(0,0,0,0.4);
   }
}
.loader3 span {
   position:absolute;
   display:inline-block;
   width:60px;
   height:60px;
   border-radius:100%;
   //background:rgba(135, 211, 124,1);
   background:#F56C6C;
   -webkit-animation:loader3 1s linear infinite;
   animation:loader3 1s linear infinite;
}
.loader3 span:last-child {
   animation-delay:-0.9s;
   -webkit-animation-delay:-0.9s;
}
@keyframes loader3 {
   0% {transform: scale(0, 0);opacity:0.9;}
   100% {transform: scale(1, 1);opacity:0;}
}
</style>
<style lang="scss" scoped>
.gis-info-container{
    position:relative;
    width:100%;
    height:calc(100vh - 84px);
    color:#ccc;
}
#container{
    width:100%;
    height:100%;
}

</style>
