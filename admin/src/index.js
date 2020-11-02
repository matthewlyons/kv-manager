import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/dist/styles.css';

import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import MemoryLink from './components/MemoryLink';

import { StoreProvider } from './context/StoreContext';

import App from './App';

ReactDOM.render(
  <AppProvider i18n={enTranslations} linkComponent={MemoryLink}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </AppProvider>,
  document.getElementById('root')
);
