<template>
    <div class="abnormal-container">
        <div class="abnormal-box">
            <div class="charts-title">急救车异常状况</div>
            <div class="carousel-hidden">
                <div class="carousel-box" ref="carousel" :style="carouselStyle">
                    <div class="carousel" v-for="(item,index) in abnormalOptions" :key="index" ref="item">
                        <div class="car-item">
                            <div class="title">{{item.title}}</div>
                            <ul>
                                <li v-for="(item1,index1) in item.arr" :key="index1">
                                    <i></i>
                                    {{item1}}<span>异常</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'abnormal',
    data() {
        return {
            carouselStyle:{},
            moveTo:0,
            transformFlag:true,
            abnormalOptions:[{
                title:'070 浙B3360X 30号车',
                arr:['上下担架车在位','负压式骨折固定垫在位','急救舱中门开关 I/O','软担架在位']
            },{
                title:'032 浙B602DN 35号车',
                arr:['心电监护除颤仪在位','呼吸机在位','负压式骨折固定垫在位']
            },{
                title:'087 浙B1150QV 15号车',
                arr:['氧气瓶 1 余量 0-5V','病人保险带系未系 I/O']
            },{
                title:'087 浙B1150QV 15号车',
                arr:['氧气瓶 1 余量 0-5V','病人保险带系未系 I/O']
            },{
                title:'087 浙B1150QV 15号车',
                arr:['氧气瓶 1 余量 0-5V','病人保险带系未系 I/O']
            },{
                title:'087 浙B1150QV 15号车',
                arr:['氧气瓶 1 余量 0-5V','病人保险带系未系 I/O']
            }]
        }
    },
    mounted() {
        let carousel = this.$refs.carousel;
        let that = this;
        let setTime = setInterval(() => {
            this.moveTo = carousel.firstChild.offsetHeight;
            this.transformFlag = true;
            this.carouselStyle = {
                'transition': `all 2s linear`,
                'transform': `translate(0,-${this.moveTo + 12}px)`
            }
            function whichTransitionEvent(){
                let t,
                el = document.createElement('surface'),
                transitions = {
                    'transition':'transitionend',
                    'OTransition':'oTransitionEnd',
                    'MozTransition':'transitionend',
                    'WebkitTransition':'webkitTransitionEnd'
                }
                for(t in transitions){
                    if( el.style[t] !== undefined ){
                        return transitions[t];
                    }
                }
            }
            let transitionEvent = whichTransitionEvent();
            let handle = ()=> {
                if(this.transformFlag) {
                    let fitstDom = carousel.removeChild(carousel.firstChild);
                    carousel.lastChild.after(fitstDom)
                    this.carouselStyle = {
                        'transition': 'none',
                        'transform': `translate(0,0)`
                    }
                    carousel.removeEventListener(transitionEvent,handle);//销毁事件   
                }
                this.transformFlag = false;
            }
            transitionEvent && carousel.addEventListener(transitionEvent,handle);
        },5000)
    }
}
</script>
<style lang="scss" scoped>
.abnormal-container{
    width:100%;
    height:440px;
    .abnormal-box{
        width:100%;
        height:100%;
        padding:12px;
        background:#fff;
        box-sizing: border-box;
        overflow:hidden;
    }
    .carousel-hidden{
        width:100%;
        height:90%;
        overflow:hidden;
    }
    .carousel-box{
        width:100%;
        height:90%;
        padding:0 20px;
        box-sizing:border-box;
        .carousel{
            width:100%;
            margin-bottom:12px;
            .car-item{
                width:100%;
                background:#edf1f2;
                border:1px solid #edf1f2;
                padding:12px;
                box-sizing:border-box;
                .title{
                    width:100%;
                    font-size:12px;
                    font-weight: bold;
                    color:#606266;
                }
                ul{
                    width:100%;
                    margin:0;
                    padding:0;
                    margin-top:12px;
                    li{
                        position:relative;
                        width:100%;
                        list-style:none;
                        font-size:12px;
                        font-weight: 400;
                        color:#606266;
                        padding-left:16px;
                        box-sizing:border-box;
                        margin:8px 0;
                        &:last-child{
                            margin-bottom:0;
                        }
                        span{
                            color:#F56C6C;
                            margin-left:12px;
                        }
                        i{
                            display:block;
                            position:absolute;
                            top:50%;
                            left:0;
                            transform:translate(0,-50%);
                            width:5px;
                            height:5px;
                            border-radius:50%;
                            background:#F56C6C;
                        }
                    }
                }
            }
        }
    }
}
.charts-title{
    width:100%;
    height:10%;
    font-size:16px;
    color:#606266;
}
</style>

