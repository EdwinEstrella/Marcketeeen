import React from 'react';
import { facebookAdsService } from '../services/facebookApi';

export const DebugInfo = () => {
  const [sdkStatus, setSdkStatus] = React.useState({});

  React.useEffect(() => {
    const status = facebookAdsService.getSDKStatus();
    setSdkStatus(status);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-lg text-xs opacity-90">
      <div className="font-semibold">SDK Status:</div>
      <div>Loaded: {sdkStatus.isLoaded ? '✅' : '❌'}</div>
      <div>Mode: {sdkStatus.mode || 'unknown'}</div>
    </div>
  );
};
