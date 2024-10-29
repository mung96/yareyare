import {Button, Text, View} from 'react-native';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

function SeatScreen({onPrev, onNext}: Props) {
  return (
    <View>
      <Button title={'이전'} onPress={onPrev} />
      <Text>좌석선택</Text>
      <Button title={'다음'} onPress={onNext} />
    </View>
  );
}

export default SeatScreen;
