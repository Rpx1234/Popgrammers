import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { View,Button} from '../components';
import { Colors, auth } from '../config';
import { signOut } from 'firebase/auth';

export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
 return (		
		<View style={styles.container}>
		{/* Inventory button */}
          <Button style={styles.button} onPress = {() => navigation.navigate('Inventory')}>
          <Text style={styles.buttonText}>Inventory</Text>
          </Button>
		{/* Seat Availablility button */}
          <Button style={styles.button} onPress = {() => navigation.navigate('SeatAvailability')}>
          <Text style={styles.buttonText}>Seat Availability</Text>
          </Button>
        {/* Reciepts */}
          <Button style={styles.button} onPress = {() => navigation.navigate('Reciepts')}>
          <Text style={styles.buttonText}>Reciepts</Text>
          </Button>
		 <Button title='Sign Out' onPress={handleLogout} />
      </View>
  );
};        
          
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly'
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
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',

  }
  });