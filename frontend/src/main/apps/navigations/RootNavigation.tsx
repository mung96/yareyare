import {NavigationContainer} from '@react-navigation/native';
import BottomNavBar from '@/main/apps/navigations/BottomNavBar.tsx';
import ReservationNavigation from '@/main/apps/navigations/ReservationNavigation.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/clients/rootReducer.ts';

function RootNavigation() {
  const curNavigation = useSelector(
    (state: RootState) => state.navigationCategory.navigationCategory,
  );

  return (
    <NavigationContainer>
      {curNavigation === 'navbar' ? (
        <BottomNavBar />
      ) : (
        <ReservationNavigation />
      )}
    </NavigationContainer>
  );
}

export default RootNavigation;
