import { createAction } from '../utils'
import { httpGet } from '../services/server'

export default {
  namespace: 'home',
  state: {
    listData: [],
    page: 0,
    loading: false,
    isEnd: false,
  },

  // 同步操作
  reducers: {
    save(state, { payload: {data, page, loading, isEnd} }) {
      const newList = [...state.listData, ...data];
      return { ...state, listData: newList, page, loading, isEnd }
    },
    saveLoading(state, {payload: {loading}}) {
      return { ...state, loading }
    },
  },

  // 异步操作
  effects: {
    *fetch({ payload }, { call, put }) {
      yield put(createAction('saveLoading')({ loading: true }));
      const { data, isEnd } = yield call(httpGet, `https://www.christophere.com/api/league-of-legends/v1/get_list?page=${payload.page}`);
      yield put(createAction('save')({ data, page: payload.page, loading: false, isEnd }));
    },
  },

  // 订阅数据源
  subscriptions: {
    setup({ dispatch }) {
      // dispatch({ type: 'fetch', payload: {} });
    },
  },
}
