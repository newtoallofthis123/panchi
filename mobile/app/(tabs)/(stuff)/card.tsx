import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import BirdDetailCard from "@/components/BirdDetails";
import {LinearGradient} from 'expo-linear-gradient';

export default function CardScreen({route}: any) {
    const {data} = route.params;
    return (
        <LinearGradient
            colors={['#d2f45f', '#b8da52', '#7aad4e']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.background}
        >
            <View style={styles.container}>
                <StatusBar style="auto"/>
                <View>
                    <BirdDetailCard data={data}/>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        // rowGap: 20,
    },
});