import GameResultCard from '@/main/ui/components/game/GameResultCard.tsx';
import React from 'react';
import CommonLayout from '@/main/apps/layout/CommonLayout.tsx';
import GamePlanCardList from '@/main/ui/components/game/GamePlanCardList.tsx';
import DropdownComponent from '@/main/ui/components/game/DropDown.tsx';

function HomeScreen() {
  return (
    <CommonLayout>
      <DropdownComponent />
      <GamePlanCardList />
      <GameResultCard />
    </CommonLayout>
  );
}

export default HomeScreen;
