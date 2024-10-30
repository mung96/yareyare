import {Button, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import InputField from '@/main/ui/components/common/InputField.tsx';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

function UserScreen({onPrev, onNext}: Props) {
  return (
    <View>
      <View style={styles.componentContainer}>
        <View>
          <Text>일반</Text>
          <Text>15,000</Text>
        </View>
        <View>
          <Text>예매자 정보 입력</Text>
          <View>
            <InputField label={'성명'} />
          </View>
        </View>
        <Text>티켓수령 및 본인확인을 위해 정확한 정보를 입력해주세요</Text>
      </View>
      <Button title={'다음'} onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: COLORS.GRAY_400,
    paddingHorizontal: 14,
  },
  input: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    backgroundColor: COLORS.WHITE,
  },
});

export default UserScreen;
