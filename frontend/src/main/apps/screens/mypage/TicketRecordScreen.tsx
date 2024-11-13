import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {ScrollView, View} from 'react-native';
import TicketRecordItem from '@/main/ui/components/member/TicketRecordItem.tsx';
import {COLORS} from '@/main/shared/styles';

function TicketRecordScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketRecord'>) {
  const {type: recordType} = route.params;

  //query요청

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingTop: 12,
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
