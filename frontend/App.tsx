import {NavigationContainer} from '@react-navigation/native';
import ReservationNavigation from '@/main/apps/navigations/ReservationNavigation.tsx';

function App(): React.JSX.Element {
  return (
    <>
      <NavigationContainer>
        <ReservationNavigation />
        {/*<BottomNavBar />*/}
      </NavigationContainer>
    </>
  );
}

export default App;
