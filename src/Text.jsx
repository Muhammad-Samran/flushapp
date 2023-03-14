import React from 'react';
import useData from './Hook/useData';
function Text() {
  const [loadingData, error] = useData(
    `/fetch/business/?b_id=9134df15-5389-4eaa-9233-dea886aed157`
  );
  if (loadingData) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return <div>Data fetched</div>;
}

export default Text;
