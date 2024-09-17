import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '@/styles/theme';
import Scroll from '@/components/common/ScrollWrap';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, '프로필'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const ProfileScreen = ({ navigation }: Props) => {
  return (
    <Scroll>
      <Text>profile Screen</Text>
      {/* <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')} // 예시로 navigation을 추가했습니다.
      /> */}
    </Scroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
