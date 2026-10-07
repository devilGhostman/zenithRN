import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useVideoPlayer, VideoView } from 'react-native-video';
import {ROUTES} from '@/constants';
import { VIDEO_BUFFER_CONFIG } from '@/constants/video';
import { useVideosQuery } from '@/infrastructure/videos/videos.hook';
import type {RootStackParamList} from '@/types';
import {useAppSelector} from '@/infrastructure/redux/hooks';

type VideoScreenProps = NativeStackScreenProps<RootStackParamList, typeof ROUTES.PLAYER>;

function VideoScreen({ navigation, route }: VideoScreenProps) {
  const { id } = route.params;
  const isMuted = useAppSelector(state => state.app.isMuted);
  const { data, isPending } = useVideosQuery();
  const video = data?.find(item => item.id === id);

  useEffect(() => {
    if (video) {
      navigation.setOptions({ title: video.title });
    }
  }, [navigation, video]);

  if (isPending) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#f5c16c" size="large" />
      </View>
    );
  }

  if (!video) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Video not found.</Text>
        <Text style={styles.hint}>Opened id: {id}</Text>
      </View>
    );
  }

  return <VideoPlayer uri={video.uri} isMuted={isMuted} />;
}

function VideoPlayer({ uri, isMuted }: { uri: string; isMuted: boolean }) {
  const player = useVideoPlayer(
    {
      uri,
      bufferConfig: VIDEO_BUFFER_CONFIG,
    },
    nextPlayer => {
      nextPlayer.loop = true;
      nextPlayer.muted = isMuted;
      nextPlayer.play();
    },
  );

  useEffect(() => {
    player.muted = isMuted;
  }, [isMuted, player]);

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        resizeMode="contain"
        controls
        keepScreenAwake
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b0c10',
    paddingHorizontal: 24,
  },
  errorText: {
    color: '#f4f5f7',
    fontSize: 16,
    fontWeight: '700',
  },
  hint: {
    marginTop: 8,
    color: '#9aa0ad',
  },
});

export default VideoScreen;
