<template>
    <div class="wheel-path-container">
        <div class="choice-bar-container">
            <div class="choice-bar-box filter-container">
                <div style="width:300px" class="filter-item">
                    <el-input v-model="plate" placeholder="请选择车辆">
                        <el-button slot="append" icon="el-icon-search" @click="handleClick">选择</el-button>
                    </el-input>
                </div>
                <div class="filter-item">
                    <el-date-picker
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="filter-item">
                    <el-button type="primary" icon="el-icon-search">查询</el-button>
                </div>
                <div class="status-check-box" style="padding-bottom:0">
                    <div class="filter-item title">复选条件:</div>
                    <el-checkbox-group
                        class="filter-item" 
                        v-model="checkedCities1"
                        :min="1"
                        :max="7">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <select-car :flag="flag" :radio="true" @change="handleChange"></select-car>
        <!--状态显示-->
        <div class="status-popup" :style="{left:left,top:top}">
            <ul>
                <li><i></i>GPS定位:{{gps}}</li>
                <li><i></i>工作状态:待命中</li>
                <li><i></i>发动状态:待命中</li>
                <li><i></i>熄火状态状态:待命中</li>
                <li><i></i>在线状态:待命中</li>
            </ul>
        </div>
        <!--速度选择-->
        <div class="speed-box">
            <div class="speed">
                <el-row class="speed-row" :gutter="10" type="flex" align="middle">
                    <el-col>
                        <el-button type="primary" size="mini" @click="handlePlay"><svg-icon class="svgIcon" :icon-class="'play'"></svg-icon>开始播放</el-button>
                        <el-button type="primary" size="mini" :disabled="btnFlag" @click="handleSuspend"><svg-icon class="svgIcon" :icon-class="'suspend'"></svg-icon>暂停播放</el-button>
                        <el-button type="primary" size="mini" :disabled="btnFlag" @click="handleContinue"><svg-icon class="svgIcon" :icon-class="'continue'"></svg-icon>继续播放</el-button>
                        <el-button type="primary" size="mini" @click="handleStop"><svg-icon class="svgIcon" :icon-class="'stop'"></svg-icon>停止播放</el-button>
                    </el-col>
                </el-row>
                <el-row class="speed-row" :gutter="10" type="flex" align="middle">
                    <el-col class="title">行进速度:</el-col>
                    <el-col>
                        <el-slider
                        v-model="speedVal"
                        :step="50"
                        :max="1000"
                        show-stops>
                        </el-slider>
                    </el-col>
                </el-row>
                <el-row class="speed-row" :gutter="10" type="flex" align="middle">
                    <el-col class="title">进度条:</el-col>
                    <el-col>
                        <el-slider v-model="progress" :max="progressMax" show-stops @change="handleProgress"></el-slider>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div id="wheelPath"></div>
    </div>
</template>
<script>
const cityOptions = ['停车', '熄火', '后门开启', '中门开启','担架下车','显示车速','病人上下车'];
import selectCar from '@/components/selectCar'
export default {
    name:'wheelPath',
    components: {
        selectCar
    },
    data() {
        return {
            flag:false,
            plate:'',
            value6:'',
            speed:0,
            progress:0,
            countProgress:0,
            stopProgress:0,
            moveEnd:false,
            speedVal:50,
            progressMax:100,
            btnFlag:false,
            checkedCities1: [],
            cities: cityOptions,
            left:0,
            top:0,
            gps:'',
            marker:null,
            lineArr:[[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]],
            newLineArr:[],
            map:null,
            polyline:null,
            passedPolyline:null,
        }
    },
    watch:{
        progress(newVal, oldVal) {
            // 这个进度影响到
            if(newVal == this.lineArr.length) {
                this.moveEnd = true;
            }else{
                this.moveEnd = false;
            }
        }
    },
    created() {
        this.$store.dispatch('setPageLoading',true)
    },
    mounted() {
        this.map = new AMap.Map('wheelPath',{
            zoom:17,
            center: [116.397428, 39.90923],
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
        this.polyline = null;
        this.passedPolyline = null;
        this.map.destroy();
    },
    methods:{
        // 初始化
        init() {
            this.progressMax = this.lineArr.length;
            this.newLineArr = this.lineArr.concat([]);
            this.marker = new AMap.Marker({
                map: this.map,
                position: [116.478935,39.997761],
                icon:require('../../assets/j-car.png'),
                offset: new AMap.Pixel(-26, -19),
                autoRotation: true,
                angle:-90,
            });
            this.polyline = new AMap.Polyline({
                map: this.map,
                path: this.lineArr,
                showDir:true,
                strokeColor: "#4287ff",  //线颜色
                strokeWeight: 6,      //线宽
            });

            this.passedPolyline = new AMap.Polyline({
                map: this.map,
                strokeColor: "#AF5",  //线颜色
                strokeWeight: 6,      //线宽
                borderWeight:1,
                outlineColor:'#2170e3',
            });
            this.setLngLat(116.478935,39.997761)
            this.map.setFitView();
            this.marker.on('moveend',() => {
                this.progress += 1;
            })
            
            // 拖动地图
            this.map.on('dragging', this.showInfoDragging);
        },
        handleProgress(progress) {
            this.newLineArr = this.lineArr.slice(progress);
            this.stopProgress = progress;
        },
        setLngLat(lon,lat) {
            let lnglat = new AMap.LngLat(lon, lat);
            let pixel = this.map.lngLatToContainer(lnglat);
            this.left = `${pixel.x + 20}px`;
            this.top = `${pixel.y + 5}px`;
        },
        handlePlay() {
            // 播放重置
            this.btnFlag = false;
            if(this.moveEnd){
                this.progress = 0;
            }
            this.countProgress = this.progress;
            this.marker.on('moving',(e) => {
                this.passedPolyline.setPath(e.passedPath);
                let last = e.passedPath.length - 1;
                if(this.progress == 0) {
                    this.progress = last;
                }else{
                    this.progress = this.countProgress + last
                }
                let lon = e.passedPath[last].getLng();
                let lat = e.passedPath[last].getLat();
                this.setLngLat(lon,lat)
                this.gps = `${lon},${lat}`
            });
            this.marker.moveAlong(this.newLineArr, this.speedVal);
        },
        handleSuspend() {
            this.marker.pauseMove();
        },
        handleContinue() {
            this.marker.resumeMove();
        },
        handleStop() {
            this.btnFlag = true;
            this.progress = this.stopProgress;
            this.marker.stopMove();
        },
        showInfoDragging(e) {
            if(this.gps != '') {
                let arr = this.gps.split(',');
                this.setLngLat(arr[0],arr[1])
            }
        },
        handleChange(data) {
            if(data.keys) {
                this.plate = data.carPlate;
            }
            this.flag = data.flag;
        },
        handleClick() {
            this.flag = true;
        }
    }
}
</script>
<style lang="scss" scoped>
.wheel-path-container{
    position:relative;
    width:100%;
    height:calc(100vh - 84px);
}
#wheelPath{
    width:100%;
    height:100%;
}
.choice-bar-container{
    width:100%;
    position: absolute;
    top:12px;
    left:0;
    padding:0 12px;
    box-sizing:border-box;
    z-index:99;
    .choice-bar-box{
        width:100%;
        padding:12px;
        box-sizing:border-box;
        background:#fff;
        box-shadow:0px 0px 8px rgba(0,0,0,0.1);
    }
    .status-check-box{
        width:100%;
        overflow:hidden;
        margin-top:8px;
        .title{
            color:#606266;
        }
        .filter-item{
            float:left;
            margin-bottom:0;
        }
    }
}
.status-popup{
    width:250px;
    position: absolute;
    background:#fff;
    border-radius:6px;
    box-shadow:0px 0px 8px rgba(0,0,0,0.1);
    z-index:99;
    padding:12px;
    box-sizing: border-box;
    ul{
        width:100%;
        padding:0px;
        margin:0;
        li{
            position: relative;
            width:100%;
            height:30px;
            line-height:30px;
            list-style: none;
            font-size:14px;
            color:#606266;
            box-sizing: border-box;
            padding-left:12px;
            i{
                position: absolute;
                top:50%;
                left:0px;
                transform:translate(0,-50%);
                display:block;
                width:6px;
                height:6px;
                border-radius:50%;
                background:#67C23A;
            }
        }
    }
}
.speed-box{
    width:100%;
    position: absolute;
    bottom:0;
    left:0;
    z-index:99;
    padding:12px;
    overflow:hidden;
    border-radius:6px;
    box-sizing:border-box;
    .speed{
        width:100%;
        height:100%;
        background:#fff;
        padding:0 12px;
        box-sizing:border-box;
        box-shadow:0px 0px 8px rgba(0,0,0,0.1);
        .speed-row{
            width:100%;
            border-bottom:#e5e5e5 1px solid;
            box-sizing:border-box;
            &:first-child{
                padding:12px 0;
            }
            &:last-child{
                border-bottom:none;
            }
        }
        .title{
            width:100px;
            font-size:16px;
            color:#606266;
        }
    }
    .svgIcon{
        font-size:17px;
        margin-right:4px;
    }
}
</style>

