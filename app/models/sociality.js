import { createAction } from '../utils'
import { httpGet } from '../services/server'

export default {
  namespace: 'sociality',
  state: {
    commentData: [],
  },

  // 同步操作
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  // 异步操作
  effects: {
    *fetch({ payload }, { call, put }) {
      const { data } = yield call(
        httpGet,
        'https://www.christophere.com/league-of-legends/v1/get_comment'
      )
      yield put(createAction('save')({ commentData: data }))
    },
  },
}
