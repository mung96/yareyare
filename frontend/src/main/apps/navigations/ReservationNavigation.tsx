import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReservationScreen from '@/main/apps/screens/ReservationScreen.tsx';
import Icon from 'react-native-vector-icons/Feather';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/clients/navigationCategory.ts';

type TabProps = {
  [PATH.RESERVATION]: undefined;
};

const Stack = createNativeStackNavigator<TabProps>();

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
    </Stack.Navigator>
  );
}

export default ReservationNavigation;
