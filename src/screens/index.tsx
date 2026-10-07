import {lazy} from 'react';
import {suspendedTemplate} from '@/utils';

const HomeScreen = suspendedTemplate(lazy(() => import('@/screens/home/Home.screen')));
const SearchScreen = suspendedTemplate(lazy(() => import('@/screens/search/search.screen')));
const MyListScreen = suspendedTemplate(lazy(() => import('@/screens/mylist/mylist.screen')));
const MoreScreen = suspendedTemplate(lazy(() => import('@/screens/more/more.screen')));
const ShortReelScreen = suspendedTemplate(lazy(() => import('@/screens/shortReel/shortReel.screen')));

export {HomeScreen, SearchScreen, MyListScreen, MoreScreen, ShortReelScreen};
