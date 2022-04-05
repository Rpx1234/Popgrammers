import React, { useState, useRef,useEffect  } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { View, Button, FormErrorMessage } from '../components';
import { Colors} from '../config';
import { Picker } from "@react-native-picker/picker";
import { getDatabase, ref, set, update, child, get, onValue } from "firebase/database";

import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore"; 
import Counter from "react-native-counters";

export const OrderScreen = ({ navigation }) => {
  
  const [order, setOrder] = useState('Unknown');
  const COL = 5;
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
      <Text style={styles.screenTitle}>New Order</Text>
    {/* Theater Selection */} 
      <Text style ={styles.text}> Ticket Order</Text>
      <Picker
        selectedValue={order}
        onValueChange={(value, index) => setOrder(value)}
        mode="dropdown" // Android only
        style={styles.picker}
      >
        <Picker.Item label="Please select your Order" value="Unknown" />
        <Picker.Item label="Theater 1 5PM" value="Theater 1" />
        <Picker.Item label="Theater 2 5PM" value="Theater 2" />
      </Picker>
	{/* Seat Animation */}	
	<View style={styles.containerseats}>
			<Button style={styles.button}>
          	</Button>
          	<Button style={styles.button}>
          	</Button>
          	<Button style={styles.button} >
          	</Button>
          	<Button style={styles.button} >
          	</Button>
          	<Button style={styles.button} >
          	</Button>
          	<Button style={styles.button} >
          	</Button>
          	<Button style={styles.button} >
          	</Button>
          	
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
   </View>
        </React.Fragment>
        
           
      ))}
	</View>
	
	
    {/* Buttons */}
     <Button style={styles.buttonsubmit}  onPress = {() => updateInventory(data.name, qty)}>
     <Text style={styles.buttonText}>Submit Order</Text>
      </Button>
      
      <Button style={styles.borderlessButtonContainer} borderless
        title={'Cancel Order'}
      onPress = {() => navigation.navigate('CustomerHomeScreen')} />
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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 10
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 10
  },
  button: {
    width: '10%',
    height: 18,
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
    marginRight:8
  },
   buttonsubmit: {
   width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttontaken: {
    width: '10%',
    height: 18,
    marginTop: 8,
    backgroundColor: Colors.black,
   	borderColor: Colors.white,
    padding: 10,
    borderWidth:2,
    borderRadius:8,
    marginRight:8
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
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 5,
    color: Colors.black,
    backgroundColor: 'white',
 	},
 containerseats: {
	flexDirection: 'row',
	flex: 1,
	alignContent: 'space-around',
	padding: 5
},
  parent: {
    
    flexDirection: "row",
    
  },
  block: {
    flex: 3,
    margin: 6,
  },
    itemText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ff9361',
  },
  });