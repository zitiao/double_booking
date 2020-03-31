import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/bar'; 
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
// props: {
//   data: [
//     { desc: '', number: 0 }
//   ],
//   title: '',
//   seriesName:'',
//   reverted:false,
// }

function BasicBarChart(props) {
  const { data, title, seriesName, reverted } = props;
  const xAxisData = data.map(d => d.desc);
  const seriesData = data.map(d => parseFloat(d.number).toFixed(2));

  const option = {
    title: {
      text: title
    },
    tooltip: {},
    xAxis: reverted ? {} : { data: xAxisData },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      }
    },
    yAxis: reverted ? { data: xAxisData } : {},
    series: [{
      name: seriesName,
      type: 'bar',
      data: seriesData,
      label: {
        show: true,
        position: 'top'
      },
    }],
  }

  return (
    <ReactEchartsCore
      echarts={echarts}
      lazyUpdate={true}
      option={option}
    />
  );
}
export default BasicBarChart;
