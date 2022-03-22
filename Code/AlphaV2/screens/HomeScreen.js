import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import {Colors, auth, db} from '../config';
import { View, Button} from '../components';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


export const HomeScreen = () => {
  
  const setData = async() => {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);


  }

  


  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  return (

   
    <View style={styles.container}>
      <Text style={styles.screenTitle}>PopGrammers</Text>
      <Text style={styles.bodyText}>You have been successfully logged in, More to come...</Text>
      {/* Button for Log out */}
          <Button style={styles.borderlessButtonContainer} borderless
          title={'Log Out?'}
          onPress={handleLogout} />

          <Button style={styles.button} borderless
          title={'Test'}
          onPress = {setData}/>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'black'
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 20
  },
  bodyText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.orange,
    paddingTop: 20
  },
    borderlessButtonContainer: {
    marginTop: 16, 
    alignItems: 'center',
  },
    button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 8,
  }

});