import React, {Component} from 'react';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './src/components/NavigationService';
import Screen from './src/screens/Screen';
import Index from './src/screens/src/index';

const RootStack = createStackNavigator(
  {
    mainScreen: {screen: Index},
    register: {screen: Register},
    login: {screen: Login},
    screen: {screen: Screen},
  },
  {
    initialRouteName: 'mainScreen',
    swipeEnabled: true,
    animationEnabled: true,
    headerMode: 'none',
    headerLeft: null,
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return (
      <AppContainer
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
