import React from 'react';
import HomeScreen from '@/apps/screens/HomeScreen.tsx';
import {PATH} from '@/shared/constants';
import GameScheduleScreen from '@/apps/screens/GameScheduleScreen.tsx';
import MyTicketScreen from '@/apps/screens/MyTicketScreen.tsx';
import MapScreen from '@/apps/screens/MapScreen.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

type TabProps = {
  [PATH.HOME]: undefined;
  [PATH.GAME_SCHEDULE]: undefined;
  [PATH.MAP]: undefined;
  [PATH.MY_TICKET]: undefined;
};

const Tab = createBottomTabNavigator<TabProps>();

function BottomNavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={PATH.HOME} component={HomeScreen} />
      <Tab.Screen name={PATH.GAME_SCHEDULE} component={GameScheduleScreen} />
      <Tab.Screen name={PATH.MAP} component={MapScreen} />
      <Tab.Screen name={PATH.MY_TICKET} component={MyTicketScreen} />
    </Tab.Navigator>
  );
}

export default BottomNavBar;
