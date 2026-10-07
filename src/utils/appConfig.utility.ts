import appConfig from '../../app.json';
import DEFAULT_THEME_CONFIG, {DEFAULT_STRING, ICON_TEXT,DEFAULT_TEMPLATE_THEME_CONFIG,DEFAULT_TEMPLATE_CONFIG, DEFAULT_ALIAS_CONFIG} from '@/constants/wac/default-theme-config.constant';
import type {AppConfigState} from '@/reducers/appConfig.reducer';
import type {WacColorPalette, WacState} from '@/reducers/wac.reducer';
import type {ThemeColorName, ColorPallete} from '@/types';

type ThemeConfig = Record<string, any>;


export type WacApiRecord = {
  _id?: string | null;
  appId?: string | null;
  appName?: string | null;
  logoUrl?: string | null;
  insideAppLogo?: string | null;
  theme?: ThemeConfig;
  adMobAdInterval?: number;
  [key: string]: unknown;
};

export class AppConfigUtility {
  static getBaseUrl(): string {
    if (appConfig.apiBaseUrl?.length > 0) {
      return appConfig.apiBaseUrl;
    }

    return 'https://dev-apis.mogiio.com/';
  }

  static getWacRecord(wacData: unknown): WacApiRecord | undefined {
    if (!wacData) {
      return undefined;
    }

    if (Array.isArray(wacData)) {
      return wacData[0] as WacApiRecord | undefined;
    }

    if (typeof wacData === 'object' && wacData !== null && 'data' in wacData) {
      const data = (wacData as {data: unknown}).data;
      if (Array.isArray(data)) {
        return data[0] as WacApiRecord | undefined;
      }
    }

    return wacData as WacApiRecord;
  }

  static configerAppConfig(config: any): AppConfigState {
    const appConfig = {
      theme : config.theme ? config.theme : DEFAULT_TEMPLATE_THEME_CONFIG,
      template : config.template ? config.template : DEFAULT_TEMPLATE_CONFIG,
      alias : config.alias ? config.alias : DEFAULT_ALIAS_CONFIG,
    }

    const colorPallete = AppConfigUtility.getColorConfig(appConfig.theme?.colors);
    const aliases = AppConfigUtility.configureAliases(appConfig.alias);

    return {
      appId: '12345',
      orgId: '12345',
      appName: 'Zenith',
      logoUrl: 'https://img.mogiio.com/q100-efalse-ptrue-fauto/https://cdn6.mogiio.com/default/1080 logo.png',
      themeConfig: DEFAULT_TEMPLATE_THEME_CONFIG,
      templateConfig: DEFAULT_TEMPLATE_CONFIG,
      colorPallete: colorPallete,
      aliases: aliases,
    };
  }

  static getThemeConfig(configuration: WacApiRecord): ThemeConfig {
    const themeConfig: ThemeConfig = {
      ...(configuration.theme ?? DEFAULT_THEME_CONFIG),
    };

    themeConfig.iconType = themeConfig?.iconType || 1;
    themeConfig.btnConfig = themeConfig?.btnConfig ?? {
      type: 'linear',
      direction: 3,
    };
    themeConfig.bgConfig = themeConfig?.bgConfig ?? {
      type: 'linear',
      direction: 0,
    };
    themeConfig.alias = themeConfig.alias ?? {};
    themeConfig.iconText = themeConfig.iconText ?? {};

    return themeConfig;
  }

  static getColorConfig(colors: Record<string, string[]> = DEFAULT_TEMPLATE_THEME_CONFIG.colors): ColorPallete {
    const colorConfig: Record<string, string | string[]> = {};

    for (const [key, value] of Object.entries(colors ?? {})) {
      const colorList = Array.isArray(value) ? value : [];
      const color = colorList[0];
      if (!color) {
        continue;
      }

      colorConfig[`${key}Color`] = color;
      colorConfig[`${key}Gradient`] = colorList.length === 1 ? [color, color, color] : colorList;
    }

    return colorConfig as ColorPallete;
  }

  static configureAliases (aliases?: Record<string, string> | null) {
    const alias = {...(aliases ?? {})};

    for (const key in DEFAULT_ALIAS_CONFIG) {
      if (!alias[key]) {
        alias[key] = DEFAULT_ALIAS_CONFIG[key as keyof typeof DEFAULT_ALIAS_CONFIG];
      }
    }

    return alias;
  }


  static getCdnImageUrl(url?: string | null) {
    if (!url) {
      return url ?? null;
    }

    if (!url.includes('https://img.mogiio.com/q100-efalse-ptrue-fauto/')) {
      return `https://img.mogiio.com/q100-efalse-ptrue-fauto/${url}`;
    }

    return url;
  }

}
