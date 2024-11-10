import {Image, StyleSheet, Platform, Button, ImageBackground, View, TouchableOpacity} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Link} from "expo-router";

export default function HomeScreen() {
    return (
        // <ParallaxScrollView
        //     headerBackgroundColor={{light: '#d2f45f', dark: '#7aad4e'}}
        // >
        <ImageBackground
            source={require('@/assets/images/bg.png')}
            resizeMode="cover"
            style={styles.image}
        >
            <View style={styles.buttonContainer}>
                <Link href='/camera'>
                    <View style={styles.button}>
                        <ThemedText style={{color: 'white', fontSize: 22}}>Catch Now!</ThemedText>
                    </View>
                </Link>
            </View>
        </ImageBackground>
        // </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        // flexDirection: 'column',
        // gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#7aad4e',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#dbdbdb',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});
