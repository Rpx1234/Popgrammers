import React, { useState,setState,useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from "@react-native-picker/picker";
import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors, db } from '../config';
import { getDatabase, ref, set, update, child, get, onValue } from "firebase/database";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore"; 
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';



export const SeatAvailabilityScreen = ({ navigation }) => {
  const [data, setData] = useState([]);	
  const [seats, setSeats] = useState([]);	
  const [order, setOrder] = useState('Unknown');
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

  
  useEffect(() => {
    const getSeating = async () => {
      const seatSnapshot = await getDocs(collection(db, "Theaters/Seating/Theater1"));
      const seatList = seatSnapshot.docs.map((doc) => doc.data());
      setSeats(seatList);
      };
    getSeating();

}, [])


  return (

   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Seat Availability</Text>
      {/* Theater Selection */} 
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
    {seats.map((seats,index1,index2,index3) =>(
      <React.Fragment>
        <View style = {styles.containerseats}>
          <Text style = {styles.itemText}> Row {index1 + 1} </Text>
          <Button  key = {seats} style = {seatTaken(seats.A)}/>
          <Button  key = {index1} style = {seatTaken(seats.B)}/>
          <Button  key = {index2} style = {seatTaken(seats.C)}/>
          <Button  key = {index3} style = {seatTaken(seats.D)}/>
        </View>
      </React.Fragment> 
    ))}
      
      {/* Buttons */}
          <Button style={styles.borderlessButtonContainer} borderless
          title={'Done with Seat Availability'}
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
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 10,
    textAlign: 'center',
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
    marginTop: 200, 
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
    width: '10%',
    height: 18,
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
    marginRight:8
},
seatButtonTaken: {
    width: '10%',
    height: 18,
    marginTop: 8,
    backgroundColor: Colors.black,
   	borderColor: Colors.white,
    padding: 9,
    borderWidth:2,
    borderRadius:8,
    marginRight:8,
    alignItems: 'center',
    justifyContent: 'flex-end',
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