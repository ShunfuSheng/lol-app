import { createAction, sleep } from '../utils'
import { httpGet } from '../services/server'

export default {
  namespace: 'sociality',
  state: {
    refreshing: false,
    commentData: [],
    topicList: [
      {title: '刀妹COS创意大赛', color: 'red'},
      {title: 'LOL我们回来啦！', color: 'orangered'},
      {title: '勇气与信念互换贴', color: 'orange'},
      {title: '查看更多话题', color: 'gray'}
    ],
    categoryList: ['英雄攻略', '大区talk', '萌次元', '萌友杂谈', '全部分类']
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
      yield put(createAction('save')({ refreshing: true }))
      const { data } = yield call(httpGet, 'https://www.christophere.com/league-of-legends/v1/get_comment')
      // 模拟网络延迟3s时间
      sleep(3000);
      yield put(createAction('save')({ commentData: data, refreshing: false }))
    },
  },
}
