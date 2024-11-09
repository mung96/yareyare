import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const DropdownComponent = () => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>팀 선택</Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {/*{renderLabel()}*/}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: COLORS.PURPLE_100, borderWidth: 1},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="팀 선택"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        activeColor={COLORS.GRAY_400}
        renderLeftIcon={() => (
          <Icon name="people" size={22} style={styles.icon} />
        )}
        renderItem={item => <Text>{item.label}</Text>}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.GRAY_400,
    borderRadius: 12,
  },
  dropdown: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 22,
  },
  icon: {
    marginRight: 8,
    marginTop: 4,
  },
  label: {
    position: 'absolute',
    left: 16,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
    backgroundColor: COLORS.GRAY_400,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '700',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
