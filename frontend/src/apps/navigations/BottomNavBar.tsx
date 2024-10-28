import React from 'react';
import HomeScreen from '@/apps/screens/HomeScreen.tsx';
import {PATH} from '@/shared/constants';
import GameScheduleScreen from '@/apps/screens/GameScheduleScreen.tsx';
import MyTicketScreen from '@/apps/screens/MyTicketScreen.tsx';
import MapScreen from '@/apps/screens/MapScreen.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {COLORS} from '@/shared/styles';
import Icon from 'react-native-vector-icons/Ionicons';

type TabProps = {
  [PATH.HOME]: undefined;
  [PATH.GAME_SCHEDULE]: undefined;
  [PATH.MAP]: undefined;
  [PATH.MY_TICKET]: undefined;
};

function TabBarIcons(route: RouteProp<TabProps>, focused: boolean) {
  let iconName = '';
  switch (route.name) {
    case PATH.HOME: {
      iconName = focused ? 'home' : 'home-outline';
      break;
    }
    case PATH.GAME_SCHEDULE: {
      iconName = focused ? 'calendar-clear' : 'calendar-clear-outline';
      break;
    }
    case PATH.MAP: {
      iconName = focused ? 'map' : 'map-outline';
      break;
    }
    case PATH.MY_TICKET: {
      iconName = focused ? 'ticket' : 'ticket-outline';
      break;
    }
  }

  return (
    <Icon
      name={iconName}
      color={focused ? COLORS.BLACK : COLORS.GRAY_200}
      size={22}
    />
  );
}

const Tab = createBottomTabNavigator<TabProps>();

function BottomNavBar() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.GRAY_100,
          paddingTop: 4,
          paddingBottom: 4,
          height: 52,
        },
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: COLORS.BLACK,
        tabBarInActiveTintColor: COLORS.GRAY_200,
      })}>
      <Tab.Screen
        name={PATH.HOME}
        component={HomeScreen}
        options={{title: '홈'}}
      />
      <Tab.Screen
        name={PATH.GAME_SCHEDULE}
        component={GameScheduleScreen}
        options={{title: '경기일정'}}
      />
      <Tab.Screen
        name={PATH.MAP}
        component={MapScreen}
        options={{title: '길찾기'}}
      />
      <Tab.Screen
        name={PATH.MY_TICKET}
        component={MyTicketScreen}
        options={{title: '나의티켓'}}
      />
    </Tab.Navigator>
  );
}

export default BottomNavBar;
