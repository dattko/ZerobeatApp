import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '@components/common/Header';
import HomeScreen from '@screens/HomeScreen';
import ProfileScreen from '@screens/ProfileScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import { theme } from '@/styles/theme';
import { HomeIcon, Library } from 'lucide-react-native';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  로그인: undefined;
};

export type MainTabParamList = {
  홈: undefined;
  프로필: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => (
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
    <Tab.Screen 
      name="홈" 
      component={HomeScreen} 
      options={{
        tabBarIcon: ({ color }) => <HomeIcon size={16} color={color} />
      }}
    />
    <Tab.Screen 
      name="프로필" 
      component={ProfileScreen} 
      options={{
        tabBarIcon: ({ color }) => <Library size={16} color={color} />
      }}
    />
  </Tab.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="로그인" component={LoginScreen} />
  </AuthStack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;