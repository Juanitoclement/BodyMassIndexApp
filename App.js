/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/Home";
import FindScreen from "./src/screens/Find"
import IconButton from "./src/components/IconButton";

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            return <IconButton name={route.name}/>;
          },
          headerShown: false,
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Find" component={FindScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
