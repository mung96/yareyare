import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';
import MyTicketScreen from '@/main/apps/screens/mypage/MyTicketScreen.tsx';
import CancelTicketScreen from '@/main/apps/screens/mypage/CancelTicketScreen.tsx';
import UpdateTeamScreen from '@/main/apps/screens/mypage/UpdateTeamScreen.tsx';

export type MypageParamList = {
  [PATH.TICKET_RECORD]: undefined;
  [PATH.CANCEL_TICKET]: undefined;
  [PATH.UPDATE_MYTEAM]: undefined;
};

const Stack = createNativeStackNavigator<MypageParamList>();

function MyPageNavigation() {
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
      <Stack.Screen name={PATH.TICKET_RECORD} component={MyTicketScreen} />
      <Stack.Screen name={PATH.CANCEL_TICKET} component={CancelTicketScreen} />
      <Stack.Screen name={PATH.UPDATE_MYTEAM} component={UpdateTeamScreen} />
    </Stack.Navigator>
  );
}

export default MyPageNavigation;
