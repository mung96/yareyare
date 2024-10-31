import {View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

function MapScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomText>길찾기 페이지</CustomText>
    </View>
  );
}

export default MapScreen;
