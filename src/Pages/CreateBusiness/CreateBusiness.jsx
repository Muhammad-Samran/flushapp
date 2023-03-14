import React from 'react';
import Layout from '../../Components/global/Dashboard/Layouts/Layout';
import { Container } from 'react-bootstrap';
import OnbaordingDetailsStep1 from '../../Components/CreateBusiness/Details_Step1/OnboardingDetailsStep1';
import OnbaordingDetailsStep2 from '../../Components/CreateBusiness/Details_Step2/OnboardingDetailsStep2';
import OnboardingDetailsStep3 from '../../Components/CreateBusiness/Details_Step3/OnboardingDetailsStep3';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
function CreateBusiness() {
  
  //   const { authorizing, isAuthorized, userId } = useSelector(
  //     (state) => state.auth
  //   );
  //   if (authorizing) {
  //     return (
  //       <Layout>
  //         <div className="d-flex justify-content-center">
  //           <div className="spinner-border" role="status">
  //             <span className="sr-only">Loading...</span>
  //           </div>
  //         </div>
  //       </Layout>
  //     );
  //   }
  //   if (!isAuthorized) {
  //     return <Navigate to="/login" />;
  //   }
  return (
    <Layout type='plain'>
      <Container>
        <CreateBusinessRouter />
      </Container>
    </Layout>
  );
}
const CreateBusinessRouter = () => {
  const navigate = useNavigate();
  return (
    <BusinessOnbaordingContainer>
      <Routes>
        <Route path='step1' element={<OnbaordingDetailsStep1 navigate={navigate} />} />
        <Route path='step2' element={<OnbaordingDetailsStep2 />} />
        <Route path='step3' element={<OnboardingDetailsStep3 />} />
      </Routes>
    </BusinessOnbaordingContainer>
  );
};
const BusinessOnbaordingContainer = styled.div`
  max-width: 600px;
  margin-top: 50px;
`;

export default CreateBusiness;
