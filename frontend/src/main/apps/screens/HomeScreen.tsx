import GameScheduleCardList from '@/main/ui/components/game/GameScheduleCardList';
import GameResultCard from '@/main/ui/components/game/GameResultCard.tsx';
import React from 'react';
import CommonLayout from '@/main/apps/layout/CommonLayout.tsx';

function HomeScreen() {
  return (
    <CommonLayout>
      <GameScheduleCardList />
      <GameResultCard />
    </CommonLayout>
  );
}

export default HomeScreen;
