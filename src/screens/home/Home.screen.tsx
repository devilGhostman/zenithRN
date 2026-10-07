import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LegendList } from '@legendapp/list/react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VideoCard from '@/components/VideoCard';
import {ROUTES} from '@/constants';
import { VIDEO_CARD_HEIGHT } from '@/constants/video';
import { useVideosQuery } from '@/infrastructure/videos/videos.hook';
import type { VideoItem } from '@/infrastructure/videos/videos.service';
import {useAppDispatch, useAppSelector} from '@/infrastructure/redux/hooks';
import type {RootStackParamList} from '@/types';
import {toggleMute} from '@/reducers/app.reducer';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const appName = useAppSelector(state => state.app.appName);
  const isMuted = useAppSelector(state => state.app.isMuted);
  const { data, isPending, isError, refetch, isRefetching } = useVideosQuery();

  console.log('hello zenith')

  const onPressVideo = useCallback(
    (id: string) => {
      navigation.navigate(ROUTES.PLAYER, { id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: VideoItem }) => (
      <VideoCard
        item={item}
        isActive={false}
        isMuted={isMuted}
        onPress={onPressVideo}
      />
    ),
    [isMuted, onPressVideo],
  );

  if (isPending) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator color="#f5c16c" size="large" />
        <Text style={styles.loadingText}>Loading feed</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>Could not load videos.</Text>
        <Pressable onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryLabel}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View>
          <Text style={styles.kicker}>React Native</Text>
          <Text style={styles.title}>{appName}</Text>
        </View>
        <Pressable
          onPress={() => dispatch(toggleMute())}
          style={styles.muteButton}
        >
          <Text style={styles.muteLabel}>{isMuted ? 'Muted' : 'Sound on'}</Text>
        </Pressable>
      </View>
      <LegendList
        data={data ?? []}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        estimatedItemSize={VIDEO_CARD_HEIGHT + 14}
        recycleItems
        extraData={`${isMuted}:${isRefetching}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  kicker: {
    color: '#9aa0ad',
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 4,
    color: '#f4f5f7',
    fontSize: 32,
    fontWeight: '800',
  },
  muteButton: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#1b1e27',
    borderWidth: 1,
    borderColor: '#2a2e39',
  },
  muteLabel: {
    color: '#f5c16c',
    fontSize: 13,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  loadingText: {
    marginTop: 12,
    color: '#9aa0ad',
  },
  errorText: {
    color: '#f4f5f7',
    fontSize: 16,
  },
  retryButton: {
    marginTop: 16,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#f5c16c',
  },
  retryLabel: {
    color: '#0b0c10',
    fontWeight: '800',
  },
});

export default HomeScreen;
