import axios from 'axios';

export default {
    namespace: 'kanban',
    state: {
        acctDocData: [],
        summaryAcctDoc: [],
        selectedClass: [],
    },
    reducers: {
        setAcctDocData(state, { payload: acctDocData }) {
            return { ...state, acctDocData };
        },
        setSummaryAcctDoc(state, { payload: summaryAcctDoc }) {
            return { ...state, summaryAcctDoc };
        },
        setSelectedClass(state, { payload: { value, index } }) {
            let array = [...state.selectedClass];
            array[index] = value;
            return { ...state, selectedClass: array };
        },
    },
    effects: {
        * getAcctDoc(action, { put }) {
            const result = yield axios.post(`app/acctDoc/getAcctDoc`);
            yield put({ type: 'setAcctDocData', payload: result.data });
        },
        * getSummaryAcct(action, { put }) {
            const result = yield axios.post(`app/acctDoc/getSummary`);
            yield put({ type: 'setSummaryAcctDoc', payload: result.data });
        },
    },
    subscriptions: {
        initial({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === "/kanban") {
                    dispatch({ type: 'getAcctDoc' });
                    dispatch({ type: 'getSummaryAcct' });
                    dispatch({ type: 'acct/getAcctLayer' });
                }
            })
        }

    },
}

