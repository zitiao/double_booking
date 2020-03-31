import { connect } from 'dva';
import AccountDocInputPanal from './components/AccountDocInputPanal';
import AccttDocHeaderForm from './components/AcctDocHeaderForm';
import { Row, Col, Button } from 'antd';

function Main(props) {

    const { dispatch } = props;
    
    const submit = () => {
        dispatch({ type: 'booking/addAcctDoc' })
    }

    return (
        <div>
            <Row>
                <AccttDocHeaderForm />
            </Row>
            <Row gutter={10}>
                <Col span={12}>
                    <AccountDocInputPanal direction='outer' />
                </Col>
                <Col span={12}>
                    <AccountDocInputPanal direction='inner' />
                </Col>
            </Row>
            <Row>
                <Button onClick={submit}>提交</Button>
            </Row>
        </div>
    );
}

function mapStateToProps(state) {
    return { ...state.booking }
}

export default connect(mapStateToProps)(Main);
