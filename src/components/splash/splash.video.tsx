import React, {useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useEvent, useVideoPlayer, VideoView} from 'react-native-video';
import appConfig from '../../../app.json';
import type {SplashVideoProps} from '@/types';

const SPLASH_VIDEO = require('@/assets/splash.mp4') as number;

export function SplashVideo({onFinish}: SplashVideoProps) {
  const onFinishRef = useRef(onFinish);
  const finishedRef = useRef(false);

  onFinishRef.current = onFinish;

  const finish = useCallback(() => {
    if (finishedRef.current) {
      return;
    }

    finishedRef.current = true;
    onFinishRef.current();
  }, []);

  const player = useVideoPlayer(SPLASH_VIDEO, (nextPlayer) => {
    nextPlayer.loop = false;
    nextPlayer.play();
  });

  useEvent(player, 'onEnd', finish);
  useEvent(player, 'onError', finish);

  return (
    <View style={[styles.root, {backgroundColor: appConfig.splashVideoBackgroundColor}]}>
      <VideoView player={player} style={StyleSheet.absoluteFill} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
