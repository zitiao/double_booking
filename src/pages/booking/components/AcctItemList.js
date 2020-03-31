import { List, Avatar } from 'antd';
import { connect } from 'dva';

function AcctItemList(props) {
    const { direction, formData, outerItemArray, innerItemArray } = props;
    const listData = direction === 'outer' ? outerItemArray : innerItemArray;
    return (
        <div>
            {
                listData.map(l => {
                    return (
                        <div>
                            <h4>{l.title}</h4>
                            <p><span>{l.account}：</span><span>{l.amount}</span></p>
                        </div>
                    )
                })
            }
        </div>

    )
}

function mapStateToProps(state) {
    return { ...state.booking }
}

export default connect(mapStateToProps)(AcctItemList);


