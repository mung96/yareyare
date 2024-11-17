import {Alert, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {useGetTicketDetailQuery} from '@/main/services/hooks/queries/useTicketRecordQuery.ts';
import {PATH} from '@/main/shared/constants';
import {isAxiosError} from 'axios';

function TicketDetailScreen({
  route,
  navigation,
}: NativeStackScreenProps<MypageParamList, 'TicketDetail'>) {
  console.log(route.params.purchaseId);

  const {data: ticketDetailData, error} = useGetTicketDetailQuery(
    route.params.purchaseId,
  );

  if (isAxiosError(error)) {
    Alert.alert('', '해당 구매 내역이 존재하지 않아요', [
      {
        text: '돌아가기',
        onPress: () => {
          navigation.pop();
        },
        style: 'destructive',
      },
    ]);
  }
  return (
    <Text
      onPress={() => navigation.navigate(PATH.TICKET_IMAGE, ticketDetailData!)}>
      ticketDetail
    </Text>
  );
}

export default TicketDetailScreen;
