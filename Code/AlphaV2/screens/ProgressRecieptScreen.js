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

export const ProgressRecieptScreen = ({ navigation }) => {

LogBox.ignoreLogs(['Setting a timer']);

  const [data, setData] = useState([]);
  
  function readOrders(){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `orders/`)).then((snapshot) => {
      if (snapshot.exists()) {
        //inventory = (snapshot.val());
        console.log(snapshot.val());
        console.log("test");

      } else {
        console.log("No data available");
     }
    }).catch((error) => {                            
      console.error(error);
    });


  }

  const updateOrders = async (OrderNum, newstatus) => {
    var docid;
    const q = query(collection(db, 'Orders'), where("OrderNum" , "==" , OrderNum));
    const querySnapshot =  await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      docid = doc.id;
    });

    const dbRef = doc(db, 'Orders', docid);
    updateDoc(dbRef, {
     status: newstatus 
    });
    navigation.navigate('RecieptScreen');
    navigation.navigate('ProgressRecieptScreen');
    
  };

  useEffect(() => {
    const getOrders = async () => {
      const statusList = query(collection(db, 'Orders'), where("status", "==", "active"));
      const ordersSnapshot = await getDocs(statusList);
      
      const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
      setData(ordersList);
      //console.log(ordersList);
  };
  getOrders();
  
}, [])
  
return (
       
  <View style={styles.container}>
    <Text style={styles.screenTitle}>In Progress</Text>
    {/* Buttons */}
    <Text style={styles.subScreenTitle}>Order #               Date</Text>
    {/* Buttons */}

    {data.map((data, OrderNum, RecievedDate) =>(
      <React.Fragment> 
        <View style = {styles.parent}>
        <Button style={styles.borderlessButtonContainer} borderless
            title={data.OrderNum + '                            '}        
            onPress = {() => navigation.navigate('ViewScreen', {choiceOrderNum: data.OrderNum})} />
                   
            <Text key = {data} style = {styles.itemText}> {data.RecievedDate + '     '}</Text> 
               
            <Button style={styles.button} borderless  title= {'finish'}   
              onPress = {() => updateOrders(data.OrderNum, 'inactive')}
              
            />
            
        
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
    
    flexDirection: "row",
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