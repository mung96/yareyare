import CommonLayout from '@/main/apps/layout/CommonLayout.tsx';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MypageParamList} from '@/main/apps/navigations/MypageNavigation.tsx';
import {View} from 'react-native';
import TicketRecordItem from '@/main/ui/components/member/TicketRecordItem.tsx';

function TicketRecordScreen({
  route,
}: NativeStackScreenProps<MypageParamList, 'TicketRecord'>) {
  const {type: recordType} = route.params;
  return (
    <CommonLayout>
      {recordType === 'reserve' && <CustomText>티켓 예매 내역</CustomText>}
      {recordType === 'cancel' && <CustomText>티켓 취소 내역</CustomText>}
      <TicketRecordItem />
    </CommonLayout>
  );
}

export default TicketRecordScreen;
