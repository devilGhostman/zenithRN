import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ROUTES} from '@/constants';
import {HomeScreen} from '@/screens';
import VideoScreen from '@/screens/VideoScreen';
import {Screen} from '@/navigation/screen';

// MAIN SCREENS
const MAIN_SCREENS = [
  new Screen(ROUTES.HOME, HomeScreen, '', {headerShown: false, animation: 'none', displayName: 'Home'}),
  new Screen(ROUTES.SEARCH, SearchScreen, '', {headerShown: false, animation: 'none', displayName: 'Search'}),
  new Screen(ROUTES.MY_LIST, MyListScreen, '', {headerShown: false, animation: 'none', displayName: 'My List'}),
  new Screen(ROUTES.MORE, MoreScreen, '', {headerShown: false, animation: 'none', displayName: 'More'}),
  new Screen(ROUTES.PLAYER, VideoScreen, '', {title: 'Video', displayName: 'Video'}),
];



// BOTTOM SCREENS
function TabPlaceholder({title}: {title: string}) {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTitle}>{title}</Text>
    </View>
  );
}

function SearchScreen() {
  return <TabPlaceholder title="Search" />;
}

function MyListScreen() {
  return <TabPlaceholder title="My List" />;
}

function MoreScreen() {
  return <TabPlaceholder title="More" />;
}


const BOTTOM_SCREENS = {
  home: {component: HomeScreen, route: ROUTES.HOME, displayName: 'Home'},
  search: {component: SearchScreen, route: ROUTES.SEARCH, displayName: 'Search'},
  myList: {component: MyListScreen, route: ROUTES.MY_LIST, displayName: 'My List'},
  more: {component: MoreScreen, route: ROUTES.MORE, displayName: 'More'},
};

const getBottomScreens = () => {
  const bottomScreens: {component: React.ComponentType<any>; displayName: string}[] = [];

  for (const screen of Object.values(BOTTOM_SCREENS)) {
    bottomScreens.push({component: screen.component, displayName: screen.displayName});
  }

  return bottomScreens;
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTitle: {
    color: '#f4f5f7',
    fontSize: 24,
    fontWeight: '700',
  },
});

export {MAIN_SCREENS, BOTTOM_SCREENS, getBottomScreens};
