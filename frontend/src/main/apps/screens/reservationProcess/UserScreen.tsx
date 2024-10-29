import {Button, Text, View} from 'react-native';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

function UserScreen({onPrev, onNext}: Props) {
  return (
    <View>
      <Button title={'이전'} onPress={onPrev} />
      <Text>회원정보 입력</Text>
      <Button title={'다음'} onPress={onNext} />
    </View>
  );
}

export default UserScreen;
