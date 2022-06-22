import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ContentList from './components/list';
import Detail from './components/detail';
import Edit from './components/edit';
import Auth from './components/auth';

const AppNavigator =  createStackNavigator({
  Auth: {screen: Auth},
  Home: {screen: ContentList},
  Detail: {screen: Detail},
  Edit: {screen: Edit},
})

const  App = createAppContainer(AppNavigator);
export default App;
