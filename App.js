import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store from './Redux/store';
import FirstTab from './Screens/FirstTab';
import SecondTab from './Screens/SecondTab';
import ThirdTab from './Screens/ThirdTab';
import Icon from 'react-native-vector-icons/Ionicons';
const BottomTab = createBottomTabNavigator();
const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <BottomTab.Navigator
          screenOptions={{
            headerLeftContainerStyle: {
              marginLeft: 10,
              marginRight: -10,
              // marginBottom: 5,
            },
            tabBarActiveTintColor: '#000000',
          }}>
          <BottomTab.Screen
            options={{
              headerLeft: () => (
                <Icon size={25} color="#12a4e8" name="home-outline" />
              ),
              headerTitle: 'Home',
              tabBarLabel: 'Home',
              tabBarIcon: () => (
                <Icon color={'#12a4e8'} size={25} name={'home-outline'} />
              ),
            }}
            name="FirstTab"
            component={FirstTab}
          />
          <BottomTab.Screen
            options={{
              headerTitle: 'Search',
              headerLeft: () => (
                <Icon size={25} color="#12a4e8" name="search-outline" />
              ),
              tabBarLabel: 'Search',
              tabBarIcon: () => (
                <Icon color={'#12a4e8'} size={25} name={'search-outline'} />
              ),
            }}
            name="SecondTab"
            component={SecondTab}
          />
          <BottomTab.Screen
            options={{
              headerLeft: () => (
                <Icon size={25} color="#12a4e8" name="settings-outline" />
              ),
              headerTitle: 'Setting',
              tabBarLabel: 'Setting',
              tabBarIcon: () => (
                <Icon color={'#12a4e8'} size={25} name={'settings-outline'} />
              ),
            }}
            name="Thirdtab"
            component={ThirdTab}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
