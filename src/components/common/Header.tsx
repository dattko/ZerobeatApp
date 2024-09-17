import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { 
  Text
  } from '@text';

  const HeaderContainer = styled.View`
  height: 46px;
  flex-direction: row;
  align-items: center;
  padding:  0 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.lightGray};
  background-color: ${props => props.theme.colors.darkGray};
`;

const HeaderContent = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
`;

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


