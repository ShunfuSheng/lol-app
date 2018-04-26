import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';


class SocialityTopic extends Component {
    render() {
        const { data } = this.props;
        return (
            <View style={styles.hotTopic}>
                {
                    data.map((item, index) => (
                        <View style={styles.topicItem} key={index}>
                            <View
                                style={[
                                    styles.iconBefore,
                                    { backgroundColor: `${item.color}`, borderColor: `${item.color}` },
                                ]}
                            >
                                <View style={styles.txtWrap}>
                                    <Text style={styles.iconBeforeTxt}>#</Text>
                                </View>
                            </View>
                            <Text style={styles.topicTitle}>{item.title}</Text>
                        </View>)
                    )
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    hotTopic: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 15,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'gainsboro',
    },
    topicItem: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconBefore: {
        width: 26,
        height: 26,
        borderWidth: 1,
        borderStyle: 'solid',
        marginRight: 10,
    },
    txtWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'yellow',
    },
    iconBeforeTxt: {
        color: '#fff',
        fontSize: 20,
        includeFontPadding: false,
    },
    topicTitle: {
        fontSize: 16,
        color: '#000',
    },
});


export default SocialityTopic;
