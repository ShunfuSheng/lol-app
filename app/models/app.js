import { createAction, NavigationActions, Storage } from '../utils'

export default {
  namespace: 'app',
  state: {
    loading: false,
    fetching: false,
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {},

  subscriptions: {},
}
