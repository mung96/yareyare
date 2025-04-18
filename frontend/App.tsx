import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '@/main/stores/rootReducer.ts';
import RootNavigation from '@/main/apps/navigations/RootNavigation.tsx';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/main/apis/queryClient.ts';

const store = createStore(rootReducer);

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
