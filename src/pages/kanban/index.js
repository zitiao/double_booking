import { connect } from 'dva';
import { Row, Col, Button } from 'antd';
import BasicBarChart from '../components/charts/BasicBarChart';
import AcctDocTable from './components/AcctDocTable';
import CascadingSelector from './components/CascadingSelector';

function Main(props) {

    const { dispatch, acctDocData, summaryAcctDoc, selectedClass } = props;

    const filterData = summaryAcctDoc.filter(a => {
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
        else if (!selectedClass[2] && a[0] && a[0][selectedClass[3]]) return 'account_layer3';
        else return 'account_txt';
    }

    const sumData = (a) => {
        let resultObj = {};
        const c = getCurrentLayer(a);
        console.log(c)
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


    return (
        <div>
            <CascadingSelector />
            <Row>
                <Col span={24}>
                    <BasicBarChart data={barData} reverted={true} />
                </Col>
            </Row>
            {total}
            <AcctDocTable data={filterTableData} />
            {
                `select 
                    h.title,
                    h.document_date,
                    i.amouunt,
                    i.dr_cr_flag,
                    a.account_txt,
                    l.account_layer1,
                    l.account_layer2,
                    l.account_layer3
                from accounting_document_h h
                INNER JOIN accounting_document_i i ON h.accounting_document_id= i.accounting_document_id
                INNER JOIN account_layer l ON i.account_id= l.account_id
                INNER JOIN account a on a.account_id= i.account_id
                order by h.create_datetime desc, h.title, i.dr_cr_flag desc`
            }
        </div>
    );
}

function mapStateToProps(state) {
    return { ...state.kanban }
}

export default connect(mapStateToProps)(Main);
