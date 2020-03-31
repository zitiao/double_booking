import { connect } from 'dva';
import { Select, Row, Col } from 'antd';


const { Option } = Select;

function CascadingSelector({ dispatch, summaryAcctDoc, selectedClass, acctLayer }) {
    const changeSelectedClass = (v, index) => {
        dispatch({
            type: 'kanban/setSelectedClass',
            payload: {
                value: v,
                index: index
            }
        })
    };

    return (
        <div>
            <Row gutter={16}>
                <Col md={8} sm={24}>
                    <Select
                        value={selectedClass[0]}
                        style={{ width: '100%' }}
                        allowClear
                        onChange={(value) => changeSelectedClass(value, 0)}
                        placeholder="选择"
                    >
                        {
                            acctLayer ?
                                [...new Set(acctLayer.map(c => c.account_layer1))].map(c => <Option key={c} value={c}>{c}</Option>)
                                : ''
                        }
                    </Select>
                </Col>
                <Col md={8} sm={24}>
                    <Select
                        value={selectedClass[1]}
                        style={{ width: '100%' }}
                        allowClear
                        onChange={(value) => changeSelectedClass(value, 1)}
                        placeholder="选择"
                    >
                        {
                            acctLayer ?

                                [...new Set(acctLayer.filter(c => c.account_layer1 === selectedClass[0]).map(c => c.account_layer2))].map(c => <Option key={c} value={c}>{c}</Option>)
                                : ''
                        }
                    </Select>
                </Col>
                <Col md={8} sm={24}>
                    <Select
                        value={selectedClass[2]}
                        style={{ width: '100%' }}
                        allowClear
                        onChange={(value) => changeSelectedClass(value, 2)}
                        placeholder="选择"
                    >
                        {
                            acctLayer ?

                                [...new Set(acctLayer.filter(c => c.account_layer1 === selectedClass[0] && c.account_layer2 === selectedClass[1]).map(c => c.account_layer3))].map(c => <Option key={c} value={c}>{c}</Option>)
                                : ''
                        }
                    </Select>
                </Col>
            </Row>



        </div>
    )
}

function mapStateToProps(state) {
    return { ...state.kanban, ...state.acct }
}

export default connect(mapStateToProps)(CascadingSelector);