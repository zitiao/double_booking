import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/treemap';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
function BasicTreeMap(props) {
    const { data, title } = props;

    let handledData = [{ name: '正常', value: 0 }, { name: '异常', value: 0, children: [] }];
    data.forEach((v, i, a) => {
        if (v.name === '正常') { handledData[0].value = v.value }
        else {
            handledData[1].value += v.value;
            handledData[1].children.push(v);
        }
    })

    const option = {
        title: {
            text: title
        },
        series: [{
            type: 'treemap',
            data: handledData
        }],
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                saveAsImage: { show: true },
            }
        },
        label: {
            show: true,
        },
        tooltip: {},
    };

    return (
        <ReactEchartsCore
            echarts={echarts}
            lazyUpdate={true}
            option={option}
        />
    );
}
export default BasicTreeMap;
