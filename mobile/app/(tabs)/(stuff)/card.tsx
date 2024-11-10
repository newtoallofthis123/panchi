import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';

export default function CardScreen({route}: any) {
    const {data} = route.params;

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#d2f45f', dark: '#7aad4e'}}
        >
            <ThemedText>This is the Card screen</ThemedText>
            <ThemedText>
                {data}
            </ThemedText>
        </ParallaxScrollView>
    );
}
