import React, {useState, useEffect} from 'react';
import { View,Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../navigation/AppNavigator';
import Scroll from '@components/common/ScrollWrap';
import styled from 'styled-components/native';
import BoxMusicList from '@/components/list/BoxMuiscList';
import { getRecentlyPlayed } from '@/api/spotifyApi';
import { SpotifyTrack } from '@/types/spotify';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainTabParamList, '홈'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};



const HomeScreen = ({ navigation }: Props) => {
  const [recentTracks, setRecentTracks] = useState<SpotifyTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        setIsLoading(true);
        const tracks = await getRecentlyPlayed();
        setRecentTracks(tracks.items.map((item: any) => item.track));
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch recent tracks:', err);
        setError('최근 재생 목록을 불러오는데 실패했습니다.');
        setIsLoading(false);
      }
    };
  
    fetchRecentTracks();
  }, []);

  return (
    <Scroll>
        <BoxMusicList title="최근 재생한 트랙" type="track" data={recentTracks} />
    </Scroll>
  );
};


export default HomeScreen;


