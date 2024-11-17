import React from 'react';
import {PATH} from '@/main/shared/constants';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import TicketRecordScreen from '@/main/apps/screens/mypage/TicketRecordScreen.tsx';
import UpdateTeamScreen from '@/main/apps/screens/mypage/UpdateTeamScreen.tsx';
import MyPageScreen from '@/main/apps/screens/MyPageScreen.tsx';
import {TicketType} from '@/main/shared/types/payment/domain.ts';
import IconI from 'react-native-vector-icons/Ionicons';
import TicketDetailScreen from '@/main/apps/screens/mypage/TicketDetailScreen.tsx';
import {PaymentDetailResponse} from '@/main/shared/types/payment/api.ts';
import TicketImageScreen from '@/main/apps/screens/mypage/TicketImageScreen.tsx';

type TicketCategory = {
  type: TicketType;
};

export type MypageParamList = {
  [PATH.MY_PAGE]: undefined;

  [PATH.TICKET_RECORD]: TicketCategory;
  [PATH.TICKET_DETAIL]: {purchaseId: number};
  [PATH.TICKET_IMAGE]: PaymentDetailResponse;

  [PATH.UPDATE_MYTEAM]: undefined;
};

const Stack = createNativeStackNavigator<MypageParamList>();

function MyPageNavigation() {
  return (
    <Stack.Navigator
      screenOptions={({
        navigation,
      }: NativeStackScreenProps<MypageParamList>) => ({
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerBackVisible: false,
        headerTitleStyle: {
          fontSize: 16,
        },
        headerLeft: () => (
          <IconI
            name={'chevron-back'}
            size={22}
            onPress={() => navigation.pop()}
          />
        ),
      })}>
      <Stack.Screen
        options={{
          headerShown: false,
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
      <Stack.Screen
        options={{
          headerTitle: '티켓 상세 조회',
        }}
        name={PATH.TICKET_DETAIL}
        component={TicketDetailScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '티켓 상세 조회',
        }}
        name={PATH.TICKET_IMAGE}
        component={TicketImageScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: '나의 팀 변경',
        }}
        name={PATH.UPDATE_MYTEAM}
        component={UpdateTeamScreen}
      />
    </Stack.Navigator>
  );
}

export default MyPageNavigation;
