import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import BaseComponent from '../components/BaseComponent'

@connect(({ home }) => ({ ...home }))
class Detail extends BaseComponent {
  constructor(props) {
    super(props)
    this.initData()
  }

  static navigationOptions = {
    title: '详情',
  }

  render() {
    const { params } = this.props.navigation.state
    const { listData } = this.props
    const data = listData.find((item, index) => item.key == params.id)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.subTitle}>
          <Text style={styles.small}>{data.author}</Text>
          <Text style={styles.small}>{data.date}</Text>
        </View>
        <View>
          <Text style={styles.article}>{data.detail}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    color: '#000',
  },
  subTitle: {
    width: '100%',
    paddingBottom: 28,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  small: {
    fontSize: 16,
    color: 'gray',
  },
  article: {
    fontSize: 18,
    color: '#000',
    lineHeight: 36,
  },
})

export default Detail
