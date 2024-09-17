import * as React from 'react';
import { ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '@components/common/Header';
import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import { theme } from '@/styles/theme';
import { HomeIcon, Library } from 'lucide-react-native';

export type RootStackParamList = {
  홈: undefined;
  프로필: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          header: () => <Header />,
          tabBarStyle: { 
            backgroundColor: theme.colors.darkGray,
            height: 56,
            paddingBottom: 0,
            paddingTop: 4,
          },
          tabBarItemStyle: {
            justifyContent: 'center',
            gap: 4,
          },
          tabBarIconStyle: {
            maxHeight: 24,
          },
          tabBarActiveTintColor: theme.colors.Point,
        }}
      >
          <Tab.Screen name="홈" component={HomeScreen} 
            options={
              {
                tabBarIcon: ({ color }) => <HomeIcon size={16} color={color} />
              }
            }
          />
          <Tab.Screen name="프로필" component={ProfileScreen} 
            options={
              {
                tabBarIcon: ({ color }) => <Library size={16} color={color} />
              }
            }
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;