import {useSelector} from 'react-redux';
import {RootState} from '@/main/stores/rootReducer.ts';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavBar from '@/main/apps/navigations/BottomNavBar.tsx';
import WaitingNavigation from '@/main/apps/navigations/WaitingNavigation.tsx';
import ReservationNavigation from '@/main/apps/navigations/ReservationNavigation.tsx';
import AuthNavigation from '@/main/apps/navigations/AuthNavigation.tsx';
import CertificateNavigation from '@/main/apps/navigations/CertificateNavigation.tsx';

function RootNavigation() {
  const curNavigation = useSelector(
    (state: RootState) => state.navigationCategory.navigationCategory,
  );
  const isLogin = useSelector((state: RootState) => state.member.isLogin);

  //TODO: 앱을 켰어 => 스토리지에 토큰이 있어 => isLogin = true, 회원정보 조회/ 없으면 로그인 페이지 가야함.
  return (
    <NavigationContainer>
      {isLogin ? (
        <>
          {curNavigation === 'navbar' && <BottomNavBar />}
          {curNavigation === 'waiting' && <WaitingNavigation />}
          {curNavigation === 'certificate' && <CertificateNavigation />}
          {curNavigation === 'reservation' && <ReservationNavigation />}
        </>
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
}

export default RootNavigation;
