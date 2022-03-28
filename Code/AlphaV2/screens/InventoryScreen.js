import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors, auth } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { getDatabase, ref, set, update, child, get } from "firebase/database";


var inventory = [];
export const InventoryScreen = ({ navigation }) => {
  
  function readInventory(){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `inventory/`)).then((snapshot) => {
      if (snapshot.exists()) {
        inventory = (snapshot.val());
        return(snapshot.val());

      } else {
        console.log("No data available");
     }
    }).catch((error) => {
      console.error(error);
    });
  }




  
  return (
    
   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Inventory Screen</Text>
      {/* Buttons */}
          

          <Button style={styles.button} borderless
          title={'Next Page'}
          onPress = {() => navigation.navigate('InventoryScreen')}/>
          <Button style={styles.borderlessButtonContainer} borderless
          title={'Done with Inventory'}
          onPress = {() => navigation.navigate('TheaterHomeScreen')} />
          <Button style={styles.button} borderless
          title={'Read Inventory'}
          onPress = {readInventory} />

          <Text style={styles.screenTitle}>Look below </Text> 
          
          {inventory.map(item=> <inventory key={item.name} arr={item} />)}
          



    </View>
  );
};


          
const styles = StyleSheet.create({
  container: {
	flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 10
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',

  },
  borderlessButtonContainer: {
    marginTop: 16, 
    alignItems: 'center',
  },
  listItem: {
    backgroundColor: "orange",
    borderWidth: 1,
    borderColor: "#333",
    padding: 25,
  }
  });
  