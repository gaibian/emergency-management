<template>
<div class="bar-page">
    <div class="charts-title">急救准点率</div>
    <div class="bar-charts-box" id="bar-charts-box"></div>
</div>
</template>
<script>
import Highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(Highcharts)
export default {
    name:'aidTime',
    data() {
        return {
            myChart:null,
            newData:[{
                name: '出车准点率',
                data: [90,98,78,86,65,90,76,78,78],
            },{
                name: '到达准点率',
                data: [20,90,78,90,56,78,5,39,98]
            }]
        }
    },
    mounted() {
        this.chart = Highcharts.chart('bar-charts-box',{
            chart: {
                type: 'column', //表示柱状图
                marginTop: 60,
                backgroundColor: 'rgba(0,0,0,0)',
                spacingBottom:5,
                options3d: {
                    enabled: true,
                    alpha: 0,
                    beta: 0,
                    depth: 35,
                    viewDistance: 25,      // 视图距离，它对于计算角度影响在柱图和散列图非常重要。此值不能用于3D的饼图
                    frame: {                // Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成
                        // 的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、
                        // side、back的属性一样，其中size为感官理解的厚度，color为面板颜色
                        bottom: {
                            size: 10
                        },
                        side: {
                            size: 1,
                            color: 'transparent'
                        },
                        back: {
                            size: 1,
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                },
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            credits: { enabled: false}, //去掉图表的highcharts文字
            plotOptions: {
                column: {
                    depth: 25,
                    groupPadding:0.25,
                    pointWidth: 15,
                },
            
            },
            legend: {  //图例
                align:'left',
                itemMarginTop: 0,
                verticalAlign:'top',
                y:0,
                x:-5,
                itemHoverStyle:{
                    color:'#909399'
                },
                itemStyle: {
                    color: '#909399',
                }
            },
            xAxis: {
                categories:['中心','分中心','第二医院','李惠利医院','鄞州人民医院','李惠利东部医院','第九医院','宁波大学附属医院','妇儿医院北部院区'],
                labels: {
                    style: {
                        color: '#303133'
                    },
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
                },
                gridLineColor:'#e5e5e5'
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineColor:'#e5e5e5',
                tickPositions: [0, 20, 40,60,80, 100],
                labels: {
                    style: {
                        color: '#303133'
                    },
                    formatter() {
                        return `<span style="color:${this.value == 80 ? '#F56C6C' : '#303133'}">${this.value}%</span>`
                    }
                },
            },
            series: this.newData
        },(chart) => {
            this.SetEveryOnePointColor(chart);
        });
    },
    methods:{
        SetEveryOnePointColor(chart) {
            let colorArr = ['rgba(34,97,254,1)', 'rgba(42,171,228,1)', 'rgba(234,165,80,1)'];
            //获得第一个序列的所有数据点
            var pointsList = chart.series[0].points;
            //遍历设置每一个数据点颜色
            for (var i = 0; i < pointsList.length; i++) {
                let itemY = chart.series[0].points[i];
                let itemX = chart.series[1].points[i];
                itemY.update({
                    color:{
                        linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                        stops:[
                            [0, Highcharts.Color(colorArr[0]).setOpacity(1).get('rgba')],
                            [1, itemY.y < 80 ? '#f32e0d' : 'rgba(42,171,228,1)']
                        ]
                    }
                })
                itemX.update({
                    color:{
                        linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 },
                        stops:[
                            [0, Highcharts.Color(colorArr[2]).setOpacity(1).get('rgba')],
                            [1, itemX.y < 80 ? '#f32e0d' : 'rgba(251,201,143,1)']
                        ]
                    }
                })
                
            }
        },
        handleUpdate() {
            this.newData = [{
                name: '出车准点率',
                type: 'column',
                data: [90,34,89,67,90,12,47,90,78],
            },{
                name: '出车准点率',
                type: 'column',
                data: [90,98,78,86,65,90,76,78,14],
            }]
            this.chart.update({
                series:this.newData
            })
        }
    },
    watch: {
      time() {
        this.handleUpdate()
      }
    },
    beforeDestroy() {
        if (!this.myChart) {
        return
        }
        this.myChart.destroy()
        this.myChart = null
    },   
    computed: {
      time() {
        return this.$store.state.dateTime
      }
    }, 
}
</script>
<style lang="scss" scoped>
.bar-charts-box{
    position:relative;
    width:100%;
    height:90%;
}
.charts-title{
    width:100%;
    height:10%;
    font-size:16px;
    color:#606266;
}
.bar-page{
    position:relative;
    width:100%;
    height:100%;
    padding:12px;
    box-sizing:border-box;
    background:#fff;
}

</style>