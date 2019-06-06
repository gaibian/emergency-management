<template>
    <div class="gis-info-container">
        <div class="choice-btn" @click="handleClick">车辆信息</div>
        <select-car :flag="flag" @change="handleChange"></select-car>
        <car-collection></car-collection>
        <div id="container"></div>
    </div>
</template>
<script>
import selectCar from '@/components/selectCar'
import carCollection from './car-collection'
import { setTimeout } from 'timers';
export default {
    name: 'gisInfo',
    components: {
        selectCar,
        carCollection
    },
    data() {
        return {
            flag:false,
            map:null,
        }
    },
    created() {
        this.$store.dispatch('setPageLoading',true)
    },
    mounted() {
        this.map = new AMap.Map('container',{
            zoom:18,
            center:[121.56,29.88],
            viewMode: '2D',  //设置地图模式
            lang:'zh_cn',  //设置地图语言类型
        });
        this.map.on('complete', () => {
            // 地图图块加载完成后触发
            this.$store.dispatch('setPageLoading',false)
            this.init();
        });
    },
    destroyed() {
        this.map.destroy();
    },
    methods:{
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
.choice-btn{
    position:fixed;
    top:320px;
    right:0;
    z-index:99;
    padding:0 12px;
    height:44px;
    line-height:44px;
    background:rgb(24, 144, 255);
    font-size:16px;
    color:#fff;
    border-radius:6px 0px 0px 6px;
    cursor: pointer;
}
#container{
    width:100%;
    height:100%;
}

</style>
