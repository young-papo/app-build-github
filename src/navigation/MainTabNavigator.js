import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExplorerScreen from '../screens/ExplorerScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateScreen from '../screens/CreateScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          }
          if (route.name === 'Explorer') {
            return <Ionicons name="compass" size={size} color={color} />;
          }
          if (route.name === 'Create') {
            return <Ionicons name="add-circle" size={size + 3} color={color} />;
          }
          if (route.name === 'Messages') {
            return <Ionicons name="chatbox-ellipses" size={size} color={color} />;
          }
          if (route.name === 'Profile') {
            return <Ionicons name="person" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explorer" component={ExplorerScreen} />
      <Tab.Screen name="Create" component={CreateScreen}
        options={{ tabBarLabel: 'Ajouter' }}
      />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}