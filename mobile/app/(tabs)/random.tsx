import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ImageBackground, StyleSheet} from "react-native";

export default function RandomScreen() {

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#d2f45f', dark: '#7aad4e'}}
        >

            <ThemedText>This is the Random screen</ThemedText>

            <ThemedText>
            </ThemedText>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        // justifyContent: 'center',
    },
})