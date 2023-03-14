import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosConfig from "../../../Services/AxiosConfig";
import EducationUI from "../../global/PersonalProfile/Education/Education";
import { getEducationById } from "../../../Services/PersonalProfile/getProfileData";
function Education({ navigateTo }) {
  const navigate = useNavigate();
  const { educationId } = useParams();
  const [education, setEducation] = useState({
    graduated_in: "",
    enrolled_in: "",
    title: "",
    institute: "",
    status: "completed",
    file_urls: [],
  });
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  // const formData = {
  //   graduated_in: "",
  //   enrolled_in: "",
  //   title: "",
  //   institute: "",
  //   status: "completed",
  //   file_urls: [],
  // };
  useEffect(() => {
    try {
      (async function () {
        const res = await getEducationById(educationId);
        if (res instanceof Error) throw new Error(res.message);
        setEducation(res.data[0]);
        // console.log(res);
      })();
    } catch (error) {
      // console.log(error);
    }
  }, []);
  const onSubmit = async (values, setSubmitting) => {
    try {
      setSubmitting(true);
      setIsError(false);
      setIsSucces(false);
      const res = await AxiosConfig.put(
        "user/update/educational/background/view/",
        {
          ...values,
          is_education: true,
          is_certificate: false,
        }
      );
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
    <div id="wordExperience">
      <EducationUI
        navigateTo={navigateTo}
        onSubmit={onSubmit}
        formData={education}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
}

export default Education;
