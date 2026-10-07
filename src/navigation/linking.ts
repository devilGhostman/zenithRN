import type {LinkingOptions} from '@react-navigation/native';
import {ROUTES} from '@/constants';
import type {RootStackParamList} from '@/types';

const DEEP_LINK_SCHEME = 'zenith';
const DEEP_LINK_HOST = 'zenith.app';

const DEEP_LINK_PREFIXES = [
  `${DEEP_LINK_SCHEME}://`,
  `https://${DEEP_LINK_HOST}`,
  `https://www.${DEEP_LINK_HOST}`,
];

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: DEEP_LINK_PREFIXES,
  config: {
    screens: {
      [ROUTES.HOME]: '',
      [ROUTES.SEARCH]: 'search',
      [ROUTES.MY_LIST]: 'my-list',
      [ROUTES.MORE]: 'more',
      [ROUTES.PLAYER]: 'watch/:id',
    },
  },
};
