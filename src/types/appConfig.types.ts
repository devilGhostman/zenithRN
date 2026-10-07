import {DEFAULT_TEMPLATE_THEME_CONFIG,DEFAULT_TEMPLATE_CONFIG} from '@/constants';

export type ThemeConfig = typeof DEFAULT_TEMPLATE_THEME_CONFIG;
export type TemplateConfigType = typeof DEFAULT_TEMPLATE_CONFIG .config;

export type ThemeColorName = keyof typeof DEFAULT_TEMPLATE_THEME_CONFIG.colors;

export type ColorPallete = {
  [Key in ThemeColorName as `${Key & string}Color`]: string;
} & {
  [Key in ThemeColorName as `${Key & string}Gradient`]: string[];
};