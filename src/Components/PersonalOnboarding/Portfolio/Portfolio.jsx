import React, { useState } from 'react';
import { convertToHTML } from 'draft-convert';
import AxiosConfig from '../../../Services/AxiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import PortfolioUI from '../../global/PersonalProfile/Portfolio/Portfolio';
function Education({ navigateTo }) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const onSubmit = async (values, setSubmitting) => {
    //   console.log(values);
    const temp = {
      ...values,
      // portfolio_details: convertToHTML(
      //   values.portfolio_details.getCurrentContent()
      // ),
      belongs_to_business: '',
    };
    try {
      setSubmitting(true);
      setIsError(false);
      setIsSucces(false);
      const response = await AxiosConfig.post('portfolio/add/details/', [temp]);
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
      <PortfolioUI navigateTo={navigateTo} onSubmit={onSubmit} />
    </div>
  );
}

export default Education;
