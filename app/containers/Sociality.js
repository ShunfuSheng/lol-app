import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  SectionList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  findNodeHandle,
  RefreshControl
} from 'react-native'
import { UIManager } from 'NativeModules'
import { connect } from 'react-redux'
import BaseComponent from '../components/BaseComponent'
import FixedTitle from '../components/FixedTitle'
import SocialityTopic from '../components/SocialityTopic'
import SocialityCategory from '../components/SocialityCategory'
import { createAction } from '../utils'

@connect(({ sociality }) => ({ ...sociality }))
class Sociality extends BaseComponent {
  constructor(props) {
    super(props);
    this.initData();
    this.state = {
      fixTop: false,
      modalVisible: false,
      boxPosition: 0,
    }
  }

  static navigationOptions = {
    title: '萌友',
    tabBarLabel: '萌友',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/mengyou.png')}
      />
    ),
    // 底部Tab切换中间件
    tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      // alert(scene.route.routeName);
      jumpToIndex(scene.index)
    },
  }

  // 滚动监听事件处理
  scrollHandle = () => {
    let handle = findNodeHandle(this.myShow);
    // 获取特定组件的大小及在屏幕中的位置
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      if (pageY <= height && pageY >= -10) {
        this.setState({ fixTop: true });
      }else if (pageY > height) {
        this.setState({ fixTop: false });
      }
    });
  }

  // 设置遮罩层
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  // 点击帖子操作处理
  pressHandle = (nativeEvent, id) => {
    let pageY = 0;
    if(nativeEvent.pageY > 520) {
      pageY = Math.floor(nativeEvent.pageY) - 110;
    }else {
      pageY = Math.floor(nativeEvent.pageY) + 10;
    }
    this.setState({
      modalVisible: true,
      boxPosition: pageY,
      currentId: id
    });
  }

  // 上拉刷新处理
  _onRefresh = () => {
    const { dispatch } = this.props;
    dispatch(createAction('sociality/fetch')({}));
  }

  render() {
    const { commentData, topicList, categoryList, refreshing } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          onScroll={this.scrollHandle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />
          }
        >
          <View style={styles.header}>
            {/* 头部 */}
            <View style={styles.title}>
              <Text style={{ fontSize: 20, color: '#000' }}>正在热议</Text>
              <Image
                style={{ width: 20 }}
                source={require('../images/angle-right.png')}
              />
            </View>
            {/* banner区域 */}
            <View>
              <Image
                style={{ width: '100%', borderRadius: 8 }}
                source={require('../images/1.png')}
              />
            </View>
            {/* 话题区域 */}
            <SocialityTopic data={topicList} />
            {/* 分类区域 */}
            <SocialityCategory data={categoryList} />
          </View>
          {/* 评论模块 */}
          <View>
            <SectionList
              renderItem={({ item, index, section }) => (
                <View style={styles.commentItem}>
                  <View style={styles.itemHead}>
                    <View style={styles.hh}>
                      <Image style={styles.avatar} source={require('../images/use-avatar.jpg')} resizeMode="cover" />
                      <View>
                        <Text style={{ fontSize: 16, color: '#333' }}>
                          {item.name}
                        </Text>
                        <View style={styles.itemSubTitle}>
                          {item.gender === 'man' ? (
                            <Image style={styles.gender} source={require('../images/man.png')} resizeMode="cover" />
                          ) : (
                            <Image style={styles.gender} source={require('../images/woman.png')} resizeMode="cover" />
                          )}
                          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', marginRight: 8 }}>
                            <Text style={{ color: '#EEB422', fontSize: 12, fontWeight: 'bold' }}>
                              {item.level}
                            </Text>
                          </View>
                          <Text style={{ fontSize: 16, color: 'gray' }}>
                            {item.lastLogin}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <TouchableHighlight onPress={({nativeEvent}) => {this.pressHandle(nativeEvent, item.id)}}>
                      <Image style={{ width: 14 }} source={require('../images/angle-down.png')} />
                    </TouchableHighlight>
                  </View>
                  <View style={styles.itemBody}>
                    <Text style={styles.article}>{item.content}</Text>
                  </View>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View style={this.state.fixTop ? {opacity: 0}: {opacity: 1}}>
                  <FixedTitle title={title} ref={(ref) => this.myShow=ref} />
                </View>
              )}
              sections={[{ title: '萌友说', data: commentData }]}
              keyExtractor={(item, index) => item.id}
            />
          </View>
        </ScrollView>
        <View style={this.state.fixTop ? styles.fixedToTop : { display: 'none' }}>
          <FixedTitle title="萌友说" />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
            <View style={styles.modalWrap}></View>
          </TouchableHighlight>
          <View style={[styles.popover, {top: this.state.boxPosition}]}>
            <TouchableOpacity onPress={() => alert('帖子ID: ' + this.state.currentId)}>
              <View style={{paddingTop: 10, paddingBottom: 10, borderColor: 'gainsboro', borderBottomWidth: 1}}>
                <Text style={{fontSize: 20}}>不感兴趣</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('帖子ID: ' + this.state.currentId)}>
              <View style={{paddingTop: 10, paddingBottom: 10}}>
                <Text style={{fontSize: 20}}>举报帖子</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 28,
    height: 28,
  },
  header: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'space-between',
  },
  commentItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemHead: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hh: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  itemSubTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gender: {
    width: 14,
    height: 14,
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  itemBody: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  article: {
    fontSize: 18,
    lineHeight: 36,
  },
  fixedToTop: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  modalWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  popover: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    right: 10,
  }
})

export default Sociality
