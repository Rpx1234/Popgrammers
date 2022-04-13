import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors, auth, db } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { getDatabase, ref, set, update, child, get, onValue } from "firebase/database";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore"; 
import { LogBox } from 'react-native';


export const EmployeeScreen = ({ navigation }) => {

  const [data, setData] = useState([]);
  LogBox.ignoreLogs(['Setting a timer']);

  useEffect(() => {
    const getInventory = async () => {
      const inventorySnapshot = await getDocs(collection(db, "Employees"));
      const inventoryList = inventorySnapshot.docs.map((doc) => doc.data());
      setData(inventoryList);
     // console.log(inventoryList);
  };
  getInventory();
}, [])          

  return (

   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Employee Information</Text>
      <Text style={styles.category}>Name                                                               PIN</Text>

      {/* Buttons */}
         
           {data.map((data) =>(
        <React.Fragment>
        <View style={styles.container1}>
              <Text key = {data} style = {styles.itemText}> {data.Name}:   </Text>            
              </View>
        <View style={styles.container2}>
              <Text key = {data} style = {styles.itemText}>{data.EmployeeID}</Text>            
              </View>
        </React.Fragment>
        
           
      ))}
       <Button style={styles.borderlessButtonContainer} borderless
          title={'Done with Employee information?'}
          onPress = {() => navigation.navigate('TheaterHomeScreen')} />
    </View>

  );
 
};


          
const styles = StyleSheet.create({
  container: {
	flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 12,
    alignItems: 'center'
  },
  container1: {
      backgroundColor: 'black',
      paddingHorizontal: 2,
      flexDirection: "row",
      alignSelf:"flex-start",
    },
    container2: {
        backgroundColor: 'black',
        paddingHorizontal: 2,
        flexDirection: "row",
        alignSelf:"flex-end",
      },
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 10,
    paddingBottom: 50,
  },
  category: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ff9361',
    
    
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 100,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',

  },
  borderlessButtonContainer: {
    marginTop: 390, 
    alignItems: 'center',
  }
  });