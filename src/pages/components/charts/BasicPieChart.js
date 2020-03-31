import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';

function BasicPieChart(props) {
  const { data, title, seriesName } = props;
  const legend = data.map(d => d.name);
  const option = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      top: 'bottom',
      data: legend
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      }
    },
    series: [
      {
        name: seriesName,
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <ReactEchartsCore
      echarts={echarts}
      lazyUpdate={true}
      option={option}
    />
  );
}


// CDN END
export default BasicPieChart;
