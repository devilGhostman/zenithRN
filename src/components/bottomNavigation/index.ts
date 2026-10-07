import {lazy} from 'react';
import type {BottomTabTemplate} from '@/types';
import {suspendedTemplate} from '@/utils';

const DefaultBottomTabTemplate = lazy(() =>
  import('@/components/bottomNavigation/templates/default.template').then((module) => ({
    default: module.DefaultBottomTabTemplate,
  })),
);
const FloatingBottomTabTemplate = lazy(() =>
  import('@/components/bottomNavigation/templates/floating.template').then((module) => ({
    default: module.FloatingBottomTabTemplate,
  })),
);


export function getBottomTabTemplate(controlBar: unknown): BottomTabTemplate {
  return controlBar !== 5 ? suspendedTemplate(FloatingBottomTabTemplate) : suspendedTemplate(DefaultBottomTabTemplate);
}
