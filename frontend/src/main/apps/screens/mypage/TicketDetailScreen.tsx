import {Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';

function TicketDetailScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketDetail'>) {
  console.log(route.params.purchaseId);
  return <Text>ticketDetail</Text>;
}

export default TicketDetailScreen;
