import React, { Component } from 'react'
import { createAction } from '../utils'

class BaseComponent extends Component {
  initData = () => {
    const currentScreen = this.props.navigation.state.routeName
    // alert(currentScreen);
    switch (currentScreen) {
      case 'Home':
        this.props.dispatch(createAction('home/fetch')({}))
        break
      case 'Detail':
        this.props.dispatch(createAction('home/fetch')({}))
        break
      case 'Sociality':
        this.props.dispatch(createAction('sociality/fetch')({}))
        break
      default:
        alert('界面不存在，请返回！')
        break
    }
  }
}

export default BaseComponent
