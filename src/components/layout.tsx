import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import CreatePost from './createPost';
import Notify from './notification';
import Post from '../../assets/post';
import Setting from './setting';
import PostStore from './postStore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostItem from '../../assets/post/PostItem';
import Icon from '@expo/vector-icons/Ionicons';

function Layout() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: '#644AB5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        tabBarStyle: { backgroundColor: '#fff' },

        tabBarActiveTintColor: '#644AB5',
      }}
      initialRouteName="home"
    >
      <Tab.Screen
        name="home"
        component={Post}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="post_Store"
        component={PostStore}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="create"
        component={CreatePost}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle-outline" size={33} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="notify"
        component={Notify}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-circle-outline" size={33} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default Layout;
