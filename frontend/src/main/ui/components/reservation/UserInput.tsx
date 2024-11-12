import {StyleSheet, View} from 'react-native';
import InputField from '@/main/ui/components/common/InputField.tsx';
import React from 'react';
import {COLORS} from '@/main/shared/styles';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import {Control, Controller} from 'react-hook-form';
import {UserContext} from '@/main/shared/types';

type Props = {
  totalPrice: string;
  control: Control<UserContext, any>;
};

function UserInput({totalPrice, control}: Props) {
  return (
    <View style={styles.componentContainer}>
      <View style={styles.titleContainer}>
        <CustomText style={styles.categoryText}>일반</CustomText>
        <CustomText style={styles.totalPrice}>{totalPrice}원</CustomText>
      </View>
      <CustomText style={styles.inputContainerTitle}>
        예매자 정보 입력
      </CustomText>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({field: {value}}) => (
            <InputField label={'성명'} value={value} disabled={true} />
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({field: {value}}) => (
            <InputField label={'생년월일'} value={value} disabled={true} />
          )}
          name="birthday"
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputField
              label={'전화번호'}
              placeholder={'000-0000-0000'}
              value={value}
              disabled={true}
              // onChangeText={onChange}
              // onChange
            />
          )}
          name="phoneNumber"
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <InputField
              label={'이메일주소'}
              placeholder={'example@naver.com'}
              // onChangeText={onChange}
              disabled={true}
              value={value}
            />
          )}
          name="email"
        />
        <CustomText style={styles.description}>
          티켓수령 및 본인확인을 위해 정확한 정보를 입력해주세요
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
export default UserInput;
