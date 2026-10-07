import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppSelector} from '@/infrastructure/redux/hooks';
import {LinearGradient} from '@/components/gradient/LinearGradient';

type BgConfig = {
  type?: string;
  direction?: number;
};

type GradientProps = {
  children: React.ReactNode;
};

export function Gradient({children}: GradientProps) {
  const {colorPallete,themeConfig} = useAppSelector((state) => state.appConfig);

  const colors = colorPallete.backgroundGradient;
  const directionIndex = themeConfig?.gradientDirection.background.direction;

    return (
      <LinearGradient colors={colors} directionIndex={directionIndex}>
        {children}
      </LinearGradient>
    );
  

}

const styles = StyleSheet.create({

});
