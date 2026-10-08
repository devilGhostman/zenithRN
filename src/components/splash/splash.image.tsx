import React, {useCallback, useEffect, useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import appConfig from '../../../app.json';
import type {SplashImageProps} from '@/types';

const SPLASH_IMAGE = require('@/assets/splash.jpg') as number;

export function SplashImage({onFinish}: SplashImageProps) {
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

  useEffect(() => {
    const timer = setTimeout(finish, appConfig.splashImageDurationMs);
    return () => clearTimeout(timer);
  }, [finish]);

  return (
    <View style={[styles.root, {backgroundColor: appConfig.splashVideoBackgroundColor}]}>
      <Image source={SPLASH_IMAGE} style={StyleSheet.absoluteFill} resizeMode="cover" onError={finish} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
