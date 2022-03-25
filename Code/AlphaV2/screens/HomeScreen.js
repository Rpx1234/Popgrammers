import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import {Colors, auth, db} from '../config';
import { View, Button} from '../components';
import { getDatabase, ref, set, update, child, get } from "firebase/database";


export const HomeScreen = ({ navigation }) => {
  
  
  
  function writeUser(){
    const userId = auth.currentUser.uid;    
    const db = getDatabase();
    set(ref(db, 'users/' + userId),{
      username: auth.currentUser.email,
      type: "customer"
    });
    console.log("complete");
  }

  

  function readUsers(){
    const userId = auth.currentUser.uid;    
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        //fetches the user type:
        console.log(snapshot.val().type);
        if(snapshot.val().type == 'customer'){
          navigation.navigate('CustomerHomeScreen');
        }
        if(snapshot.val().type == 'admin'){
          navigation.navigate('TheaterHomeScreen');
        }
        //console.log(snapshot.val());
      } else {
        console.log("No data available");
     }
    }).catch((error) => {
  console.error(error);
    });


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
          title={'Write User'}
          onPress = {writeUser}/>

          <Button style={styles.button} borderless
          title={'Read Users'}
          onPress = {readUsers}/>

          <Button style={styles.button} borderless
          title={'Next Page'}
          onPress = {() => navigation.navigate('InventoryScreen')}/>
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