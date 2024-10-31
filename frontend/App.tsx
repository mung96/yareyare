import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '@/main/stores/clients/rootReducer.ts';
import RootNavigation from '@/main/apps/navigations/RootNavigation.tsx';

const store = createStore(rootReducer);

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;
