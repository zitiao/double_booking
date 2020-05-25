import axios from 'axios';

export default {
    namespace: 'acct',
    state: {
        acctLayer: []
    },
    reducers: {
        setAcctLayer(state, { payload: acctLayer }) {
            return { ...state, acctLayer };
        },
    },
    effects: {
        * getAcctgrp(action, { put }) {
            const result = yield axios.get(`app/account/getAcctgrp`);
        },
        * getAcctLayer(action, { put }) {
            const result = yield axios.get(`app/account/getAcctLayer`);
            yield put({ type: 'setAcctLayer', payload: result.data });
        },
    },
    subscriptions: {
        // initial({ dispatch, history }) {
        //     history.listen((location) => {
        //         if (location.pathname === "/booking") {
        //             dispatch({ type: 'getAcct' });
        //         }
        //     })
        //     // Toast.loading(`获取销售数据`, 0);
        // }
    },
}

