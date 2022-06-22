import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, FlatList, Image, Button,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const image = { uri: "https://www.transparenttextures.com/patterns/cubes.png" };
//<ImageBackground source={image} style={styles.image}></ImageBackground>

export default function ContentList(props) {

  
  const [ posts, setPosts] = useState([]);
  let token = null;

  const getData = async () => {
    token = await AsyncStorage.getItem('MR_Token');
    if (token){
      getMovies();
    }else{
      props.navigation.navigate("Auth")
    }
  };
  
  useEffect(() => {
    getData();
    
  },);

  const getMovies = () => {
    console.log(token);
    fetch('https://meanc.net/api/posts/',{
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then( res => res.json())
    .then( jsonRes => setPosts(jsonRes))
    .catch( error => console.log(error));
  }
 // very important: if i remove a empty array above at the end of funtion }, []);, its will fetch evry time a new version 
 // of API witch is good just for small data and worse for big data, figure out the solution later on
  const movieclicked = (movie) => {
      props.navigation.navigate("Detail", {movie: movie, title: movie.title, token: token})
  }

  return (
    
    <View style={styles.container}>
    
    <Image source={require('../assets/sp12.png')}
     style={{width: '100%', height: 295, paddingTop: 30}} 
     resizeMode="contain"/>
      <FlatList
        data={posts}
        renderItem={({item})=>(
            <TouchableOpacity onPress={() => movieclicked(item)}>
            <View style={styles.item}>        
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
            </TouchableOpacity>
            
        )}
        keyExtractor={(item, index) => index.toString() }
       />
    </View>
    
  );
}

ContentList.navigationOptions = screenProps => ({
  title: "List of movies",
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:24
  },
  headerRight: () => 
    <Button title="Add New" color="orange" 
      onPress={() => screenProps.navigation.navigate("Edit", {movie: {title: '', description: ''}})}
    />
    
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 25,
    //backgroundImage: url("https://www.transparenttextures.com/patterns/cubes.png"),
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
