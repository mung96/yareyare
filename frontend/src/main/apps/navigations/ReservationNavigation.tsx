import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReservationScreen from '@/main/apps/screens/ReservationScreen.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import PortOnePaymentScreen from '@/main/apps/screens/reservationProcess/PortOnePaymentScreen';
import {PortOneStep} from '@/main/shared/types';

export type ReservationParamList = {
  [PATH.RESERVATION]: undefined;
  [PATH.PORTONE_PAYMENT]: PortOneStep;
};

const Stack = createNativeStackNavigator<ReservationParamList>();

function ReservationNavigation() {
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
      <Stack.Screen name={PATH.RESERVATION} component={ReservationScreen} />
      <Stack.Screen
        name={PATH.PORTONE_PAYMENT}
        component={PortOnePaymentScreen}
      />
    </Stack.Navigator>
  );
}

export default ReservationNavigation;
