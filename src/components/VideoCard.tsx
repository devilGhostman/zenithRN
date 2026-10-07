import React, { memo, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'react-native-video';
import { VIDEO_BUFFER_CONFIG, VIDEO_CARD_HEIGHT } from '@/constants/video';
import type { VideoItem } from '@/infrastructure/videos/videos.service';

type VideoCardProps = {
  item: VideoItem;
  isActive: boolean;
  isMuted: boolean;
  onPress: (id: string) => void;
};

function ActivePlayer({ uri, isMuted }: { uri: string; isMuted: boolean }) {
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
    <VideoView
      player={player}
      style={styles.video}
      resizeMode="cover"
      controls={false}
      keepScreenAwake
    />
  );
}

function VideoCardComponent({
  item,
  isActive,
  isMuted,
  onPress,
}: VideoCardProps) {
  return (
    <Pressable
      onPress={() => onPress(item.id)}
      style={[styles.card, isActive && styles.cardActive]}
    >
      <View style={styles.player}>
        {isActive ? (
          <ActivePlayer uri={item.uri} isMuted={isMuted} />
        ) : (
          <View style={styles.overlay}>
            <Text style={styles.playHint}>Tap to play</Text>
          </View>
        )}
      </View>
      <View style={styles.meta}>
        <View style={styles.metaText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.duration}>{item.durationLabel}</Text>
        </View>
        <Text style={styles.status}>{isActive ? 'Playing' : 'Ready'}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: VIDEO_CARD_HEIGHT,
    marginHorizontal: 16,
    marginBottom: 14,
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: '#14161c',
    borderWidth: 1,
    borderColor: '#23262f',
  },
  cardActive: {
    borderColor: '#f5c16c',
  },
  player: {
    height: 180,
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111318',
  },
  playHint: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  meta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  metaText: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: '#f4f5f7',
    fontSize: 16,
    fontWeight: '700',
  },
  duration: {
    marginTop: 2,
    color: '#9aa0ad',
    fontSize: 12,
  },
  status: {
    color: '#f5c16c',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default memo(VideoCardComponent);
