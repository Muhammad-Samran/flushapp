import React, { useEffect, useState } from "react";
import AxiosConfig from "../../../Services/AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { getUserSkills } from "../../../Services/PersonalProfile/getProfileData";
import SkillsUI from "../../global/PersonalProfile/Skills/Skills";
import { useSelector } from "react-redux";
function Skills({ navigateTo }) {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const res = await AxiosConfig.get("pre/skillset/");
        // console.log(res.data);
        if (!res.data.data) throw new Error("Invalid Response");
        let tempData = res.data.data.map((item) => ({
          ...item,

          service_title: item.skill_label,
          skill_level: "expert",
        }));
        // console.log(tempData);
        setSkillsList(tempData);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async function () {
      try {
        const response = await getUserSkills(userId);
        if (response instanceof Error) throw new Error("Invalid Response");
        const arr = response.data;
        const data = arr.map((item) => ({
          ...item,
          service_title: item.skill_label,
        }));
        setSelectedSkills(data);
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
        selectedSkills={selectedSkills}
      />
    </div>
  );
}

export default Skills;
