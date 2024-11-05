import {NavigationContainer} from '@react-navigation/native';
import BottomNavBar from '@/main/apps/navigations/BottomNavBar.tsx';
import ReservationNavigation from '@/main/apps/navigations/ReservationNavigation.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/clients/rootReducer.ts';
// import AuthNavigation from '@/main/apps/navigations/AuthNavigation.tsx';

function RootNavigation() {
  const curNavigation = useSelector(
    (state: RootState) => state.navigationCategory.navigationCategory,
  );

  return (
    <NavigationContainer>
      {/*<AuthNavigation />*/}
      {curNavigation === 'navbar' ? (
        <BottomNavBar />
      ) : (
        <ReservationNavigation />
      )}
    </NavigationContainer>
  );
}

export default RootNavigation;
