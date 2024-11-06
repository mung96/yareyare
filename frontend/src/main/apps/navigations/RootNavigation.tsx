import {NavigationContainer} from '@react-navigation/native';
// import BottomNavBar from '@/main/apps/navigations/BottomNavBar.tsx';
// import ReservationNavigation from '@/main/apps/navigations/ReservationNavigation.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/clients/rootReducer.ts';
import AuthNavigation from '@/main/apps/navigations/AuthNavigation.tsx';
import BottomNavBar from '@/main/apps/navigations/BottomNavBar.tsx';
import ReservationNavigation from '@/main/apps/navigations/ReservationNavigation.tsx';
import {
  getEncryptStorage,
  removeEncryptStorage,
} from '@/main/utils/encryptStorage.ts';
import {useState} from 'react';

// import AuthNavigation from '@/main/apps/navigations/AuthNavigation.tsx';

function RootNavigation() {
  const curNavigation = useSelector(
    (state: RootState) => state.navigationCategory.navigationCategory,
  );
  const [isLogin, setIsLogin] = useState(false);
  const fetchToken = async () => {
    const a = await getEncryptStorage('token');
    console.log('fetchToken');
    console.log(a);
    setIsLogin(a ? true : false);
  };

  fetchToken();
  // const isLogin = getEncryptStorage('token');

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
