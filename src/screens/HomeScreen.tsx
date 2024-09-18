import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../navigation/AppNavigator';
import Scroll from '@components/common/ScrollWrap';
import { theme } from '@/styles/theme';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainTabParamList, '홈'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  return (
    <Scroll>
      <Text>Home Screen</Text>
      {/* <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')} // 예시로 navigation을 추가했습니다.
      /> */}
    </Scroll>
  );
};


export default HomeScreen;
