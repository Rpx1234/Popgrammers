import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, SafeAreaView, TextInput, Image, Alert} from 'react-native';

export default function App() {

const [name, setname] = useState (null);
const [password, setpassword] = useState (null)

function SuccessGreeting() {
  return Alert.alert('Placeholder Success')
}
function FailGreeting() {
  return Alert.alert('Failed Placeholder')
}
function onLoginPress () {
  if (name === "User" && password == "Password") {
    SuccessGreeting();
  } else {
    FailGreeting();
  }
}
  return (
    <SafeAreaView style={styles.container}>
		<Image 
         style= {{width: 100, height: 100, justifyContent: 'center',}}
         source={require('../my_icon.png')} 
         />
      <Text style={styles.Text}>
        Hello! Welcome to the Popgrammers app.
      </Text>
      <Text style={styles.Text}>
        Please Log In.
      </Text>
      <TextInput
        style = {styles.input}
        onChangeText={(name) => setname(name)}
        placeholder = "Enter Username"
        />
      <TextInput
      style = {styles.input}
      onChangeText ={(password) => setpassword (password)}
      placeholder = "Enter Password"
      />
      <Button
        onPress= { onLoginPress} 

        title="Log In"
        color="red"
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cornflowerblue',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
 input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
    justifyContent: 'center',
},
  container1: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 200,
  } ,
  Text: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  }
});