import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTicketScreen from '@/main/apps/screens/mypage/MyTicketScreen.tsx';
import CancelTicketScreen from '@/main/apps/screens/mypage/CancelTicketScreen.tsx';
import UpdateTeamScreen from '@/main/apps/screens/mypage/UpdateTeamScreen.tsx';
import MyPageScreen from '@/main/apps/screens/MyPageScreen.tsx';

export type MypageParamList = {
  [PATH.MY_PAGE]: undefined;
  [PATH.TICKET_RECORD]: undefined;
  [PATH.CANCEL_TICKET]: undefined;
  [PATH.UPDATE_MYTEAM]: undefined;
};

const Stack = createNativeStackNavigator<MypageParamList>();

function MyPageNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={PATH.MY_PAGE} component={MyPageScreen} />
      <Stack.Screen name={PATH.TICKET_RECORD} component={MyTicketScreen} />
      <Stack.Screen name={PATH.CANCEL_TICKET} component={CancelTicketScreen} />
      <Stack.Screen name={PATH.UPDATE_MYTEAM} component={UpdateTeamScreen} />
    </Stack.Navigator>
  );
}

export default MyPageNavigation;
