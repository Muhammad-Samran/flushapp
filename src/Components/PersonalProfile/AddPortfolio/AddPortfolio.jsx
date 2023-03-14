import React, { useState } from "react";
import { convertToHTML } from "draft-convert";
import AxiosConfig from "../../../Services/AxiosConfig";
import { useNavigate, Link } from "react-router-dom";
import PortfolioUI from "../../global/PersonalProfile/Portfolio/Portfolio";
function Education({ navigateTo }) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const onSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    setIsError(false);
    setIsSucces(false);
      // console.log(values);
    const temp = {
      ...values,
      belongs_to_business: "",
    };
    try {
      const response = await AxiosConfig.post("portfolio/add/details/", [temp]);
      // console.log(response);
      setSubmitting(false);
      setIsSucces(true);
      setIsError(false);
      if (navigateTo) {
        navigate(navigateTo);
      }
    } catch (error) {
      // console.log(error);
      setIsError(true);
      setIsSucces(false);
      setSubmitting(false);
    }
  };
  return (
    <div id="wordExperience">
      <PortfolioUI
        navigateTo={navigateTo}
        onSubmit={onSubmit}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
}

export default Education;
