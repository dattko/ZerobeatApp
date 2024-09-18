import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '@text';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slice/authSlice'; 
import { AppDispatch, RootState } from '@/store'; 

const HeaderContainer = styled.View`
  height: 46px;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
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
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <HeaderContainer>
      <View>
        <Text>ZeroBeat</Text>
      </View>
      <HeaderContent>
        <Text>서치</Text>
        <Text>프로필</Text>
        <TouchableOpacity onPress={handleLogout} disabled={isLoading}>
          <Text>{isLoading ? '로그아웃 중...' : '로그아웃'}</Text>
        </TouchableOpacity>
      </HeaderContent>
      {error && <Text >{error}</Text>}
    </HeaderContainer>
  );
};

export default Header;