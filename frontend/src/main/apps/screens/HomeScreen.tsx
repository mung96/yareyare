import {View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import GameScheduleCardList from '@/main/ui/components/game/GameScheduleCardList';
import GameResultCard from '@/main/ui/components/game/GameResultCard.tsx';
import {getEncryptStorage} from '@/main/shared/utils/encryptStorage.ts';

function HomeScreen() {
  console.log(getEncryptStorage('token'));
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
