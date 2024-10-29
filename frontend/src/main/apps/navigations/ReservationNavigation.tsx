import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReservationScreen from '@/main/apps/screens/ReservationScreen.tsx';

type TabProps = {
  [PATH.RESERVATION]: undefined;
};

const Stack = createNativeStackNavigator<TabProps>();

function ReservationNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={PATH.RESERVATION} component={ReservationScreen} />
    </Stack.Navigator>
  );
}

export default ReservationNavigation;
