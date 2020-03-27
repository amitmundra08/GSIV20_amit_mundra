import React from 'react';
import {Provider} from 'react-redux';
import MainNavigator from './src/MainNavigator';
import store from './src/store';
console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
