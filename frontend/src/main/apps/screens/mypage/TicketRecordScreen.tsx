import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {ScrollView, View} from 'react-native';
import TicketRecordItem from '@/main/ui/components/member/TicketRecordItem.tsx';
import {COLORS} from '@/main/shared/styles';
import {apiRequester} from '@/main/apis/requester.ts';
import {isAxiosError} from 'axios';
import {useState} from 'react';

function TicketRecordScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketRecord'>) {
  const {type: recordType} = route.params;
  const lastId = useState(0);
  async function fetch() {
    //query요청

    try {
      const response = await apiRequester.get('payments/tickets/purchases');
      console.log(response);
      console.log(response.data.body.tickets);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response);
      }
    }
  }
  fetch();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 12,
        alignItems: 'center',
        gap: 12,
        width: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      <TicketRecordItem />
      <TicketRecordItem />
      <TicketRecordItem />
      <TicketRecordItem />
    </ScrollView>
  );
}

export default TicketRecordScreen;
