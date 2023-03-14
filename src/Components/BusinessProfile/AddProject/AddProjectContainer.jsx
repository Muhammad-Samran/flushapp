import React, { useState } from "react";
import { convertToHTML } from "draft-convert";
import AxiosConfig from "../../../Services/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import AddProjectUI from "./AddProjectUI";
function AddProject({ navigateTo }) {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const onSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    setIsError(false);
    setIsSucces(false);
    // console.log(values);
    const temp = {
      ...values,
      business_id: businessId,
    };
    try {
      const response = await AxiosConfig.post("business/project/", temp);
      // console.log(response);
      setSubmitting(false);
      setIsSucces(true);
      setIsError(false);
    } catch (error) {
      // console.log(error);
      setIsError(true);
      setIsSucces(false);
      setSubmitting(false);
    }
  };
  return (
    <div id="wordExperience">
      <AddProjectUI
        navigateTo={navigateTo}
        onSubmit={onSubmit}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
}

export default AddProject;
