import {Button, StyleSheet, View} from 'react-native';
import SeatContainment from '@/main/ui/components/reservation/SeatContainment.tsx';
import {COLORS} from '@/main/shared/styles';
import React, {useState} from 'react';
import SelectedSeatList from '@/main/ui/components/reservation/SelectedSeatList.tsx';
import MainButton from '@/main/ui/widgets/MainButton.tsx';

type Props = {
  onPrev: () => void;
  onNext: () => void;
};
export type Seat = {
  section: number;
  row: string;
  col: number;
};

function SeatScreen({onPrev, onNext}: Props) {
  const [seatList, setSeatList] = useState<Seat[]>([]);

  function addSeat(arr: Seat[], seat: Seat) {
    const newSeatList = [...arr, seat];
    setSeatList(newSeatList);
  }

  function removeSeat(arr: Seat[], seat: Seat) {
    const newSeatList = arr.filter(
      item => !(item.row === seat.row && item.col === seat.col),
    );
    setSeatList(newSeatList);
  }

  return (
    <View style={styles.container}>
      <SeatContainment value={seatList} onAdd={addSeat} onRemove={removeSeat} />
      <SelectedSeatList seatList={seatList} />
      <MainButton label={'다음'} onPress={onNext} size={'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
});

export default SeatScreen;
