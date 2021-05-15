import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ScanScreen from './screens/ScanScreen';

export default function App() {
  return (
    <AppContainer/>
  );
}

const TabNavigator = createBottomTabNavigator({
  ScanScreen: {screen:ScanScreen},
})
const AppContainer = createAppContainer(TabNavigator)
