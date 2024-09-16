import React from 'react';
import { View } from 'react-native';
import { 
  HeaderContainer,
  HeaderContent
  } from './HeaderStyle';
import { 
  Text
  } from '@text';
const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <View>
        <Text>ZeroBeat</Text>
      </View>
      <HeaderContent>
        <Text>서치</Text>
        <Text>프로필</Text>
      </HeaderContent>
    </HeaderContainer>
  );
}


export default Header;