import React, { useState, useRef,useEffect  } from 'react';
import { Text, StyleSheet, SafeAreaView, LogBox  } from 'react-native';
import { View, Button, FormErrorMessage } from '../components';
import { Colors, db} from '../config';
import { Picker } from "@react-native-picker/picker";
import { getDatabase, ref, set, update, child, get, onValue } from "firebase/database";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore"; 
import Counter from "react-native-counters";
import { ScrollView } from 'react-native-gesture-handler';

export const OrderScreen = ({ navigation }) => {
  
  LogBox.ignoreLogs(['Setting a timer']);
  const [order, setOrder] = useState('Unknown');
  const COL = 5;
  const [data, setData] = useState([]);	
  
  const [seats, setSeats] = useState([]);	

  
  const updateSeat = async (taken,rowNum,seat) => {
    const DocRef = doc(db, "Theaters/Seating/Theater1", rowNum);
    await updateDoc(DocRef, {
      [seat] : taken
    });
   
    
  };


  
  
   function seatTaken(position){
    switch(position){
      case true: return(styles.seatButton); break;
      case false: return(styles.seatButtonTaken); break;
    }
  };

  const handleClick = () => {
    setState({backgroundColor: Colors.red})
  }


  useEffect(() => {
    const getInventory = async () => {
      const inventorySnapshot = await getDocs(collection(db, "Inventory"));
      const inventoryList = inventorySnapshot.docs.map((doc) => doc.data());
      setData(inventoryList);
     // console.log(inventoryList);
  };
  getInventory();
  const getSeating = async () => {
    const seatSnapshot = await getDocs(collection(db, "Theaters/Seating/Theater1"));
    const seatList = seatSnapshot.docs.map((doc) => doc.data());
    setSeats(seatList);
   //console.log(seatList);
  };
  getSeating();


}, [])

  return (   
    <View style={styles.container}>
    <ScrollView>
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


    {/* Seat Animation */}	
    {seats.map((seats,index1,index2,index3) =>(
      <React.Fragment>
        <View style = {styles.containerseats}>
          <Text style = {styles.itemText}> Row {index1 + 1} </Text>
          <Button  key = {seats} style = {seatTaken(seats.A)}  onPress = {() =>  updateSeat(false, 'Row' + (index1 + 1),'A')}/>
          <Button  key = {index1} style = {seatTaken(seats.B)} onPress = {() =>  updateSeat(false, 'Row' + (index1 + 1),'B')}/>
          <Button  key = {index2} style = {seatTaken(seats.C)} onPress = {() =>  updateSeat(false, 'Row' + (index1 + 1),'C')}/>
          <Button  key = {index3} style = {seatTaken(seats.D)} onPress = {() =>  updateSeat(false, 'Row' + (index1 + 1),'D')} />
        </View>
      </React.Fragment> 
    ))}
	
    {/* Buttons */}
     <Button style={styles.buttonsubmit}  onPress = {() => updateInventory(data.name, qty)}>
     <Text style={styles.buttonText}>Submit Order</Text>
      </Button>
      
      <Button style={styles.borderlessButtonContainer} borderless
        title={'Cancel Order'}
      onPress = {() => navigation.navigate('CustomerHomeScreen')} />
    </ScrollView>
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
     alignItems: 'center',

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
    marginRight:8,
    alignItems: 'center',
    justifyContent: 'center',

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
seatButton: {
  width: 60,
  height: 60,
  backgroundColor: Colors.blue,
  padding: 10,
  borderRadius: 8,
  marginRight:8
},
seatButtonTaken: {
  width: 60,
  height: 60,
  backgroundColor: Colors.red,
  padding: 10,
  borderRadius: 8,
  marginRight:8
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
  });