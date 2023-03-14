import React, { useState, useEffect } from "react";
import { convertToHTML } from "draft-convert";
import AxiosConfig from "../../../Services/AxiosConfig";
import { useNavigate, Link, useParams } from "react-router-dom";
import EditProjectUi from "./EditProjectUI";
import { deleteProject } from "src/Services/Business/getBusiness";
import { DeleteBtn, HeadingFlex } from "../../../Styles";
import useData from "src/Hook/useData";
function EditProject({ navigateTo, projectId, setEditModal }) {
  // console.log(projectId);
  const { id, businessId } = useParams();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const [ProjectData, setProjectData] = useState({
    project_title: "",
    project_description: "",
    project_budget: null,
    project_status: "",
    project_photo: "",
    project_location: "",
    completion_date: "",
  });
  const [loading, data, error, refreshData] = useData(
    `business/single/project/?p_id=${projectId}`
  );
  useEffect(() => {
    if (data.data) {
      // console.log(data.data);
      setProjectData(data.data);
    }
  }, [data]);

  const onSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    setIsError(false);
    setIsSucces(false);

    try {
      const response = await AxiosConfig.put(
        `business/project/?p_id=${projectId}&business_id=${businessId}`,
        values
      );
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
  // if (loading)
  //   return (
  //     <div className="d-flex justify-content-center">
  //       <div className="spinner-border" role="status">
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   );

  return (
    <div>
      <HeadingFlex>
        <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
          Edit Project
        </h1>

        <DeleteBtn
          type="button"
          onClick={async () => {
            if (
              window.confirm("Are you sure you want to delete this project?")
            ) {
              // console.log("Deleting project=>", projectId);
              await deleteProject(projectId);
              setEditModal(false);
            } else {
              // console.log("No");
            }
          }}
        >
          Delete Project
        </DeleteBtn>
      </HeadingFlex>
      <EditProjectUi
        formData={ProjectData}
        navigateTo={navigateTo}
        onSubmit={onSubmit}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
}

export default EditProject;
