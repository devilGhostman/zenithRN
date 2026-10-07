import React from 'react';
import {StyleSheet, type StyleProp, type ViewStyle} from 'react-native';
import RNLinearGradient from 'react-native-linear-gradient';
import {LinearGradientDirection} from '@/constants';

const DEFAULT_COLORS = ['#000000', '#000000'];
const DEFAULT_DIRECTION_INDEX = 0;

type LinearGradientProps = {
  children: React.ReactNode;
  colors: string[];
  directionIndex?: number;
  style?: StyleProp<ViewStyle>;
};

export function LinearGradient({children, colors, directionIndex = DEFAULT_DIRECTION_INDEX, style}: LinearGradientProps) {
  const gradientDirection =
    LinearGradientDirection[directionIndex] ?? LinearGradientDirection[DEFAULT_DIRECTION_INDEX];
  const gradientColors = colors.length >= 2 ? colors : DEFAULT_COLORS;

  return (
    <RNLinearGradient
      colors={gradientColors}
      start={gradientDirection.start}
      end={gradientDirection.end}
      style={[styles.root, style]}
    >
      {children}
    </RNLinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
