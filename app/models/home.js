import { createAction } from '../utils';
import { httpGet } from '../services/server';


export default {
    namespace: 'home',
    state: {
        listData: []
    },

    // 同步操作
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload };
        },
    },

    // 异步操作
    effects: {
        *fetch({ payload }, { call, put }) {
            const { data } = yield call(httpGet, 'https://www.christophere.com/league-of-legends/v1/get_list');
            yield put(createAction('save')({ listData: data }));
        }
    },

    // 订阅数据源
    subscriptions: {
        setup({ dispatch }) {
            // dispatch({ type: 'fetch', payload: {} });
        },
    }
}