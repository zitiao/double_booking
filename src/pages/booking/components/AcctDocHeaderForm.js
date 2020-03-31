import {
    Input,
    Select,
    DatePicker,
    Row,
    Col
} from 'antd';
import { connect } from 'dva';
const { Option } = Select;

function AccttDocHeaderForm(props) {

    const { dispatch } = props

    const fieldChange = (e, field) => {
        let value = '';
        if (e.hasOwnProperty('target')) {
            value = e.target.value;
        } else {
            value = e;
        }
        dispatch({
            type: 'booking/setFormData', payload: {
                field: field,
                value: value
            }
        })
    }

    return (
        <div>
            <Row gutter={10}>
                <Col span={12}>
                    <Input onChange={(e, field) => fieldChange(e, 'title')} placeholder='款项概述' />
                </Col>
                <Col span={12}>
                    <DatePicker onChange={(e, field) => fieldChange(e, 'date')} placeholder='发生日期' />
                </Col>
            </Row>
        </div>
    )
}

function mapStateToProps(state) {
    return { ...state.booking }
}

export default connect(mapStateToProps)(AccttDocHeaderForm);


