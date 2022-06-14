import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function Detail() {
  return (
    <View style={styles.container}>
    <Text>Detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item : {
     flex:1,
     padding: 10,
     height: 50,
     backgroundColor: '#282C35'
  },
  itemText : {
    color: '#fff',
    fontSize: 24
  }
});
