import GameResultCard from '@/main/ui/components/game/GameResultCard.tsx';
import React from 'react';
import CommonLayout from '@/main/apps/layout/CommonLayout.tsx';
import GamePlanCardList from '@/main/ui/components/game/GamePlanCardList.tsx';
import DropdownComponent from '@/main/ui/components/game/DropDownComponent.tsx';
import {StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

function HomeScreen() {
  return (
    <CommonLayout>
      <DropdownComponent
        data={data}
        placeholder={'팀 선택'}
        icon={<Icon name="people" size={22} style={styles.icon} />}
        renderItem={item => <Text>{item.label}</Text>}
      />
      <GamePlanCardList />
      <GameResultCard />
    </CommonLayout>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
    marginTop: 4,
  },
});
export default HomeScreen;
