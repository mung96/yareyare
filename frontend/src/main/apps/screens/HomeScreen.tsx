import {View} from 'react-native';
import {COLORS} from '@/main/shared/styles';
import GameScheduleCardList from '@/main/ui/components/game/GameScheduleCardList';
import GameResultCard from '@/main/ui/components/game/GameResultCard.tsx';
import React, {ReactNode} from 'react';

function HomeScreen() {
  const CommonLayout = ({children}: {children: ReactNode}) => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingVertical: 24,
          gap: 12,
          width: '100%',
          backgroundColor: COLORS.WHITE,
        }}>
        {children}
      </View>
    );
  };
  return (
    <CommonLayout>
      <GameScheduleCardList />

      <GameResultCard />
    </CommonLayout>
  );
}

export default HomeScreen;
