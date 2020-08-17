import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/dist/styles.css';

import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import MemoryLink from './components/MemoryLink';

import App from './App';

ReactDOM.render(
  <AppProvider i18n={enTranslations} linkComponent={MemoryLink}>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
