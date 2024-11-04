import {Button, StyleSheet, View} from 'react-native';
import SeatContainment from '@/main/ui/components/reservation/SeatContainment.tsx';
import {COLORS} from '@/main/shared/styles';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

function SeatScreen({onPrev, onNext}: Props) {
  return (
    <View style={styles.container}>
      <SeatContainment />
      <Button title={'다음'} onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
});

export default SeatScreen;
