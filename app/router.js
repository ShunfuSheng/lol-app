import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'
import {
  initializeListeners,
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import Home from './containers/Home'
import Loading from './containers/Loading'
import Sociality from './containers/Sociality'
import Detail from './containers/Detail'

const HomeNavigator = TabNavigator(
  {
    Home: { screen: Home },
    Sociality: { screen: Sociality },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
      activeTintColor: '#FDB629',
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
  }
)

const MainNavigator = StackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    Detail: { screen: Detail },
  },
  {
    headerMode: 'float',
  }
)

const AppNavigator = StackNavigator(
  {
    Main: { screen: MainNavigator },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
)

function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)
const addListener = createReduxBoundAddListener('root')

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentDidMount() {
    initializeListeners('root', this.props.router)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const { dispatch, app, router } = this.props
    if (app.loading) return <Loading />

    const navigation = addNavigationHelpers({
      dispatch,
      state: router,
      addListener,
    })
    return <AppNavigator navigation={navigation} />
  }
}

// 提供外部获取路由信息
export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}

export default Router
