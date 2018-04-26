import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import BaseComponent from '../components/BaseComponent'
import { NavigationActions, createAction } from '../utils'

@connect(({ home }) => ({ ...home }))
class Home extends BaseComponent {
  constructor(props) {
    super(props)
    this.initData()
  }

  static navigationOptions = {
    title: '资讯',
    tabBarLabel: '资讯',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/infomation.png')}
      />
    ),
  }

  gotoDetail = id => {
    this.props.dispatch(
      NavigationActions.navigate({ routeName: 'Detail', params: { id } })
    )
  }

  _onEndReached = (info) => {
    const { dispatch, page, loading, isEnd } = this.props;
    if (!loading && !isEnd) {
      dispatch(createAction('home/fetch')({ page: page + 1 }));
    }
  }

  render() {
    const { listData, loading, isEnd } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Swiper
            autoplay
            dotColor="#333"
            activeDotColor="#FDB629"
            autoplayTimeout={4}
          >
            <View style={styles.slide1}>
              <Image
                style={styles.banner}
                source={require('../images/1.png')}
              />
            </View>
            <View style={styles.slide2}>
              <Image
                style={styles.banner}
                source={require('../images/2.png')}
              />
            </View>
            <View style={styles.slide3}>
              <Image
                style={styles.banner}
                source={require('../images/3.png')}
              />
            </View>
          </Swiper>
        </View>
        <FlatList
          data={listData}
          keyExtractor={item => item.id}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.02}
          ListFooterComponent={() => (
            isEnd ? (
              <View style={styles.show}>
                <Text style={{ fontSize: 28 }}>已经到底了！</Text>
              </View>
            ) : (
                <View style={loading ? styles.show : styles.hide}>
                  <ActivityIndicator size="large" color="#00ff00" />
                </View>
              )
          )}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                this.gotoDetail(item.key)
              }}
            >
              <View style={styles.listItem}>
                <View style={styles.leftSec}>
                  <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 20, color: '#000' }}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={{ color: 'gray' }}>
                    {item.author}&nbsp;&nbsp;&nbsp;&nbsp;{item.num}万阅
                  </Text>
                </View>
                <View style={styles.rightSec}>
                  <Image
                    source={require('../images/detail.png')}
                    style={{ width: '100%' }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  icon: {
    width: 28,
    height: 28,
  },
  wrapper: {
    width: '100%',
    height: 168,
  },
  banner: {
    width: '100%',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  listItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gainsboro',
    padding: 15,
  },
  leftSec: {
    width: '70%',
  },
  rightSec: {
    width: '30%',
    paddingLeft: 10,
  },
  show: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    opacity: 1,
  },
  hide: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    opacity: 0,
  }
})

export default Home
