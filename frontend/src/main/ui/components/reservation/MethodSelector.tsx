import React from 'react';
import {Pressable, PressableProps, StyleSheet, View} from 'react-native';

import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '@/main/ui/widgets/CustomText.tsx';
import ReservationBox from '@/main/ui/components/reservation/ReservationBox.tsx';

interface Props extends PressableProps {
  value: string;
  onSelect: (value: string) => void;
}

const categoryList = [
  {label: '모바일 티켓', value: '모바일 티켓'},
  {label: '현장 수령', value: '현장 수령'},
];

const MethodSelector = ({value, onSelect}: Props) => {
  return (
    <ReservationBox title={'티켓수령방법 선택'}>
      <View style={styles.selectContainer}>
        {categoryList.map(method => (
          <Pressable
            key={method.value}
            style={styles.boxContainer}
            onPress={() => onSelect(method.value)}>
            <View
              style={[
                styles.selectBox,
                value === method.value && styles.pressedSelectBox,
              ]}>
              {value === method.value && (
                <Icon
                  name={'checkmark-sharp'}
                  color={COLORS.PURPLE_100}
                  size={12}
                  style={{bottom: 1}}
                />
              )}
            </View>

            <CustomText style={styles.text}>{method.label}</CustomText>
          </Pressable>
        ))}
      </View>
    </ReservationBox>
  );
};

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: COLORS.GRAY_400,
    paddingHorizontal: 14,
    paddingVertical: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  inputContainerTitle: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontWeight: '900',
  },
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 60,
    paddingLeft: 10,
  },
  selectBox: {
    width: 14,
    height: 14,
    borderRadius: 2,
    backgroundColor: COLORS.GRAY_500,
    marginTop: 2,
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  pressedSelectBox: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.PURPLE_100,
    borderWidth: 1,
  },
  text: {
    color: COLORS.BLACK,
  },
  pressedMarker: {
    borderWidth: 2,
    borderColor: COLORS.PINK,
  },
});

export default MethodSelector;
