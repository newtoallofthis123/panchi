import {Link, Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#d2f45f',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#7aad4e',
                },
            }}>
            <Tabs.Screen
                name="(stuff)"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={'#d2f45f'} style={
                            {color: '#d2f45f'}
                        }/>
                    ),
                }}
            />
            <Tabs.Screen
                name="random"
                options={{
                    title: 'Random',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'calendar-number-outline' : 'calendar'} color={'#d2f45f'} style={
                            {color: '#d2f45f'}}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={'#d2f45f'} style={
                            {color: '#d2f45f'}
                        }/>
                    ),
                }}
            />
        </Tabs>
    );
}
