import React, { useState, useEffect } from 'react';

import { MobileCancelMajorMonotone } from '@shopify/polaris-icons';
import {
  Heading,
  Checkbox,
  Sheet,
  Scrollable,
  Form,
  FormLayout,
  TextField,
  Select,
  Button
} from '@shopify/polaris';

export default function SlideModal(props) {
  let { open, toggleModal, children, title } = props;

  return (
    <Sheet
      open={open}
      onClose={() => {
        toggleModal('edit');
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div
          style={{
            alignItems: 'center',
            borderBottom: '1px solid #DFE3E8',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1.6rem',
            width: '100%'
          }}
        >
          <Heading>{title}</Heading>
          <Button
            accessibilityLabel="Cancel"
            icon={MobileCancelMajorMonotone}
            onClick={() => {
              toggleModal('edit');
            }}
            plain
          />
        </div>
        <Scrollable style={{ padding: '1.6rem', height: '100%' }}>
          {children}
        </Scrollable>
      </div>
    </Sheet>
  );
}
