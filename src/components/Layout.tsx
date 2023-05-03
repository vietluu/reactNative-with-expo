import React from 'react'
import CreatePost from '../screens/createPost'
import Notify from '../screens/notification'
import Home from '../screens/home'
import Setting from '../screens/setting'
import PostStore from '../screens/postStore'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/Ionicons'

function Layout() {
  const Tab = createBottomTabNavigator()
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
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Store"
        component={PostStore}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => <Icon name="bookmark-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePost}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => <Icon name="add-circle-outline" size={33} color={color} />,
        }}
      />
      <Tab.Screen
        name="notification"
        component={Notify}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => <Icon name="notifications" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Setting}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => <Icon name="person-circle-outline" size={33} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default Layout
