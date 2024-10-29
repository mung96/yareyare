import {Button, Text, View} from 'react-native';

type Props = {
  onPrev: () => void;
  onSubmit: () => void;
};

function PaymentScreen({onPrev, onSubmit}: Props) {
  return (
    <View>
      <Button title={'이전'} onPress={onPrev} />
      <Text>결제페이지</Text>
      <Button title={'다음'} onPress={onSubmit} />
    </View>
  );
}

export default PaymentScreen;
