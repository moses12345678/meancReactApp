import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, FlatList, Image } from 'react-native';


//const image = { uri: "https://www.transparenttextures.com/patterns/cubes.png" };
//<ImageBackground source={image} style={styles.image}></ImageBackground>

export default function ContentList() {

  const [ posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('https://meanc.net/api/posts/',{
        method: 'GET',
        headers: {
            'Authorization': `Token fc9955570432716396e019f260311d79b41c5438`
        }
    })
    .then( res => res.json())
    .then( jsonRes => setPosts(jsonRes))
    .catch( error => console.log(error));
  }, []);

  return (
    
    <View style={styles.container}>
    
    <Image source={require('../assets/sp12.png')}
     style={{width: '100%', height: 295, paddingTop: 30}} 
     resizeMode="contain"/>
    
      <FlatList
        data={posts}
        renderItem={({item})=>(
            <View style={styles.item}>
            
              <Text style={styles.itemText}>{item.title}</Text>
            

            </View>
            
        )}
        keyExtractor={(item, index) => index.toString() }
       />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
