import {
    Input,
    Select,
    Row,
    Col,
    Button,
} from 'antd';
import { connect } from 'dva';
import React from 'react';
const { Option } = Select;

function AccttDocItemForm(props) {
    const { acctArray, direction, dispatch } = props;

    const addItem = (itemData) => {
        if (direction === 'outer') {
            dispatch({ type: 'booking/setOuterItem', payload: itemData })
        } else {
            dispatch({ type: 'booking/setInnerItem', payload: itemData })
        }
    }
    return (
        <DocItemForm acctArray={acctArray} addItem={addItem} />
    )
}

function mapStateToProps(state) {
    return { ...state.booking }
}

export default connect(mapStateToProps)(AccttDocItemForm);

class DocItemForm extends React.Component {

    state = {
        title: '',
        amount: '',
        account: '',
    }

    fieldChange = (e, field) => {
        let value = '';
        if (e.hasOwnProperty('target')) {
            value = e.target.value;
        } else {
            value = e;
        }
        let newState = { ...this.state };
        newState[field] = value;
        this.setState(newState);
    }

    addItem = () => {
        const { addItem } = this.props;

        addItem(this.state);

    }

    render() {

        const { acctArray } = this.props;

        return (
            <div>
                <Row gutter={10}>
                    <Col span={24}>
                        <Input placeholder='项目描述' onChange={(e, field) => this.fieldChange(e, 'title')} value={this.state.title} />
                    </Col>
                    <Col span={12}>
                        <Input placeholder='金额' onChange={(value, field) => this.fieldChange(value, 'amount')} value={this.state.amount} />
                    </Col>
                    <Col span={24}>
                        <Select placeholder='账户' style={{ width: '100%' }} allowClear={true} onChange={(value, field) => this.fieldChange(value, 'account')} value={this.state.account}>
                            {
                                acctArray.map(a => (
                                    <Option key={a.account_id} value={a.account_id}>{a.account_grp_id}-{a.account_txt}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col span={24}>
                        <Button onClick={() => this.addItem()}>添加</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
