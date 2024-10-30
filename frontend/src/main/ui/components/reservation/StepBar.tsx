import {StyleSheet, View} from 'react-native';
import {COLORS} from '@/main/shared/styles';

type Props = {
  currentStep: number;
  totalStep: number;
};

function StepBar({totalStep, currentStep}: Props) {
  return (
    <View style={styles.container}>
      {Array.from({length: totalStep}).map((item, stepNumber) => (
        <View
          style={[
            styles.stepItem,
            stepNumber + 1 <= currentStep && styles.prevStepItem,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  stepItem: {
    width: '25%',
    height: 6,
    backgroundColor: COLORS.GRAY_500,
  },
  prevStepItem: {
    backgroundColor: COLORS.PURPLE_100,
  },
});

export default StepBar;
