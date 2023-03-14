import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosConfig from '../../../Services/AxiosConfig';
import EducationUI from '../../global/PersonalProfile/Education/Education';
function Education({ navigateTo }) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const formData = {
    graduated_in: '',
    enrolled_in: '',
    title: '',
    institute: '',
    status: 'completed',
    file_urls: [],
  };
  const onSubmit = async (values, setSubmitting) => {
    try {
      setSubmitting(true);
      setIsError(false);
      setIsSucces(false);
      const res = await AxiosConfig.post('user/educational/background/view/', [
        { ...values, is_education: true, is_certificate: false },
      ]);
      // console.log(res);
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
      <EducationUI
        navigateTo={navigateTo}
        onSubmit={onSubmit}
        formData={formData}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
}

export default Education;
