<template>
    <div class="task-count-container">
        <div :id="`${id}`" class="container"></div>
    </div>
</template>
<script>
import Highcharts from 'highcharts'
export default {
    name:'taskCount',
    props:{
        id:{
            type:String,
            default:'container'
        }
    },
    data() {
        return {
            chart: null,
        }
    },
    mounted() {
        this.chart = Highcharts.chart(`${this.id}`, {
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        xAxis: {
            show: false,
            categories: ['李惠利医院', '鄞州人民医院', '李惠利东部医院', '第九医院', '宁波大学附属医院'],
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
            }
        },
        credits: { enabled: false}, //去掉图表的highcharts文字
        yAxis: {
            min: 0,
            title: {
                text:null,
                // text: '人口总量 (百万)',
                // align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' 百万'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    allowOverlap: true // 允许数据标签重叠
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'center',
            verticalAlign: 'bottom',
            //x: -40,
            //y: 100,
            //floating: true,
            //borderWidth: 1,
            //backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            //shadow: true
        },
        series: [{
            name: '任务量',
            data: [107, 31, 635, 203, 2]
        }]
    });
    }
}
</script>
<style lang="scss" scoped>
.task-count-container{
    height:90%;
}
.container{
    width:100%;
    height:100%;
}
</style>

