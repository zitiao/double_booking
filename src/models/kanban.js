import axios from 'axios';
import moment from 'moment';

export default {
    namespace: 'kanban',
    state: {
        acctDocData: [],
        summaryAcctDoc: [],
        selectedClass: [],
        selectedMonth: ''
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
        setMonth(state, { payload: month }) {
            let newMonth = month ? month : moment().format('YYYY-MM');
            return { ...state, selectedMonth: newMonth };
        },
    },
    effects: {
        * getAcctDoc(action, { put, select }) {
            const { selectedMonth } = yield select(state => state.kanban);
            const result = yield axios.post(`app/acctDoc/getAcctDoc`, { month: selectedMonth });
            yield put({ type: 'setAcctDocData', payload: result.data });
        },
        * getSummaryAcct(action, { put, select }) {
            const result = yield axios.post(`app/acctDoc/getSummary`);
            yield put({ type: 'setSummaryAcctDoc', payload: result.data });
        },
    },
    subscriptions: {
        initial({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === "/kanban") {
                    dispatch({ type: 'setMonth' });
                    dispatch({ type: 'getAcctDoc' });
                    dispatch({ type: 'getSummaryAcct' });
                    dispatch({ type: 'acct/getAcctLayer' });
                }
            })
        }

    },
}

