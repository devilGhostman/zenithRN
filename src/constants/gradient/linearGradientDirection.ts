export const LinearGradientDirection = [
  {
    start: {x: 0.0, y: 0.0},
    end: {x: 1.0, y: 1.0},
  },
  {
    start: {x: 1.0, y: 0.0},
    end: {x: 0.0, y: 1.0},
  },
  {
    start: {x: 0.0, y: 0.5},
    end: {x: 1.0, y: 0.5},
  },
  {
    start: {x: 0.5, y: 0.0},
    end: {x: 0.5, y: 1.0},
  },
] as const;

export type GradientPoint = {x: number; y: number};
