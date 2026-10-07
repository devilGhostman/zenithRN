import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function MyListScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>My List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#f4f5f7',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default MyListScreen;
