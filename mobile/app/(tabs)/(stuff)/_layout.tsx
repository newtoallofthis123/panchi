import React from 'react';

import {useColorScheme} from '@/hooks/useColorScheme';
// import {Stack} from "expo-router";
// import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from "@/app/(tabs)/(stuff)/index";
import CameraScreen from "@/app/(tabs)/(stuff)/camera";
import CardScreen from "@/app/(tabs)/(stuff)/card";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
                component={HomeScreen}
            />
            <Stack.Screen
                name="camera"
                options={{
                    title: 'Camera',
                }}
                component={CameraScreen}
            />
            <Stack.Screen name="card"
                          component={CardScreen}
                          options={{title: 'Card'}}/>
        </Stack.Navigator>
    );
}
