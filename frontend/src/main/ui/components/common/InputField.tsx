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
        style={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {label && <Text style={styles.label}>{label}</Text>}
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
              placeholderTextColor={COLORS.GRAY_400}
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
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
    padding: 2,
    borderRadius: 8,
  },
  label: {
    color: COLORS.BLACK,
    fontSize: 16,
  },
  multiLine: {
    paddingBottom: 30,
  },
  input: {
    fontSize: 14,
    color: COLORS.BLACK,
    padding: 2,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  disabled: {
    backgroundColor: COLORS.GRAY_400,
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
