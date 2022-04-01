import React, { useState,useEffect } from 'react';
import { Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors, auth, db} from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { getDatabase, ref, set, update, child, get, onValue } from "firebase/database";

import { collection, getDocs} from "firebase/firestore"; 
import Counter from "react-native-counters";

export const InventoryScreen = ({ navigation }) => {


  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

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
  
  function incrementCount(){
    count = count + 1;
    setCount(count);
  }
  function decrementCount(){
    count = count - 1;
    setCount(count);
  }

  
  


  useEffect(() => {
    const getInventory = async () => {
      const inventorySnapshot = await getDocs(collection(db, "Inventory"));
      const inventoryList = inventorySnapshot.docs.map((doc) => doc.data());
      setData(inventoryList);
      console.log(inventoryList);
  };
  getInventory();
}, [])


  
  return (
    
   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Inventory Screen</Text>
      {/* Buttons */}
      <Button style={styles.borderlessButtonContainer} borderless
        title={'Done with Inventory'}
      onPress = {() => navigation.navigate('TheaterHomeScreen')} />
          
      
        
      {data.map((data) =>(
        <React.Fragment>
          <View style = {styles.parent}>
            <Text key = {data} style = {styles.itemText}> {data.name}</Text>            
            <Counter start = {parseInt(data.qty)} max = {1000}  onChange={(len, type) => {
              console.log(len, type);
            }} />
            <Button style={styles.button} borderless title= {'Submit'}/>

          </View>
        </React.Fragment>
        
           
      ))}
         

          
            
          



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
  itemText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.red,
    paddingTop: 10,
    marginRight: 20
  },
  parent: {
    
    flexDirection: "row",
    
  },
  button: {

    width: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginLeft: 10,
    backgroundColor: Colors.orange,
    padding: 4,
    borderRadius: 8,
  }
  
  });
  