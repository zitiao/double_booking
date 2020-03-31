import { connect } from 'dva';
import AccttDocItemForm from './AcctDocItemForm';
import AcctItemList from './AcctItemList';
import './AccountDocInputPanal.less';

function AccountDocInputPanal(props) {
    const { direction, outerItemArray, innerItemArray } = props;

    let outAmmount = 0;
    let inAmmount = 0;

    outerItemArray.forEach((v, i, a) => {
        outAmmount += parseFloat(v.amount)
    })
    innerItemArray.forEach((v, i, a) => {
        inAmmount += parseFloat(v.amount)
    })
    return (
        <div className='accountDocInputPanal'>
            <h3>{direction === 'outer' ? `流出：${outAmmount}` : `流入：${inAmmount}`}</h3>
            <AcctItemList direction={direction} />
            <AccttDocItemForm direction={direction} />
        </div>
    )
}

function mapStateToProps(state) {
    return { ...state.booking }
}

export default connect(mapStateToProps)(AccountDocInputPanal);