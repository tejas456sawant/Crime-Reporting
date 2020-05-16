import { createAppContainer, createBottomTabNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import TestPage from './containers/TestPage';
import AfterTestPage from './containers/AfterTestPage';
import Login from '../Login';

const AppNavigator = createStackNavigator(
    {
        TestPage         : { screen : TestPage },
        AfterTestPage    : { screen : Login }
    },
    {
        initialRouteName : 'AfterTestPage',
        navigationOptions : {

        },
        headerMode : 'none'
    }
)

const App = createAppContainer(AppNavigator);

export default App;