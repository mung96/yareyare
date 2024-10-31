import {View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

function GameScheduleScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomText>경기 일정 페이지</CustomText>
    </View>
  );
}

export default GameScheduleScreen;
