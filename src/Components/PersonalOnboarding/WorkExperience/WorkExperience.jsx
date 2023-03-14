import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field, FieldArray } from 'formik';
import { InputGroup } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { Spinner, Alert } from 'react-bootstrap';
import AxiosConfig from '../../../Services/AxiosConfig';
import WorkExperienceUI from '../../global/PersonalProfile/WorkExperience/WorkExperience';
function WorkExperience({ navigateTo, onboardingData }) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const [formData, setFormData] = useState({
    workHistory: [
      {
        end_date: '',
        start_date: '',
        title: '',
        employment_type: '',
        company_name: '',
        location: '',
        job_description: '',
        is_expired: true,
      },
    ],
  });

  const onSubmit = async (values, setSubmitting) => {
    try {
      setSubmitting(true);
      setIsError(false);
      setIsSucces(false);
      // console.log(values.workHistory[0]);
      const response = await AxiosConfig.post(
        'user/work/details/',
        values.workHistory[0]
      );
      // console.log(response);

      setSubmitting(false);
      setIsSucces(true);
      setIsError(false);
      navigate(navigateTo);
    } catch (error) {
      // console.log(error);
      setIsError(true);
      setIsSucces(false);
      setSubmitting(false);
    }
  };
  return (
    <div id='wordExperience'>
      <WorkExperienceUI
        navigateTo={navigateTo}
        onSubmit={onSubmit}
        formData={formData}
      />
    </div>
  );
}

export default WorkExperience;
