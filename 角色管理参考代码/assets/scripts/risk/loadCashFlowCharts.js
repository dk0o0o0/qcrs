/**
 *现金流图表绘图js*/
var myChart = echarts.init(document.getElementById('main'));   // , "shine"
var cashFlowX=$('#id_cashFlowX').val();
var cashFlowY=$('#id_cashFlowY').val();
var arrX=cashFlowX.split(",");
var arrY=cashFlowY.split(",");
option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    toolbox: {
                feature: {
                	dataView:{ },
                    dataZoom: {
                          yAxisIndex: 'none'
                    },
                    //restore: {},
                    saveAsImage: {}
                    
                }
            },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            name:'日期',
            nameLocation:'middle',
            nameGap:'21',
            data :arrX,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            max:'dataMax',
            name:'金额(万元)'
        }
    ],
    series : [
        {
            name:'现金流',
            type:'bar',
            barWidth: '60%',
            data:arrY
        }
    ]
};




        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);