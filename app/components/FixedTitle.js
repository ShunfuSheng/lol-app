import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';


class FixedTitle extends Component {
    render() {
        const title = this.props.title;
        return (
            <View style={[styles.title, styles.commentTitle]}>
                <Text style={{ fontSize: 20, color: '#000' }}>{title}</Text>
                <View style={styles.pullRight}>
                    <Text style={{ fontSize: 16, color: '#333' }}>综合排序</Text>
                    <View style={styles.cicleDown}>
                        <Text style={{ fontSize: 10, color: '#fff' }}>∨</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'space-between',
    },
    commentTitle: {
        borderBottomWidth: 1,
        borderColor: 'gainsboro',
        borderStyle: 'solid',
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
    },
    pullRight: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    cicleDown: {
        width: 14,
        height: 14,
        backgroundColor: '#333',
        borderRadius: 7,
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default FixedTitle;
