import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '@/styles/theme';
import Scroll from '@components/common/ScrollWrap';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, '홈'>;

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

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.mediumGray,
  },
});

export default HomeScreen;
