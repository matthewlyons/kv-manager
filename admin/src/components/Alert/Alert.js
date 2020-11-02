import React, { useContext } from 'react';
import { Banner } from '@shopify/polaris';

import { StoreContext } from '../../context/StoreContext';

export default function Alert() {
  const { state, setError } = useContext(StoreContext);
  return (
    <React.Fragment>
      {state.alert.message.length > 0 && (
        <Banner
          title={state.alert.message}
          status="critical"
          onDismiss={() => {
            setError('');
          }}
        ></Banner>
      )}
    </React.Fragment>
  );
}
