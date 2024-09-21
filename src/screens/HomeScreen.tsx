import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainTabParamList } from '../navigation/AppNavigator';
import ScrollWrap from '@components/common/ScrollWrap';
import BoxMusicList from '@/components/layouts/list/BoxMuiscList';
import { getRecentlyPlayed, getCountryPopularTracks } from '@/api/spotifyApi';
import styled from 'styled-components/native';
import { SpotifyTrack } from '@/types/spotify';
import RowMusicList from '@/components/layouts/list/RowMuiscList';
import Loading from '@/components/common/Loading';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainTabParamList, '홈'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const [recentTracks, setRecentTracks] = useState<SpotifyTrack[]>([]);
  const [popularTracks, setPopularTracks] = useState<SpotifyTrack[]>([]);
  const [krPopularTracks, setkrPopularTracks] = useState<SpotifyTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        const tracks = await getRecentlyPlayed();
        if (tracks && tracks.items) {
          setRecentTracks(tracks.items.map((item: any) => item.track));
        } else {
          console.error('Unexpected response structure from getRecentlyPlayed:', tracks);
          setError('최근 재생 목록의 구조가 예상과 다릅니다.');
        }
      } catch (err) {
        console.error('Failed to fetch recent tracks:', err);
        setError('최근 재생 목록을 불러오는데 실패했습니다.');
      }
    };

    const fetchPopularTracks = async () => {
      try {
        const globalChart = await getCountryPopularTracks();
        if (globalChart.tracks) {
          setPopularTracks(globalChart.tracks.items.map((item: any) => item.track));
        } else {
          console.error('Unexpected response structure from getPopularTracks:', globalChart);
          setError('인기 트랙 목록의 구조가 예상과 다릅니다.');
        }
      } catch (err) {
        console.error('Failed to fetch popular tracks:', err);
        setError('인기 트랙을 불러오는데 실패했습니다.');
      }
    };

    const fetchKrPopularTracks = async () => {
      try {
        const playlistData = await getCountryPopularTracks('KR');
        if (playlistData.tracks) {
          setkrPopularTracks(playlistData.tracks.items.map((item: any) => item.track));
        } else {
          console.error('Unexpected response structure from getPopularTracks:', playlistData);
          setError('인기 트랙 목록의 구조가 예상과 다릅니다.');
        }
      } catch (err) {
        console.error('Failed to fetch popular tracks:', err);
        setError('인기 트랙을 불러오는데 실패했습니다.');
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchRecentTracks(), fetchPopularTracks(),fetchKrPopularTracks()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollWrap>
      {recentTracks.length > 0 && (
        <BoxMusicList title="최근 재생한 트랙" type="track" data={recentTracks} />
      )}
        <RowMusicList title="글로벌 차트" type="track" data={popularTracks}  limit={10}/>
        <RowMusicList title="인기 차트" type="track" data={krPopularTracks}  limit={10}/>
    </ScrollWrap>
  );
};

export default HomeScreen;

