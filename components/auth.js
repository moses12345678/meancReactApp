import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, TextInput, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth(props) {

  const [ username, setUsername ] = useState("");
  const [ password, setPassword] = useState("");
  const [ regView, setRegView] = useState(false);
  
  useEffect( () =>{
    getData();
  }, [])
  
  const auth = () => {
    if (regView){
        fetch(`https://meanc.net/api/users/`,{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({ username, password })
         })
         .then( res => res.json())
         .then( res => {
             //console.log(res.token);
             //console.log(username);
             setRegView(false);
             
         })
         .catch( error => console.log(error));
    }else{
        fetch(`https://meanc.net/auth/`,{
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({ username, password })
         })
         .then( res => res.json())
         .then( res => {
             //console.log(res.token);
             saveData(res.token);
             props.navigation.navigate("Home");
             
         })
         .catch( error => console.log(error));
    }
        
  };
  
  const saveData = async (token) => {
      await AsyncStorage.setItem('MR_Token', token)
  }

  const getData = async () => {
    const token = await AsyncStorage.getItem('MR_Token');
    if(token){
        props.navigation.navigate("ContentList"); 
    }
  }
  
  const toggleView = () =>{
      setRegView(!regView);
  }

  return (
    <View style={styles.container}>
    <Image source={require('../assets/sp12.png')}
     style={{width: '50%', height: 45, paddingTop: 30}} 
     resizeMode="contain"/>
       <Text style={styles.label}>Username</Text>
       <TextInput 
           style={styles.input}
           placeholder="Username"
           onChangeText={text => setUsername(text)}
           value={username}
           autoCapitalize={'none'}
       />
       <Text style={styles.label}>Password</Text>
       <TextInput 
           style={styles.input}
           placeholder="Password"
           onChangeText={text => setPassword(text)}
           value={password}
           secureTextEntry={true}
           autoCapitalize={'none'}
       />
       <Button onPress={() => auth()} title={regView ? "Register" : "Login"} />
       <TouchableOpacity onPress={() => toggleView()}>
          { regView ? <Text style= {styles.viewText}>Already have an account? Go back to login</Text> : 
          <Text style= {styles.viewText}>Don't have an account? Register here</Text>}
       </TouchableOpacity>
    </View>
  );
}
Auth.navigationOptions = screenProps => ({
  title: "Login",
  headerStyle: {
    backgroundColor: 'orange'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:24
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    padding:10 ,
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
  },
  viewText: {
      color: 'white',
      fontSize: 20,
      paddingTop: 30,
      paddingLeft: 10,
      paddingRight: 10
  }
});
