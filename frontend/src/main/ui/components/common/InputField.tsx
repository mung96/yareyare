import React, {ForwardedRef, forwardRef, ReactNode, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import {COLORS} from '@/main/shared/styles';
import {mergeRefs} from '@/main/shared/utils/common.ts';
import CustomText from '@/main/ui/widgets/CustomText.tsx';

interface Props extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
  label?: string;
}

const InputField = forwardRef(
  (
    {disabled = false, error, touched, icon = null, label, ...props}: Props,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable
        onPress={handlePressInput}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '75%',
        }}>
        {label && <CustomText style={styles.label}>{label}</CustomText>}
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            props.multiline && styles.multiLine,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <View style={Boolean(icon) && styles.innerContainer}>
            {icon}
            <TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              editable={!disabled}
              placeholderTextColor={COLORS.GRAY_200}
              style={[styles.input, disabled && styles.disabled]}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              {...props}
            />
          </View>
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: COLORS.GRAY_200,
    padding: 1,
    borderRadius: 8,
  },
  label: {
    color: COLORS.BLACK,
    fontSize: 14,
  },
  multiLine: {
    paddingBottom: 30,
  },
  input: {
    fontSize: 14,
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    paddingVertical: 1,
    paddingHorizontal: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  disabled: {
    backgroundColor: COLORS.GRAY_500,
    color: COLORS.BLACK,
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  error: {
    color: COLORS.PINK,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
