import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {ScrollView, View} from 'react-native';
import TicketRecordItem from '@/main/ui/components/member/TicketRecordItem.tsx';
import {COLORS} from '@/main/shared/styles';
import {useState} from 'react';
import {useGetTicketRecordQuery} from '@/main/services/hooks/queries/useTicketRecordQuery.ts';

function TicketRecordScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketRecord'>) {
  const recordType = route.params.type;
  const [purchaseId, setLastPurchaseId] = useState<number>(0);

  const {data: ticketRecordList} = useGetTicketRecordQuery(
    recordType,
    purchaseId,
  );
  console.log(recordType);
  console.log(ticketRecordList);

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
