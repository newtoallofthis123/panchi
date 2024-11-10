import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Button, Linking} from 'react-native';

const BirdDetailCard = ({data}: any) => {
    const res = data['res'];
    return (
        <View style={styles.container}>
            <Text style={styles.cpText}>{res['title']}</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={{uri: res['img']}}
                    style={styles.birdImage}
                />
            </View>

            <Text style={styles.birdName}>{res['title']}</Text>

            <TouchableOpacity style={styles.transferButton}>
                <Text style={styles.transferButtonText}>TRANSFER</Text>
            </TouchableOpacity>

            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Species</Text>
                    <Text style={styles.statValue}>{res['species']}</Text>
                </View>

            </View>

            {/* Power Up Section */}
            <View style={styles.powerUpContainer}>
                <Text style={styles.powerUpText}>
                    {res['summary']}
                </Text>
                <TouchableOpacity style={styles.powerUpButton} onPress={() => {
                    Linking.openURL(res['url']).catch((err) => {
                        console.log(err)
                    })
                }}
                >
                    <Text style={{
                        color: 'white',
                    }}>Wikipedia</Text
                    >
                </TouchableOpacity>
                <TouchableOpacity style={styles.powerUpButton}>
                    <Text style={styles.powerUpButtonText}>CATCH</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
        marginVertical: 40,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
    },
    cpText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    imageContainer: {
        width: 209,
        height: 209,
        borderRadius: 100,
        backgroundColor: '#d2f45f',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    birdImage: {
        width: 180,
        height: 180,
        borderRadius: 100,
    },
    birdName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    hpText: {
        fontSize: 16,
        color: '#77C9F5',
        marginVertical: 5,
    },
    transferButton: {
        backgroundColor: '#2d6105',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 10,
    },
    transferButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 10,
    },
    stat: {
        alignItems: 'center',
    },
    statLabel: {
        color: '#999',
        fontSize: 12,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    powerUpContainer: {
        width: '100%',
        backgroundColor: '#b8da52',
        color: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    powerUpText: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5,
    },
    powerUpButton: {
        backgroundColor: '#2d6105',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
    },
    powerUpButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        backgroundColor: 'red',
        color: 'white'
    },
    imgStyle: {
        width: 'auto',
        height: 10,
    }
});

export default BirdDetailCard;