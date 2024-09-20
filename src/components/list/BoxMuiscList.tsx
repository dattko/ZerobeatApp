import React from 'react';
import { View, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SpotifyTrack, SpotifyAlbum, SpotifyArtist, SpotifyPlaylist } from '@/types/spotify';
// import { usePlayTrack } from '@/hooks/usePlayTrack';
import { useNavigation } from '@react-navigation/native';
// import GradientSectionTitle from '@component/layouts/gradientTitle/GradientSectionTitle';
// import PlayTrack from './PlayTrack';
// import SpotifyTrackMenu from '../spotifyTrackMenu/SpotifyTrackMenu';
import { Text , TextXL, Error, TextSM, TextXS} from '../typography/Typography';
import { theme } from '@/styles/theme';

type MusicItem = SpotifyTrack | SpotifyAlbum | SpotifyArtist | SpotifyPlaylist;

interface BoxMusicListProps {
  data: MusicItem[];
  title: string;
  type: string;
  name?: string;
}

const BoxMusicList: React.FC<BoxMusicListProps> = ({ data, title, type, name }) => {
  // const { handlePlayTrack } = usePlayTrack();
  const navigation = useNavigation();

  if (!data || data.length === 0) {
    return null;
  }

  const handleItemClick = (item: MusicItem) => {
    if (type === 'track') {
      // handlePlayTrack(item as SpotifyTrack, true);
    } else if (type === 'album') {
      // navigation.navigate('Album', { id: item.id });
    } else if (type === 'artist') {
      // navigation.navigate('Artist', { id: item.id });
    } else if (type === 'playlist') {
      // navigation.navigate('Playlist', { id: item.id });
    }
  };

  const getItemImage = (item: MusicItem): string => {
    if ('album' in item && item.album.images.length > 0) {
      return item.album.images[0].url;
    } else if ('images' in item && item.images && item.images.length > 0) {
      return item.images[0].url;
    }
    return 'https://example.com/no-image.png'; // 로컬 이미지 대신 URL 사용
  };

  const getItemArtist = (item: MusicItem): string => {
    if ('artists' in item) {
      return item.artists.map(artist => artist.name).join(', ');
    } else if ('name' in item) {
      return item.name;
    }
    return '';
  };

  const getItemDescription = (item: MusicItem): string => {
    if (type === 'playlist' && 'description' in item) {
      return item.description || '';
    }
    return '';
  };

  const renderItem = ({ item }: { item: MusicItem, index: number }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemClick(item)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: getItemImage(item) }} style={styles.image} />
        {/* <PlayTrack size={18} BoxSize={38} /> */}
      </View>
      <View style={styles.InfoBox}>
        {/* <TextSM >{getItemDescription(item)}</TextSM> */}
      <TextSM eclipse>{item.name}</TextSM>
      {type !== 'artist' && <TextXS color={theme.colors.gray} eclipse>{getItemArtist(item)}</TextXS>}
      {type === 'album' && (
        <TextXS eclipse eclipseLine={1}>{item.name}</TextXS>
      )}
      {/* {type === 'track' && (
        <SpotifyTrackMenu track={item as SpotifyTrack} />
      )} */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextXL>{title}</TextXL>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id || ''}-${index}`}
          horizontal={!name || name === 'recommendationPlaylist'}
          contentContainerStyle={{ gap: 12 }}
        />
      ) : (
        <Error >{name} 목록이 없습니다.</Error>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  itemContainer: {
    width: 100,
    gap: 8,
  },
  imageContainer: {
    // 이미지 컨테이너 스타일
  },
  image: {
    width: 100,
    display: 'flex',
    height: 100,
    borderRadius: 6,
  },
  InfoBox: {
    gap: 3,
  },
  title: {
    // 제목 스타일
  },
  
  subtitle: {
    // 부제목 스타일
  },
  albumInfo: {
    // 앨범 정보 스타일
  },
  noDataMessage: {
    // 데이터 없음 메시지 스타일
  },
  // 추가 스타일...
});

export default BoxMusicList;