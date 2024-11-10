import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Button, Linking, ScrollView} from 'react-native';

const BirdDetailCard = ({data}: any) => {
    const res = data['res'];
    const bird_id = data['res']['id'];
    const user_id = 'PwDyKSqM';

    async function addSighting() {
        const res = await fetch('http://172.20.33.241:5000/new/sighting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bird_id: bird_id,
                user_id: user_id,
                location: 'Hyderabad',
            }),
        });
        const resData = await res.json();
        console.log("Data Received: ", resData);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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

                <View style={styles.powerUpContainer}>
                    <Text style={styles.powerUpText}>{res['summary']}</Text>
                    <TouchableOpacity style={styles.powerUpButton} onPress={() => {
                        Linking.openURL(res['url']).catch((err) => {
                            console.log(err);
                        });
                    }}>
                        <Text style={{color: 'white'}}>Wikipedia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.powerUpButton} onPress={addSighting}>
                        <Text style={styles.powerUpButtonText}>CATCH</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
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
});

export default BirdDetailCard;
