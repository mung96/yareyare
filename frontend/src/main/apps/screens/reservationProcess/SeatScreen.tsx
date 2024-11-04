import {Button, StyleSheet, View} from 'react-native';
import SeatContainment from '@/main/ui/components/reservation/SeatContainment.tsx';
import {COLORS} from '@/main/shared/styles';
import {useState} from 'react';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};
export type Seat = {
  row: string;
  col: number;
};

function SeatScreen({onPrev, onNext}: Props) {
  const [seatList, setSeatList] = useState<Seat[]>([]);
  return (
    <View style={styles.container}>
      <SeatContainment value={seatList} onSelect={setSeatList} />
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
