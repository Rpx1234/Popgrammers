import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, InventoryScreen, TheaterHomeScreen, SeatAvailabilityScreen,RecieptScreen,EmployeeScreen} from '../screens';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='InventoryScreen' component={InventoryScreen} />
      <Stack.Screen name='TheaterHomeScreen' component={TheaterHomeScreen} />
      <Stack.Screen name='SeatAvailabilityScreen' component={SeatAvailabilityScreen} />
      <Stack.Screen name='RecieptScreen' component={RecieptScreen} />
      <Stack.Screen name='EmployeeScreen' component={EmployeeScreen} />
    </Stack.Navigator>
  );
};
