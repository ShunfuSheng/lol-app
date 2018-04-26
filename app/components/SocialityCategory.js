import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground
} from 'react-native';


class SocialityCategory extends Component {
    render() {
        const { data } = this.props;
        return (
            <View style={styles.category}>
                {
                    data.map((item, index) => (
                        <ImageBackground
                            key={index}
                            style={styles.categoryItem}
                            source={require('../images/backend.png')}
                            resizeMode="cover"
                        >
                            <View style={styles.shadow}>
                                <Text style={styles.categoryTitle}>{item}</Text>
                            </View>
                        </ImageBackground>)
                    )
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    category: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryItem: {
        width: 72,
        height: 72,
        borderRadius: 10,
        overflow: 'hidden',
    },
    shadow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 15,
    },
    categoryTitle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default SocialityCategory;
