import { connect } from 'dva';
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import BasicBarChart from '../components/charts/BasicBarChart';
import AcctDocTable from './components/AcctDocTable';
import CascadingSelector from './components/CascadingSelector';

const { MonthPicker } = DatePicker;
function Main(props) {

    const { dispatch, acctDocData, summaryAcctDoc, selectedClass, selectedMonth } = props;

    const filterData = summaryAcctDoc.filter(a => {
        if (!selectedClass[0] && a.account_layer1 !== '外部账户') return true
        else {
            if (!selectedClass[1]) {
                return a.account_layer1 === selectedClass[0];
            } else {
                if (!selectedClass[2]) {
                    return a.account_layer1 === selectedClass[0] && a.account_layer2 === selectedClass[1];
                } else {
                    return a.account_layer1 === selectedClass[0] && a.account_layer2 === selectedClass[1] && a.account_layer3 === selectedClass[2];
                }
            }
        }
    })

    const filterTableData = acctDocData.filter(a => {
        if (!selectedClass[0]) return true
        else {
            if (!selectedClass[1]) {
                return a.account_layer1 === selectedClass[0];
            } else {
                if (!selectedClass[2]) {
                    return a.account_layer1 === selectedClass[0] && a.account_layer2 === selectedClass[1];
                } else {
                    return a.account_layer1 === selectedClass[0] && a.account_layer2 === selectedClass[1] && a.account_layer3 === selectedClass[2];
                }
            }
        }
    })

    const getCurrentLayer = (a) => {
        if (!selectedClass[0]) return 'account_layer1';
        else if (!selectedClass[1]) return 'account_layer2';
        else if (!selectedClass[2] && a[0].account_layer3 !== '') return 'account_layer3';
        else return 'account_txt';
    }

    const sumData = (a) => {
        let resultObj = {};
        const c = getCurrentLayer(a);
        a.forEach((v, i, a) => {
            const layerString = v[c];
            if (resultObj.hasOwnProperty(layerString)) {
                resultObj[layerString] += v.totalOut - v.totalIn;
            } else {
                resultObj[layerString] = {};
                resultObj[layerString] = v.totalOut - v.totalIn;
            }
        })

        return resultObj;

    };

    const summaryData = sumData(filterData);
    const keys = Object.keys(summaryData);

    let total = 0;
    const barData = keys.map(s => {
        total += summaryData[s];
        return {
            desc: s,
            number: summaryData[s]
        }
    }
    )


    var onChange = (date, dateString) => {
        dispatch({
            type: 'kanban/setMonth',
            payload: dateString
        });
    }

    return (
        <div>
            {/* {JSON.stringify(summaryAcctDoc)} */}
            <MonthPicker onChange={onChange} placeholder="选择月份" value={moment(selectedMonth)} />
            <CascadingSelector />
            <Row>
                <Col span={24}>
                    <BasicBarChart data={barData} reverted={true} />
                </Col>
            </Row>
            {total}
            <AcctDocTable data={filterTableData} />
        </div>
    );
}

function mapStateToProps(state) {
    return { ...state.kanban }
}

export default connect(mapStateToProps)(Main);
