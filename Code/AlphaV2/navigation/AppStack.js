import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, InventoryScreen, TheaterHomeScreen, SeatAvailabilityScreen,RecieptScreen,EmployeeScreen, CustomerHomeScreen, OrderScreen, OrderHistoryScreen, AccountInfoScreen} from '../screens';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={CustomerHomeScreen} />
      <Stack.Screen name='CustomerHomeScreen' component={CustomerHomeScreen} />
      <Stack.Screen name='InventoryScreen' component={InventoryScreen} />
      <Stack.Screen name='TheaterHomeScreen' component={TheaterHomeScreen} />
      <Stack.Screen name='SeatAvailabilityScreen' component={SeatAvailabilityScreen} />
      <Stack.Screen name='RecieptScreen' component={RecieptScreen} />
      <Stack.Screen name='EmployeeScreen' component={EmployeeScreen} />
      <Stack.Screen name='OrderScreen' component={OrderScreen} />
      <Stack.Screen name='OrderHistoryScreen' component={OrderHistoryScreen} />
      <Stack.Screen name='AccountInfoScreen' component={AccountInfoScreen} />
    </Stack.Navigator>
  );
};
