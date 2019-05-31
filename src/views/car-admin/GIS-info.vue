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
            center:[120.15,30.28],
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
        console.log('注销了GIS')
        this.map.destroy();
    },
    methods:{
        init() {
            let marker = new AMap.Marker({
                position:[121.56,29.88],
                icon: require('../../assets/j-car.png')
            })
            this.map.add(marker)
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
