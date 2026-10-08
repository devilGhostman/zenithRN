import type {ReactNode} from 'react';

export type SplashVideoProps = {
  onFinish: () => void;
};

export type SplashImageProps = {
  onFinish: () => void;
};

export type SplashGateProps = {
  children: (initialUrl: string | null) => ReactNode;
};
