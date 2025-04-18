import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReservationScreen from '@/main/apps/screens/ReservationScreen.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import {PortOneStep} from '@/main/shared/types';
import PortOneRedirectScreen from '@/main/apps/screens/reservationProcess/PortOneRedirectScreen.tsx';
import PortOnePaymentScreen from '@/main/apps/screens/reservationProcess/PortOnePaymentScreen.tsx';

export type ReservationParamList = {
  [PATH.RESERVATION]: undefined;
  [PATH.PORTONE_PAYMENT]: PortOneStep;
  [PATH.PORTONE_REDIRECT]: undefined;
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
        headerTitleAlign: 'center',
        title: '예매하기',
        headerTitleStyle: {
          fontSize: 16,
        },
      }}>
      <Stack.Screen name={PATH.RESERVATION} component={ReservationScreen} />
      <Stack.Screen
        name={PATH.PORTONE_PAYMENT}
        component={PortOnePaymentScreen}
      />
      <Stack.Screen
        name={PATH.PORTONE_REDIRECT}
        component={PortOneRedirectScreen}
      />
    </Stack.Navigator>
  );
}

export default ReservationNavigation;
