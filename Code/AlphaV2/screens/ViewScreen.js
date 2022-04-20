import React, { useState,useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors, auth, db } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { getDatabase, ref, set, update, child, get, onValue } from "firebase/database";

import { collection, getDocs, updateDoc, doc, query, where, setDoc } from "firebase/firestore"; 
import Counter from "react-native-counters";
import { LogBox } from 'react-native';
import { TabRouter } from '@react-navigation/native';

export const ViewScreen = ({ route,navigation }) => {

LogBox.ignoreLogs(['Setting a timer']);

  const [data, setData] = useState([]);
  const {choiceOrderNum} = route.params;
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const statusList = query(collection(db, 'Orders'), where("OrderNum", "==", choiceOrderNum));
      const ordersSnapshot = await getDocs(statusList);
      
      const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
      setData(ordersList);
      //console.log(ordersList);
  };
    const getUsers = async () => {
      const usersList = query(collection(db, 'Users'), where ("encode", "==", "data.UserID"));
      const UsersSnapshot = await getDocs(usersList);
      const uList = UsersSnapshot.docs.map((doc) => doc.user());
      setUser(uList);
    };
  getOrders();
  getUsers();
}, [])
  
return (
       
  <View style={styles.container}>
    <Text style={styles.screenTitle}>Order Summary</Text>
    {/* Buttons */}
  
  
    {data.map((data, OrderNum, RecievedDate) =>(
      <React.Fragment> 
        <View style = {styles.parent}>
        <Text key = {data} style = {styles.itemText}> {'Order Number: ' +choiceOrderNum}</Text> 
        <Text key = {data} style = {styles.itemText}> {'User: '+data.UserID}</Text> 
        <Text key = {data} style = {styles.itemText}> {'Recieved Date: '+data.RecievedDate}</Text> 
        <Text key = {data} style = {styles.itemText}> {'Status: '+data.status}</Text> 
        <Text key = {data} style = {styles.itemText}> {'Drinks: '+data.Drink}</Text> 
        <Text key = {data} style = {styles.itemText}> {'Food: '+data.Food}</Text> 
        <Text key = {data} style = {styles.itemText}> {'Seats: '+data.Seats}</Text>   
           
        
        </View>
    
      </React.Fragment>
      
         
    ))}

    <Button style={styles.borderlessButtonContainer} borderless
      title={'Return To Receipts'}
    onPress = {() => navigation.navigate('RecieptScreen')} />

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
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#fe4f02',
    paddingTop: 10,
    paddingBottom: 20
  },
  subScreenTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fe4f02',
    paddingTop: 20,
    paddingBottom: 0,
    alignSelf: 'flex-start'
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',

  },
  borderlessButtonContainer: {
    marginTop: 2, 
    alignItems: 'center',
    
  },
  itemText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ff9361',
    
  },
  parent: {
    
    flexDirection: "column",
    alignSelf: 'baseline'
    
  },
  block: {
    flex: 3,
    margin: 6,
  },
  
  button: {
    
    width: '20%',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#fe4f02',
    padding: 2,
    borderRadius: 8,
    height: 23,
    color: '#f6f6f6'
  }
  });