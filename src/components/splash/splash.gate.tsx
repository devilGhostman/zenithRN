import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Linking, type EventSubscription} from 'react-native';
import appConfig from '../../../app.json';
import type {SplashGateProps} from '@/types';
import {SplashImage} from './splash.image';
import {SplashVideo} from './splash.video';

export function SplashGate({children}: SplashGateProps) {
  const showSplashVideo = appConfig.showSplashVideo;
  const [splashDone, setSplashDone] = useState(false);
  const [launchUrl, setLaunchUrl] = useState<string | null>(null);
  const [launchUrlReady, setLaunchUrlReady] = useState(false);
  const subscriptionRef = useRef<EventSubscription | null>(null);

  useEffect(() => {
    let active = true;

    Linking.getInitialURL()
      .then((url) => {
        if (!active) {
          return;
        }

        setLaunchUrl((current) => current ?? url ?? null);
        setLaunchUrlReady(true);
      })
      .catch(() => {
        if (active) {
          setLaunchUrlReady(true);
        }
      });

    const subscription = Linking.addEventListener('url', ({url}) => {
      setLaunchUrl(url);
      setLaunchUrlReady(true);
    });
    subscriptionRef.current = subscription;

    return () => {
      active = false;
      subscription.remove();
      subscriptionRef.current = null;
    };
  }, []);

  const splashFinished = splashDone && launchUrlReady;

  useLayoutEffect(() => {
    if (!splashFinished) {
      return;
    }

    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
  }, [splashFinished]);

  if (!splashFinished) {
    if (showSplashVideo) {
      return <SplashVideo onFinish={() => setSplashDone(true)} />;
    }

    return <SplashImage onFinish={() => setSplashDone(true)} />;
  }

  return children(launchUrl);
}
