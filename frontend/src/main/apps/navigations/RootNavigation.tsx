import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/clients/rootReducer.ts';
import AuthNavigation from '@/main/apps/navigations/AuthNavigation.tsx';
import BottomNavBar from '@/main/apps/navigations/BottomNavBar.tsx';
import ReservationNavigation from '@/main/apps/navigations/ReservationNavigation.tsx';

function RootNavigation() {
  const curNavigation = useSelector(
    (state: RootState) => state.navigationCategory.navigationCategory,
  );
  const isLogin = useSelector((state: RootState) => state.member.isLogin);

  // const fetchToken = async () => {
  //   const a = await getEncryptStorage('token');
  //   console.log('fetchToken');
  //   console.log(a);
  // };
  //
  // fetchToken();

  return (
    <NavigationContainer>
      {isLogin ? (
        curNavigation === 'navbar' ? (
          <BottomNavBar />
        ) : (
          <ReservationNavigation />
        )
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
}

export default RootNavigation;
