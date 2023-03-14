import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import EducationList from '../EducationList/EducationList';
import AddEducation from '../AddEducation/AddEducation';
import EditEducation from '../EditEducation/EditEducation';
import ExperienceList from '../ExperienceList/ExperienceList';
import AddWork from '../AddWork/AddWork';
import EditWork from '../EditWork/EditWork';
import PortfolioList from '../PortfolioList/PortfolioListContainer/PortfolioListContainer';
import AddPortfolio from '../AddPortfolio/AddPortfolio';
import EditPortfolio from '../EditPortfolio/EditPortfolio';
import styled from 'styled-components';
function ProfileDetailEditContainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentRoute = `/profile/${id}/details`;
  const ModalData = (props) => {
    return (
      <Modal
        show={true}
        onHide={(e) => navigate(props.navigateTo)}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Body>
          <div className='p-4'>{props.children}</div>
        </Modal.Body>
      </Modal>
    );
  };
  return (
    <Container>
      <Routes>
        <Route
          exact
          path='education/add'
          element={
            <ModalData navigateTo={`/profile/${id}/details/education`}>
              <AddEducation navigateTo={`/profile/${id}/details/education`} />
            </ModalData>
          }
        />
        <Route
          exact
          path='education/edit/:educationId'
          element={
            <ModalData navigateTo={`/profile/${id}/details/education`}>
              <EditEducation navigateTo={`/profile/${id}/details/education`} />
            </ModalData>
          }
        />
        <Route
          exact
          path='education/'
          element={
            <>
              <ViewAllButton onClick={(e) => navigate(`/profile/${id}`)}>
                Back
              </ViewAllButton>
              {/* <button >Back</button> */}
              <EducationList
                itemEdit={true}
                edit={true}
                details={true}
                onAddNavigate={`/profile/${id}/details/education/add`}
              ></EducationList>
            </>
          }
        />
        <Route
          exact
          path='experience/add'
          element={
            <ModalData navigateTo={`/profile/${id}/details/experience`}>
              <AddWork navigateTo={`/profile/${id}/details/experience`} />
            </ModalData>
          }
        />
        <Route
          exact
          path='experience/edit/:experienceId'
          element={
            <ModalData navigateTo={`/profile/${id}/details/experience`}>
              <EditWork navigateTo={`/profile/${id}/details/experience`} />
            </ModalData>
          }
        />
        <Route
          exact
          path='experience/'
          element={
            <>
              <ViewAllButton onClick={(e) => navigate(`/profile/${id}`)}>
                Back
              </ViewAllButton>
              <ExperienceList
                itemEdit={true}
                edit={true}
                details={true}
                onAddNavigate={`/profile/${id}/details/experience/add`}
              ></ExperienceList>
            </>
          }
        />

        <Route
          path='portfolio/*'
          element={
            <>
              <ViewAllButton onClick={(e) => navigate(`/profile/${id}`)}>
                Back
              </ViewAllButton>
              <PortfolioList
                details={true}
                onAddNavigate={`/profile/${id}/details/portfolio/add`}
              ></PortfolioList>
            </>
          }
        />
      </Routes>
    </Container>
  );
}
const ViewAllButton = styled.button`
  background-image: linear-gradient(135deg, #04d78c, #3f464e);
  border-radius: 10px;
  outline: none;
  border: none;
  width: 125px;
  font-size: clamp(14px, 1.5vw, 16px);
  font-family: 'Roboto Medium', sans-serif;
  padding: 10px;
  color: #f4f1f0;
  margin-top: 10px;
  /* float: right; */
`;

export default ProfileDetailEditContainer;
