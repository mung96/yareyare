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
import Icon from 'react-native-vector-icons/Ionicons';
import IconI from 'react-native-vector-icons/Ionicons';

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
            onPress={() => navigation.navigate(PATH.MY_PAGE)}
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
      <Stack.Screen name={PATH.UPDATE_MYTEAM} component={UpdateTeamScreen} />
    </Stack.Navigator>
  );
}

export default MyPageNavigation;
