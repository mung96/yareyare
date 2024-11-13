import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {ScrollView} from 'react-native';
import TicketRecordItem from '@/main/ui/components/member/TicketRecordItem.tsx';
import {COLORS} from '@/main/shared/styles';
import {useState} from 'react';
import {useGetTicketRecordQuery} from '@/main/services/hooks/queries/useTicketRecordQuery.ts';

//TODO: 무한스크롤
function TicketRecordScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketRecord'>) {
  const recordType = route.params.type;
  const [purchaseId, setLastPurchaseId] = useState<number>(0);

  const {data: ticketRecordList, isSuccess} = useGetTicketRecordQuery(
    recordType,
    purchaseId,
  );
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
      {isSuccess &&
        ticketRecordList?.tickets.content.map(ticket => (
          <TicketRecordItem ticket={ticket} />
        ))}
    </ScrollView>
  );
}

export default TicketRecordScreen;
