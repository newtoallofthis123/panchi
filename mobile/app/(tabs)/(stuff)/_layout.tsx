import React from 'react';

import {useColorScheme} from '@/hooks/useColorScheme';
import {Stack} from "expo-router";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name="camera"
                options={{
                    title: 'Camera',
                }}
            />
        </Stack>
    );
}
