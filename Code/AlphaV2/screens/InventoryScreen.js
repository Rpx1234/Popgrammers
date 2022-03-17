import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { View} from '../components';
import { Colors, auth } from '../config';
import { signOut } from 'firebase/auth';
import PropTypes from 'prop-types';

export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  }

export default class ItemComponent extends Component {

  static propTypes = {
      items: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
            return (
                <View key={index}>
                    <Text style={styles.itemtext}>{item.name}</Text>
                </View>
            )
        })}
      </View>
    );
  }
}       
          
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cornflowerblue',
    paddingHorizontal: 12,
    alignItems: 'center'
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
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
    },
  itemsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    itemtext: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }
  });
  