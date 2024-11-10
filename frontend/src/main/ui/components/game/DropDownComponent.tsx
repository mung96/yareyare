import React, {ReactNode, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '@/main/shared/styles';

type DataType = {
  label: string;
  value: string;
};

type Props<T extends DataType> = {
  data: T[];
  placeholder: string;
  icon: ReactNode;
  renderItem: (item: T, selected?: boolean) => JSX.Element | null | undefined;
};

const DropDownComponent = <T,>({
  data,
  placeholder,
  icon,
  renderItem,
}: Props<T>) => {
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

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
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        activeColor={COLORS.GRAY_400}
        renderLeftIcon={icon}
        renderItem={renderItem}
      />
    </View>
  );
};

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

export default DropDownComponent;
