import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BusinessProfileView from './BusinessProfile';
import EditBusiness from './BusinessEdit';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Layout from '../../Components/global/Dashboard/Layouts/Layout';
function BusinessProfileContainer() {
  const { authorizing, isAuthorized, userId } = useSelector(
    (state) => state.auth
  );
  if (authorizing) {
    return (
      <LoaderContainer>
        <div className=''>
          <div className='d-flex justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='sr-only'></span>
            </div>
          </div>
        </div>
      </LoaderContainer>
    );
  }
  return (
    <Layout type='plain'>
      <Routes>
        <Route path=':businessId' element={<BusinessProfileView />} />
        <Route path=':businessId/edit/*' element={<EditBusiness />} />
      </Routes>
    </Layout>
  );
}
const LoaderContainer = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;
export default BusinessProfileContainer;
