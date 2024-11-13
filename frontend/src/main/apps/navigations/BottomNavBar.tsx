import React from 'react';
import HomeScreen from '@/main/apps/screens/HomeScreen.tsx';
import {PATH} from '@/main/shared/constants';
import GameScheduleScreen from '@/main/apps/screens/GameScheduleScreen.tsx';
import MapScreen from '@/main/apps/screens/MapScreen.tsx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {COLORS} from '@/main/shared/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import MyPageNavigation from '@/main/apps/navigations/MypageNavigation.tsx';

export type BottomParamList = {
  [PATH.HOME]: undefined;
  [PATH.GAME_SCHEDULE]: undefined;
  [PATH.MAP]: undefined;
  [PATH.MY_PAGE_INTRO]: undefined;
};

function TabBarIcons(route: RouteProp<BottomParamList>, focused: boolean) {
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
    case PATH.MY_PAGE_INTRO: {
      iconName = focused ? 'person' : 'person-outline';
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

const Tab = createBottomTabNavigator<BottomParamList>();

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
        name={PATH.MY_PAGE_INTRO}
        component={MyPageNavigation}
        options={{title: '마이페이지'}}
      />
    </Tab.Navigator>
  );
}

export default BottomNavBar;
