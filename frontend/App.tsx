import {NavigationContainer} from '@react-navigation/native';
import BottomNavBar from '@/main/apps/navigations/BottomNavBar.tsx';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '@/main/stores/clients/rootReducer.ts';

const store = createStore(rootReducer);

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomNavBar />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
