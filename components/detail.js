import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
//import { Button } from 'react-native-web';

const image = { uri: "https://www.transparenttextures.com/patterns/cubes.png" };


export default function Detail(props) {

  const movie = props.navigation.getParam('movie',null);
  const token = props.navigation.getParam('token', '');

  return (
    <View style={styles.container}>
       <Text style={styles.description}>{movie.title}</Text>
       <View style={styles.starContainer}>
          <FontAwesomeIcon style={movie.liked >0 ? styles.orange : styles.white} icon={faStar}/>
          <FontAwesomeIcon style={movie.liked >1 ? styles.orange : styles.white} icon={faStar}/>
          <FontAwesomeIcon style={movie.liked >2 ? styles.orange : styles.white} icon={faStar}/>
          <FontAwesomeIcon style={movie.liked >3 ? styles.orange : styles.white} icon={faStar}/>
          <FontAwesomeIcon style={movie.liked >4 ? styles.orange : styles.white} icon={faStar}/>
          <Text style={styles.description}>({movie.author})</Text>
       </View>
       
       <Text style={styles.description}>{movie.description}</Text>
    </View>
  );
}
Detail.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:24
  },
  headerRight: () => 
    <Button title="Edit" color="orange" 
      onPress={() => screenProps.navigation.navigate("Edit", {movie: screenProps.navigation.getParam("movie")})}
    />
    
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10,
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
  },
  starContainer : {
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: "row",
  },
  orange: {
    color: "orange",
  },
  white: {
    color:"white",
  },
  description: {
    fontSize: 20,
    color: "white",
    padding: 10,
  }
});
