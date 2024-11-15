import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ErrorBoundary} from 'react-error-boundary';
import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import MainButton from '@/main/ui/widgets/MainButton.tsx';

function RetryErrorBoundary({children}: PropsWithChildren) {
  const {reset} = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({resetErrorBoundary}) => (
        <View style={styles.container}>
          <Text style={styles.titleText}>잠시 후 다시 시도해주세요.</Text>
          <Text style={styles.descriptionText}>
            요청 사항을 처리하는데 실패했습니다.
          </Text>
          <View style={{width: '50%'}}>
            <MainButton
              label="다시 시도"
              size="medium"
              variant="outlined"
              onPress={resetErrorBoundary}
            />
          </View>
        </View>
      )}>
      {children}
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 15,
  },
});

export default RetryErrorBoundary;
