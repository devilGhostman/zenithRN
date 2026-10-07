import type {ComponentType} from 'react';
import type {ScreenOptions} from '@/types';

export class Screen {
  name: string;
  component: ComponentType<any>;
  icon: string;
  options: ScreenOptions;

  constructor(name = '', component: ComponentType<any>, icon = '', options: ScreenOptions = {}) {
    this.name = name;
    this.component = component;
    this.icon = icon;
    this.options = options;
  }
}
