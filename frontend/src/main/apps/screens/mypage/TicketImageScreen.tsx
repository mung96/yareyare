import {Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';

function TicketImageScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketImage'>) {
  console.log(route.params);
  return <Text>티켓 이미지</Text>;
}

export default TicketImageScreen;
