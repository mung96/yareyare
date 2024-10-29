import {View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import GameScheduleCardList from '@/main/ui/components/game/GameScheduleCardList';
import GameResultCard from '@/main/ui/components/game/GameResultCard.tsx';

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

      <GameScheduleCardList />
      <GameResultCard />
    </View>
  );
}

export default HomeScreen;
