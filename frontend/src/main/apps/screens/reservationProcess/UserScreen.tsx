import {Button, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import InputField from '@/main/ui/components/common/InputField.tsx';
import React from 'react';
import MethodSelector from '@/main/ui/components/reservation/MethodSelector.tsx';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

function UserScreen({onPrev, onNext}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <MethodSelector />
        <View style={styles.titleContainer}>
          <Text style={styles.categoryText}>일반</Text>
          <Text style={styles.totalPrice}>15,000원</Text>
        </View>
        <Text style={styles.inputContainerTitle}>예매자 정보 입력</Text>
        <View style={styles.inputContainer}>
          <InputField label={'성명'} value={'정지연'} disabled={true} />
          <InputField label={'생년월일'} value={'000315'} disabled={true} />
          <InputField label={'전화번호'} placeholder={'000-0000-0000'} />
          <InputField label={'이메일주소'} placeholder={'example@naver.com'} />
          <Text style={styles.description}>
            티켓수령 및 본인확인을 위해 정확한 정보를 입력해주세요
          </Text>
        </View>
      </View>

      <Button title={'다음'} onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.7,
    borderColor: COLORS.BLACK,
    paddingVertical: 14,
  },
  categoryText: {
    color: COLORS.GRAY_300,
    fontSize: 12,
  },
  totalPrice: {
    fontSize: 20,
    color: COLORS.BLACK,
    fontWeight: '900',
  },
  description: {
    fontSize: 12,
    color: COLORS.GRAY_300,
  },

  componentContainer: {
    backgroundColor: COLORS.GRAY_400,
    paddingHorizontal: 14,
    paddingVertical: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingHorizontal: 12,
  },
  inputContainerTitle: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontWeight: '900',
  },
});

export default UserScreen;
