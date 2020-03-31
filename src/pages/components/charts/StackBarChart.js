import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
function StackBarChart(props) {
    const { data, yAxis, legend, title } = props;

    const seriesData = legend.map((v) => {
        const singleData = yAxis.map(l => data[l][v])
        return {
            name: v,
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: singleData
        }
    })

    const option = {
        title: {
            text: title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: legend,
            orient: 'horizontal',
            top: 'bottom',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '7%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: yAxis
        },
        series: seriesData
    };
    return (
        <ReactEchartsCore
            echarts={echarts}
            lazyUpdate={true}
            option={option}
        />
    );
}
export default StackBarChart;
