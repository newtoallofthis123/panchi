import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Linking,
    Button,
    VirtualizedList
} from 'react-native';

const ProfilePage = ({data}: any) => {
    const collectibles = data;
    // Render collectible card
    const renderCollectible = ({item}: any) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item['bird']['name']}</Text>
            <Text style={styles.cardScore}>{item['bird']['species']}</Text>
            <Image
                source={{uri: item['bird']['img_url']}}
                style={styles.cardImage}
            />
            <TouchableOpacity style={styles.openButton} onPress={() => {
                Linking.openURL(item['bird']['wiki_url'])
            }}>
                <Text style={styles.openButtonText}>Open</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Image
                    source={{uri: 'http://noobscience.in/favicon.ico'}}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Ram Kishan </Text>
                <Text style={styles.profileID}>#Rkishan</Text>
            </View>

            {/* Score Section */}
            <TouchableOpacity style={styles.scoreButton}>
                <Text style={styles.scoreText}>Score {(collectibles.length * 100)}</Text>
            </TouchableOpacity>
            <VirtualizedList
                data={collectibles}
                renderItem={renderCollectible}
                keyExtractor={(item: any) => item.id}
                getItem={(data, index) => data[index]}
                getItemCount={(data) => data.length}
                contentContainerStyle={{
                    alignItems: 'center',
                    width: '100%',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f1f9f1',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        // borderWidth: 2,
        borderRadius: 12,
        // borderColor: '#0a0a0a',
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 40,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0E0E0',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 10,
    },
    profileID: {
        fontSize: 16,
        color: '#000000',
        marginTop: 4,
    },
    scoreButton: {
        backgroundColor: '#AEEA00', // Score button color
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginVertical: 20,
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    collectiblesContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#dff2df',
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
        margin: 10,
        padding: 10,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
    cardScore: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 10,
    },
    cardImage: {
        width: 240,
        height: 240,
        marginBottom: 10,
        borderRadius: 5,
    },
    openButton: {
        backgroundColor: '#00733b',
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    openButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default ProfilePage;