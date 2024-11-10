import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Button} from 'react-native';
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ProfilePage from "@/components/Profile";

const BirdDetailCard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://172.20.33.241:5000/info/sightings/PwDyKSqM');
            const result = await response.json();
            setData(result);
        } catch (error) {
            // @ts-ignore
            setError('Failed to load data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#d2f45f', dark: '#7aad4e'}}
        >
            <View style={styles.container}>
                <ProfilePage data={data}/>
                <Button title={'Refresh'} onPress={fetchData}/>
            </View>
        </ParallaxScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f6f6f6', 
        width: '100%',
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default BirdDetailCard;

