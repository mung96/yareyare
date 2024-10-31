import {View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

function MyTicketPage() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomText>마이티켓 화면</CustomText>
    </View>
  );
}

export default MyTicketPage;
