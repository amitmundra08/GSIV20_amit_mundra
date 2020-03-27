import Home from '../screens/Home';
import Details from '../screens/Details';

import {createStackNavigator, createAppContainer} from 'react-navigation';
const MainStack = createStackNavigator(
  {
    Home: {screen: Home, navigationOptions: () => ({header: () => undefined})},
    Details: {screen: Details},
  },
  {
    initialRouteName: 'Home',
  },
);
const MainNavigator = createAppContainer(MainStack);

export default MainNavigator;
