import {Pressable, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {useDispatch} from 'react-redux';
import {moveNavigation} from '@/main/stores/navigationCategory.ts';

function MyTicketPage() {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomText>마이티켓 화면</CustomText>
      <Pressable onPress={() => dispatch(moveNavigation('certificate'))}>
        <CustomText>본인인증 하러가기</CustomText>
      </Pressable>
    </View>
  );
}

export default MyTicketPage;
