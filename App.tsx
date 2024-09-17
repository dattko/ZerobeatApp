
import React from 'react';
import MainLayout from '@components/layouts/MainLayout';
import AppNavigator from '@navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <MainLayout>
        <AppNavigator />
      </MainLayout>
    </SafeAreaProvider>
  );
}

export default App;