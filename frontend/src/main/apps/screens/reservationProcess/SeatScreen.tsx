import {Button, View} from 'react-native';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

function SeatScreen({onPrev, onNext}: Props) {
  return (
    <View>
      <Button title={'이전'} onPress={onPrev} />
      <CustomText>좌석선택</CustomText>
      <Button title={'다음'} onPress={onNext} />
    </View>
  );
}

export default SeatScreen;
