import React, { useState, useEffect } from 'react';
import PersonalProfileView from './PersonalProfileView';
import { Modal, Button } from 'react-bootstrap';
import EditBio from '../../Components/PersonalProfile/EditBio/EditBio';
import AddWork from '../../Components/PersonalProfile/AddWork/AddWork';
import AddEducation from '../../Components/PersonalProfile/AddEducation/AddEducation';
import AddPortfolio from '../../Components/PersonalProfile/AddPortfolio/AddPortfolio';
import EditSkills from '../../Components/PersonalProfile/EditSkills/EditSkills';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import axios from '../../Services/AxiosConfig';
import { useSelector } from 'react-redux';
import Layout from '../../Components/global/Dashboard/Layouts/Layout';
import ProfileDetailEditContainer from '../../Components/PersonalProfile/ProfileDetailEditContainer/ProfileDetailEditContainer';
function PersonalProfileRouter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizing, isAuthorized, userId } = useSelector(
    (state) => state.auth
  );
  if (authorizing) {
    return (
      <div className='d-flex justify-content-center'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'></span>
        </div>
      </div>
    );
  }
  const currentRoute = `/profile/${id}`;

  const ModalData = (props) => {
    return (
      <Modal
        show={true}
        onHide={(e) => navigate(currentRoute)}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Body>
          <div className='px-5 py-5'>{props.children}</div>
        </Modal.Body>
      </Modal>
    );
  };
  if (isAuthorized === false) {
    navigate('/login');
  }
  return (
    <Layout type='plain'>
      <Routes>
        <Route
          path='/'
          element={<PersonalProfileView edit={id === userId ? true : false} />}
        />
        <Route
          path='/editBio'
          element={
            <PersonalProfileView>
              {
                <ModalData>
                  <EditBio />
                </ModalData>
              }
            </PersonalProfileView>
          }
        />
        <Route
          path='/addWork'
          element={
            <PersonalProfileView>
              {
                <ModalData>
                  <AddWork navigateTo={currentRoute} />
                </ModalData>
              }
            </PersonalProfileView>
          }
        />
        <Route
          path='/addEducation'
          element={
            <PersonalProfileView>
              {
                <ModalData>
                  <AddEducation navigateTo={currentRoute} />
                </ModalData>
              }
            </PersonalProfileView>
          }
        />

        <Route
          path='/addPortfolio'
          element={
            <PersonalProfileView>
              {
                <ModalData>
                  <AddPortfolio navigateTo={currentRoute} />
                </ModalData>
              }
            </PersonalProfileView>
          }
        />
        <Route
          path='/editSkills'
          element={
            <PersonalProfileView>
              {
                <ModalData>
                  <EditSkills navigateTo={currentRoute} />
                </ModalData>
              }
            </PersonalProfileView>
          }
        />
        <Route
          path='/details/*'
          element={
            <ProfileDetailEditContainer itemEdit={true}>
              {/* {
                <ModalData>
                  <EditSkills navigateTo={currentRoute} />
                </ModalData>
              } */}
            </ProfileDetailEditContainer>
          }
        />
      </Routes>
    </Layout>
  );
}

export default PersonalProfileRouter;
