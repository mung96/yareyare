import React from 'react';
import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';

import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends PressableProps {}

const categoryList = [
  {label: '모바일 티켓', value: '모바일 티켓'},
  {label: '현장 수령', value: '현장 수령'},
];

const MethodSelector = ({}: Props) => {
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.inputContainerTitle}>티켓수령방법 선택</Text>
      <View style={styles.selectContainer}>
        {categoryList.map(method => (
          <Pressable
            key={method.value}
            style={styles.boxContainer}
            onPress={() => console.log(method)}>
            <View style={[styles.selectBox, styles.pressedSelectBox]}>
              <Icon
                name={'checkmark-sharp'}
                color={COLORS.PURPLE_100}
                size={12}
                style={{bottom: 1}}
              />
            </View>

            <Text style={styles.text}>{method.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
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
