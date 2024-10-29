import {Button, Text, View} from 'react-native';

type Props = {
  onNext: () => void;
};

function SectionScreen({onNext}: Props) {
  return (
    <View>
      <Text>구역선택</Text>
      <Button title={'다음'} onPress={onNext} />
    </View>
  );
}

export default SectionScreen;
