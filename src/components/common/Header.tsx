import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slice/authSlice';
import { AppDispatch, RootState } from '@/store';
import { LogOut, User } from 'lucide-react-native';
import { theme } from '@/styles/theme';
import { fetchUserProfile } from '@/api/userApi'; 
import { getStoredAccessToken } from '@/auth';
import { Image } from 'react-native';
import { TextMD, TextSM } from '@text';

const HeaderContainer = styled.View`
  height: 54px;
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
  const [userProfile, setUserProfile] = useState<any>(null);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      const accessToken = await getStoredAccessToken(); // 저장된 액세스 토큰 가져오기
      if (accessToken) {
        try {
          const profile = await fetchUserProfile(accessToken);
          setUserProfile(profile);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
    };

    loadUserProfile();
  }, []);

  return (
    <HeaderContainer>
      <View>
        <TextMD>ZeroBeat</TextMD>
      </View>
      <HeaderContent>
        <TextMD>서치</TextMD>
        <View>
          <View style={styles.profileBox}>
            <View style={styles.profile}>
              {userProfile?.images?.[0].url  ? (
                  <Image
                  source={{ uri: userProfile?.images?.[0].url }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                  }}
                />
              ) : (
                <User color={theme.colors.gray} size={18}/>
              )}
            </View>
            {/* <TextSM>{userProfile?.display_name}</TextSM> */}
            <TouchableOpacity onPress={handleLogout} disabled={isLoading}>
              <LogOut color={theme.colors.gray} size={18}/>
            </TouchableOpacity>
          </View>
        </View>
      </HeaderContent>
      {error && <TextMD>{error}</TextMD>}
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
    profileBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    profile: {
      borderRadius: 16,
      alignItems: 'center',
      width: 32,
      height: 32,
      borderWidth: 1,
      borderColor: theme.colors.gray,
      justifyContent: 'center',
      backgroundColor: theme.colors.lightGray,
    },
});

export default Header;
