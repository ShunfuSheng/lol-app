import React from 'react'
import { AppRegistry } from 'react-native'

import dva from './utils/dva'
import Router, { routerMiddleware } from './router'

import appModel from './models/app'
import homeModel from './models/home'
import socialityModel from './models/sociality'
import routerModel from './models/router'

const app = dva({
  initialState: {},
  models: [appModel, homeModel, socialityModel, routerModel],
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('DvaStarter', () => App)
