import React, { useState,useEffect  } from 'react';
import { Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors, auth, db} from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { getDatabase, ref, set, update, child, get, onValue } from "firebase/database";

import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore"; 
import Counter from "react-native-counters";

export const InventoryScreen = ({ navigation }) => {


  const [data, setData] = useState([]);

  function readInventory(){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `inventory/`)).then((snapshot) => {
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
  
  

  const updateInventory = async (name,newqty) => {
    var docid;
    const q = query(collection(db, 'Inventory'), where("name" , "==" , name));
    const querySnapshot =  await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      docid = doc.id;
    });
    const dbRef = doc(db, 'Inventory', docid);
    updateDoc(dbRef, {
      qty: newqty
    });
  };


  
  


  useEffect(() => {
    const getInventory = async () => {
      const inventorySnapshot = await getDocs(collection(db, "Inventory"));
      const inventoryList = inventorySnapshot.docs.map((doc) => doc.data());
      setData(inventoryList);
     // console.log(inventoryList);
  };
  getInventory();
}, [])                                                                                        


  
  return (
    
   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Inventory Management</Text>
      {/* Buttons */}
      

     
      {data.map((data,qty) =>(
        <React.Fragment>
          <View style = {styles.parent}>
            <View style = {styles.block}>
              <Text key = {data} style = {styles.itemText}> {data.name}</Text>            

            </View>
            <View style = {styles.block} >
              <Counter  start = {parseInt(data.qty)} max = {1000}  onChange={(len, type) => {
                console.log(len, type);
                qty = len;
              }} />
            </View>
            
            <Button style={styles.button} borderless  title= {'Submit'}   
              onPress = {() => updateInventory(data.name, qty)}
            />
           

          </View>
        </React.Fragment>
        
           
      ))}
     
      
      <Button style={styles.borderlessButtonContainer} borderless
        title={'Return To HomePage'}
      onPress = {() => navigation.navigate('TheaterHomeScreen')} />
         

          
            
          


    </View>
    
  );
};


          
const styles = StyleSheet.create({
  container: {
	  flexGrow: 1,
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
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',

  },
  borderlessButtonContainer: {
    marginTop: 16, 
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ff9361',
    
    
  },
  parent: {
    
    flexDirection: "row",
    
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
    padding: 4,
    borderRadius: 8,
    height: 30,
    color: '#f6f6f6'
  }
  
  });
  