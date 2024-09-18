import React from 'react';
import MainLayout from '@components/layouts/MainLayout';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@/store';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
