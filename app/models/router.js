import { delay, NavigationActions } from '../utils'
import { routerReducer } from '../router'

const actions = Object.values(NavigationActions).filter(
  x => typeof x === 'string' && x.startsWith('Navigation/')
)

const isPushAction = action =>
  action.type === NavigationActions.NAVIGATE ||
  action.type === NavigationActions.PUSH


/**
 * 通过之前的路由组件中提供的获取路由信息初始化到state中，effects中监听NavigationActions，然后
 * 调用apply来更新路由信息，最后又因为我们将路由信息链接到路由组件，所以就会有UI页面的切换
 */
export default {
  namespace: 'router',
  state: {
    ...routerReducer(),
  },
  reducers: {
    apply(state, { payload: action }) {
      return routerReducer(state, action)
    },
  },
  effects: {
    handlePush: [
      function* handlePush({ take, call, put }) {
        while (true) {
          const { payload } = yield take('handlePush')
          yield put({
            type: 'apply',
            payload,
          })
          // debounce, see https://github.com/react-community/react-navigation/issues/271
          yield call(delay, 500)
        }
      },
      { type: 'watcher' },
    ],
    watch: [
      function* watch({ take, put }) {
        while (true) {
          const action = yield take(actions)
          yield put({
            type: isPushAction(action) ? 'handlePush' : 'apply',
            payload: action,
          })
        }
      },
      { type: 'watcher' },
    ],
  },
}
