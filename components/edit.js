import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, TextInput } from 'react-native';

export default function Edit(props) {

  const movie = props.navigation.getParam('movie',null)
  const [ title, setTitle ] = useState(movie.title);
  const [ description, setDescription ] = useState(movie.description);
  const [ author, setAuthor ] = useState(movie.author);
  
//   seen = []
//   const getCircularReplacer = () => {
//     const seen = new WeakSet();
//         return (key, value) => {
//         if (typeof value === "object" && value !== null) {
//             if (seen.has(value)) {
//         return;
//         }
//             seen.add(value);
//         }
//         return value;
//         };
//     };

  const saveMovie = () => {
    if(movie.id){
        fetch(`https://meanc.net/api/posts/${movie.id}/`,{
            method: 'PUT',
            headers: {
                'Authorization': `Token fc9955570432716396e019f260311d79b41c5438`,
                'Content-Type': 'application/json'
            },
            
            //body: JSON.stringify({ title: title, description: description},getCircularReplacer())
            body: JSON.stringify({ title: title, description: description, author: author })
        })
        .then( res => res.json())
        .then( movie => {
            //console.log(movie);
            props.navigation.navigate("Detail", {movie: movie, title: movie.title});
        })
        .catch( error => console.log(error));
    }else{
        fetch(`https://meanc.net/api/posts/`,{
            method: 'POST',
            headers: {
                'Authorization': `Token fc9955570432716396e019f260311d79b41c5438`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, description: description, author: 2 })
            //body: JSON.stringify({ title: title, description: description, author: author },getCircularReplacer())
        })
        .then( res => res.json())
        .then( movie => {
            //console.log(movie);
            props.navigation.navigate("Home");
        })
        .catch( error => console.log(error));
    }
  };

  return (
    <View style={styles.container}>
       <Text style={styles.label}>Title</Text>
       <TextInput 
           style={styles.input}
           placeholder="Title"
           onChangeText={text => setTitle(text)}
           value={title}
       />
       <Text style={styles.label}>Description</Text>
       <TextInput 
           style={styles.input}
           placeholder="Description"
           onChangeText={text => setDescription(text)}
           value={description}
       />
       <Button onPress={() => saveMovie()} title={movie.id ? "Edit" : "Add"} />
    </View>
  );
}
Edit.navigationOptions = screenProps => ({
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
    <Button title="Remove" color="orange" 
      onPress={() => removeClicked(screenProps)}
    />
})

const removeClicked = (props) =>{
    const movie = props.navigation.getParam("movie");
    fetch(`https://meanc.net/api/posts/${movie.id}/`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Token fc9955570432716396e019f260311d79b41c5438`,
            'Content-Type': 'application/json'
        }
    })
    .then( res => {
        props.navigation.navigate("Home");
    })
    .catch( error => console.log(error));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding: 10
  },
  label: {
    fontSize: 24,
    color: "white",
    padding: 10,
  },
  input: {
    fontSize:24,
    backgroundColor: '#fff',
    padding:10,
    margin:10
  }
});
