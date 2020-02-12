<template>
    <div class="line-time-box">
        <div class="charts-title">急救节点平均时间</div>
        <div id="chart" style="width:100%;height:90%"></div>
    </div>
</template>
<script>
import Highcharts from 'highcharts'
export default {
    name:'lineTime',
    data() {
        return {
            chart: null,
      newData:[{
            name: '出车时间',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 24, 23.3],
        }, {
            name: '到达时间',
            data: [3.3, 4.2, 5.7, 8.5, 11.9, 15.5, 17.0, 16.6, 14.2]
        },{
            name: '现场救治时间',
            data: [0.6, 4.4, 5.9, 10.5, 17.9, 16.5, 17.0, 19.6, 19.2]
        },{
            name: '送院路途时间',
            data: [3.9, 2.2, 6.7, 5.5, 25, 23.2, 19.0, 18.6, 15.2]
        },{
            name: '院内院前交接时间',
            data: [3.9, 5.2, 7.7, 9.5, 15.9, 15.2, 19.0, 16.6, 20.2]
        },{
            name: '回站时间',
            data: [4.9, 8.2, 7.7, 14.5, 14.9, 19.2, 17.0, 20.6, 25]
        }]
        }
    },
    beforeDestroy() {
        if (!this.chart) {
        return
        }
        this.chart.destroy()
        this.chart = null
    },
    mounted() {
        this.initChart();
    },
    created() {

    },
    methods:{
    initChart() {
      this.chart = Highcharts.chart('chart', {
            chart: {
                type: 'spline',
                backgroundColor: 'rgba(0,0,0,0)',
                spacingBottom:5,
            },
            credits: { enabled: false}, //去掉图表的highcharts文字
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            legend: {  //图例
                //enabled:false,
                align:'left',
                itemMarginTop: 0,
                verticalAlign:'top',
                itemDistance:12,
                y:0,
                x:0,
                marginBottom:10,
                itemHoverStyle:{
                    color:'#909399'
                },
                itemStyle: {
                    color: '#909399',
                }
            },
            xAxis: {
                categories: ['中心','第一分中心','第二分中心','第三分中心','中医院','第二医院','李惠利医院','鄞州人民医院','李惠利东部医院','第九医院','宁波大学附属医院','妇儿医院北部院区'],
                gridLineColor:'#e5e5e5',
                labels:{
                    formatter() {
                            //获取到刻度值
                        var labelVal = this.value;
                            //实际返回的刻度值
                        var reallyVal = labelVal;
                            //判断刻度值的长度
                        if(labelVal.length > 4){
                            //截取刻度值
                            reallyVal = labelVal.substr(0,4)+"<br/>"+labelVal.substring(4,labelVal.length);
                        }
                        return reallyVal
                    },
                    style:{
                        color: '#303133'
                    }
                }
            },
            yAxis: {
                title: {
                    text: '分钟',
                    align:'high',
                    y:4,
                    x:-10,
                    rotation:360,
                    style:{
                        color:'#303133'
                    }
                },
                gridLineColor:'#e5e5e5',
                tickPositions: [0,5,10,15,20,25,30],
                labels:{
                    align:'left',
                    style:{
                        color: '#303133'
                    }
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        // 开启数据标签
                        enabled: true,
                        style:{
                            textOutline:'rgba(0,0,0,0)',
                            color:'#fff',
                            fontWeight:'normal'
                        }          
                    },
                    // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                    enableMouseTracking: false
                }
            },
            series: this.newData
        });
    } 
  }
}
</script>
<style lang="scss" scoped>
.line-time-box{
    width:100%;
    height:100%;
    padding:12px;
    box-sizing:border-box;
    background:#fff;
}
.charts-title{
    width:100%;
    height:10%;
    font-size:16px;
    color:#606266;
}
</style>

