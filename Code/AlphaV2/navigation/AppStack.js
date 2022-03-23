import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, InventoryScreen} from '../screens';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='InventoryScreen' component={InventoryScreen} />
    </Stack.Navigator>
  );
};
