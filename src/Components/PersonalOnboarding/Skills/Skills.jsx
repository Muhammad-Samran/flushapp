import React, { useEffect, useState } from "react";
import AxiosConfig from "../../../Services/AxiosConfig";
import { Link, useNavigate } from "react-router-dom";

import SkillsUI from "../../global/PersonalProfile/Skills/Skills";
function Skills({ navigateTo }) {
  const navigate = useNavigate();
  const [skillsList, setSkillsList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const res = await AxiosConfig.get("pre/services/");
        // console.log(res.data);
        if (!res.data.data) throw new Error("Invalid Response");
        let tempData = res.data.data.services.map((item) => ({
          service_id: item.PreService_id,
          service_title: item.Service_name,
          skill_level: "expert",
        }));
        setSkillsList(tempData);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);
  const onSubmit = async (values, setSubmitting) => {
    try {
      setSubmitting(true);
      setIsError(false);
      setIsSucces(false);
      const res = await AxiosConfig.post(
        "user/skillset/service/view/",
        values.skills
      );

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
    <div>
      <SkillsUI
        navigateTo={navigateTo}
        skillsList={skillsList}
        isSuccess={isSuccess}
        isError={isError}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Skills;
