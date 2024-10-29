import {View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import GameScheduleCard from '@/main/ui/components/game/GameScheduleCard.tsx';

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: COLORS.WHITE,
      }}>
      {/*<DayPicker />*/}
      <GameScheduleCard />
    </View>
  );
}

export default HomeScreen;
