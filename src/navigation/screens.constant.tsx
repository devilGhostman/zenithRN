import type {ComponentType} from 'react';
import {ROUTES} from '@/constants';
import {HomeScreen, MoreScreen, MyListScreen, SearchScreen, ShortReelScreen} from '@/screens';
import VideoScreen from '@/screens/VideoScreen';
import {Screen} from '@/navigation/screen';

// MAIN SCREENS
const MAIN_SCREENS = [
  new Screen(ROUTES.HOME, HomeScreen, '', {headerShown: false, animation: 'none', displayName: 'Home'}),
  new Screen(ROUTES.SEARCH, SearchScreen, '', {headerShown: false, animation: 'none', displayName: 'Search'}),
  new Screen(ROUTES.MY_LIST, MyListScreen, '', {headerShown: false, animation: 'none', displayName: 'My List'}),
  new Screen(ROUTES.MORE, MoreScreen, '', {headerShown: false, animation: 'none', displayName: 'More'}),
  new Screen(ROUTES.SHORT_REEL, ShortReelScreen, '', {headerShown: false, animation: 'none', displayName: 'Short Reel'}),
  new Screen(ROUTES.PLAYER, VideoScreen, '', {title: 'Video', displayName: 'Video'}),
];

const BOTTOM_SCREENS = {
  home: {component: HomeScreen, route: ROUTES.HOME, displayName: 'Home'},
  search: {component: SearchScreen, route: ROUTES.SEARCH, displayName: 'Search'},
  myList: {component: MyListScreen, route: ROUTES.MY_LIST, displayName: 'My List'},
  more: {component: MoreScreen, route: ROUTES.MORE, displayName: 'More'},
};

const getBottomScreens = () => {
  const bottomScreens: {name: string; component: ComponentType<any>; displayName: string}[] = [];

  for (const screen of Object.values(BOTTOM_SCREENS)) {
    bottomScreens.push({name: screen.route, component: screen.component, displayName: screen.displayName});
  }

  return bottomScreens;
};

export {MAIN_SCREENS, BOTTOM_SCREENS, getBottomScreens};
