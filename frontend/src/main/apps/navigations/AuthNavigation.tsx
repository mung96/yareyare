import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@/main/apps/screens/LoginScreen.tsx';
import SocialLoginScreen from '@/main/apps/screens/SocialLoginScreen.tsx';

export type AuthParamList = {
  [PATH.LOGIN]: undefined;
  [PATH.SOCIAL]: undefined;
};

const Stack = createNativeStackNavigator<AuthParamList>();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={PATH.LOGIN} component={LoginScreen} />
      <Stack.Screen name={PATH.SOCIAL} component={SocialLoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
