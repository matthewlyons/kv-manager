import React from 'react';
import { Spinner } from '@shopify/polaris';

export default function Loading() {
  return (
    <div className="LoadingContainer">
      <Spinner accessibilityLabel="Loading" size="large" />
    </div>
  );
}
