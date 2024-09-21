import React, { useMemo } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SpotifyTrack, SpotifyAlbum, SpotifyPlaylist } from '@/types/spotify';
import { TextXL, Text, TextMD, TextSM } from '../../typography/Typography';
import { formatTime } from '@/auth/utils/spotifyUtils';
import { addToQueue } from '@/api/spotifyApi';
import { theme } from '@/styles/theme';

type MusicItem = SpotifyTrack | SpotifyAlbum | SpotifyPlaylist;

interface RowMusicListProps {
  data: SpotifyTrack[];
  title: string;
  type?: string;
  playlist?: SpotifyPlaylist;
  limit?: number;
  albumImageUrl?: string;
}

const RowMusicList: React.FC<RowMusicListProps> = ({ 
  data, 
  title, 
  limit, 
  type, 
  albumImageUrl, 
  playlist 
}) => {
  const limitedData = useMemo(() => {
    if (limit && limit > 0) {
      return data.slice(0, limit);
    }
    return data;
  }, [data, limit]);

  const getArtistNames = (track: SpotifyTrack): string => {
    return track.artists?.map(artist => artist.name).join(', ') || 'Unknown';
  };

  const handleItemClick = (item: MusicItem, index: number) => {
    if (type === 'track') {
      // handlePlayTrack(item as SpotifyTrack, true);
    } else if (type === 'album') {
      // handlePlayTracks(limitedData, albumImageUrl);
    } else if (type === 'playlist') {
      // handlePlayTracks(limitedData, playlist?.images[0]?.url, index);
    }
  };
  const handleAddToQueue = async (track: SpotifyTrack) => {
    try {
      await addToQueue(track.uri);
      console.log('Track added to queue successfully');
    } catch (error) {
      console.error('Failed to add track to queue:', error);
    }
  };

  const renderItem = (item: SpotifyTrack, index: number) => (
    <TouchableOpacity key={`${item.id || ''}-${index}`} style={styles.musicListItem} onPress={() => handleItemClick(item, index)}>
      <TextSM color={theme.colors.gray} style={styles.rowMusicInfoNumber}>{index + 1}</TextSM>
      {type !== 'album' && (
        <Image 
          style={styles.smallAlbumImage} 
          source={{ uri: item.album?.images[0]?.url || 'https://example.com/no-image.png' }} 
        />
      )}
      <View style={styles.rowMusicTextBox}>
        <TextSM >{item.name}</TextSM>
        <TextSM  color={theme.colors.gray}>{getArtistNames(item)}</TextSM>
      </View>
      <View style={styles.durationInfo}>
        <TextSM color={theme.colors.gray}>
          {formatTime(item.duration_ms)}
        </TextSM>
      </View>
      {/* <SpotifyTrackMenu 
        track={item}
        style={styles.iconBtn}
        onAddToQueue={handleAddToQueue}
      /> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextXL fontFamily='bold'>{title}</TextXL>
      <View style={styles.musicListContainer}>
        {limitedData.map((item, index) => renderItem(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  musicListContainer: {
    gap: 8
  },
  musicListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowMusicInfoNumber: {
    width: 24,
    textAlign: 'center',
  },
  smallAlbumImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  rowMusicTextBox: {
    flex: 1,
    gap: 3,
  },
  durationInfo: { 
    width: 40,
    alignItems: 'center',
  },

});

export default RowMusicList;