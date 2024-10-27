import BottomNavBar from '@/apps/navigations/BottomNavBar';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomNavBar />
    </NavigationContainer>
  );
}

export default App;
