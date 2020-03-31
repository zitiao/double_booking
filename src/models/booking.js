import axios from 'axios';

export default {
    namespace: 'booking',
    state: {
        acctArray: [],
        outerItemArray: [],
        innerItemArray: [],
        formData: {
            title: '',
            date: ''
        },
    },
    reducers: {
        setAcct(state, { payload: acctArray }) {
            return { ...state, acctArray };
        },
        setOuterItem(state, { payload: obj }) {
            let oldArray = [...state.outerItemArray];
            oldArray.push(obj);
            return { ...state, outerItemArray: oldArray };
        },
        setInnerItem(state, { payload: obj }) {
            let oldArray = [...state.innerItemArray];
            oldArray.push(obj);
            return { ...state, innerItemArray: oldArray };
        },
        setFormData(state, { payload: { field, value } }) {
            let oldFormData = { ...state.formData };
            oldFormData[field] = value;
            return { ...state, formData: oldFormData };
        }

    },
    effects: {
        * getAcct(action, { put }) {
            const result = yield axios.get(`app/account/getAcct`)
            const acctArray = result.data;
            yield put({ type: 'setAcct', payload: acctArray });
        },
        * addAcctDoc(action, { put, select }) {
            let { formData, outerItemArray, innerItemArray } = yield select(state => state.booking);
            const result = yield axios.post(`app/acctDoc/addAcctDoc`, {
                outerItemArray: outerItemArray,
                innerItemArray: innerItemArray,
                title: formData.title,
                date: formData.date
            });
        }
    },
    subscriptions: {
        initial({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === "/booking") {
                    dispatch({ type: 'getAcct' });
                }
            })
        }

    },
}

