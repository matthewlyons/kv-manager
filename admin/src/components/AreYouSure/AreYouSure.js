import React from 'react';

import { Modal } from '@shopify/polaris';

export default function AreYouSure({ open, close, action }) {
  return (
    <Modal
      open={open}
      onClose={close}
      title="Are you sure?"
      primaryAction={{
        content: 'Yes',
        onAction: action
      }}
    />
  );
}
