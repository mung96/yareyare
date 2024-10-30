import ReservationNavigation from '@/main/apps/navigations/ReservationNavigation';
import {NavigationContainer} from '@react-navigation/native';

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
