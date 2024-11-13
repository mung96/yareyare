import React from 'react';
import {PATH} from '@/main/shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TicketRecordScreen from '@/main/apps/screens/mypage/TicketRecordScreen.tsx';
import UpdateTeamScreen from '@/main/apps/screens/mypage/UpdateTeamScreen.tsx';
import MyPageScreen from '@/main/apps/screens/MyPageScreen.tsx';
import {TicketType} from '@/main/shared/types/payment/domain.ts';

type TicketCategory = {
  type: TicketType;
};

export type MypageParamList = {
  [PATH.MY_PAGE]: undefined;
  [PATH.TICKET_RECORD]: TicketCategory;
  [PATH.UPDATE_MYTEAM]: undefined;
};

const Stack = createNativeStackNavigator<MypageParamList>();

function MyPageNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {
            // shadowColor: 'transparent',
          },
        }}
        name={PATH.MY_PAGE}
        component={MyPageScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '티켓 예매 내역',
        }}
        name={PATH.TICKET_RECORD}
        component={TicketRecordScreen}
      />
      <Stack.Screen name={PATH.UPDATE_MYTEAM} component={UpdateTeamScreen} />
    </Stack.Navigator>
  );
}

export default MyPageNavigation;
