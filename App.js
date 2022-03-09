import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, SafeAreaView, TextInput, Image, Alert} from 'react-native';

export default function App() {
const [text, onChangeText] = React.useState(null);
const [text2, onChangeText2] = React.useState(null);

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
        onChangeText = {onChangeText}
        value = {text}
        placeholder = "Enter Username"
        />
      <TextInput
      style = {styles.input}
      onChangeText = {onChangeText2}
      value = {text2}
      placeholder = "Enter Password"
      />
      <Button
        onPress= {() => Alert.alert('Button with adjusted color pressed')} 
        title="Log In"
        color="red"
      />
      <StatusBar style="auto" />
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
  },
  Text: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  }
});
