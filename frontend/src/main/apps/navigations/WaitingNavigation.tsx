import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReservationScreen from '@/main/apps/screens/ReservationScreen.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import PortOnePaymentScreen from '@/main/apps/screens/reservationProcess/PortOnePaymentScreen';
import WaitingScreen from '@/main/apps/screens/WaitingScreen.tsx';

export type WaitingParamList = {
  [PATH.WAITING]: undefined;
};

const Stack = createNativeStackNavigator<WaitingParamList>();

function WaitingNavigation() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Pressable onPress={() => dispatch(moveNavigation('navbar'))}>
            <Icon name={'x'} size={22} />
          </Pressable>
        ),
      }}>
      <Stack.Screen name={PATH.WAITING} component={WaitingScreen} />
    </Stack.Navigator>
  );
}

export default WaitingNavigation;
