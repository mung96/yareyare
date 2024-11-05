import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/main/apps/screens/LoginScreen.tsx';

type Props = {
  [PATH.LOGIN]: undefined;
};

const Stack = createNativeStackNavigator<Props>();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={PATH.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
