import React, { useState , useRef} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { SelectField } from "../../Components/global/SelectField/SelectField";
import Layout from "../../Components/global/Dashboard/Layouts/Layout";
import { useLocation } from "react-router-dom";
import AxiosConfig from "../../Services/AxiosConfig";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "src/Components/UI/Loader/Loader";

const options = [
  { value: "Online", label: "Online" },
  { value: "Onsite", label: "Onsite" },
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
];

function EditJobPage(props) {
  let btnRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const business_id = useSelector(
    (state) => state.auth?.userDetail?.business_list?.[0]?.business_profile_id
  );


  const JobId = location.state.item.job_post_id;
  const CategoryId = location.state.item.job_category_id_id;
  const All = location.state.item

  const handleSubmit = async (values, setSubmitting) => {
    // console.log("All values", All);
    // console.log("setSubmitting", setSubmitting);
    try {

      if(btnRef.current){
        btnRef.current.disabled = true;
      }
      setTimeout(function(){
        <Loader/>
      }, 2000);

      setSubmitting(true);

      const payload = {
        job_title: values.title,
        business_id: business_id,
        job_description: values.description,
        job_employment_type: values.status,
        job_category_id: CategoryId,
        salary_type: "personal",
        search_keywords: ["javascript", "react"],
        experience: values.experience,
        salary_offer: values.salary,
        work_location: values.location,
        responsibility: values.responsibilities,
        qualification_required: values.qualification,
        full_address: {
          value: values.location,
          address: values.location,
          coordinates: {
            lat: 31.4165316,
            lng: 74.2299196,
          },
        },
        media_file: "file url",
      };

      const { data } = await AxiosConfig.put(
        "job/post/service/?job_id=" + JobId,
        payload
      );
      // console.log(data.message);

      setSubmitting(false);
      showToast(data.success);
      setTimeout(function(){
        navigate('/jobs-position')
      }, 2000);
      

    } catch (error) {
      // console.log(error);
      showToast(false);
      if(btnRef.current){
        btnRef.current.disabled = false;
      }
    }
  };

  const showToast = (success) => {
    toast.dismiss();
    if (success) {
      toast.success("Job Edited Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error("Error! Job Edit Failed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <Layout type="plain">
        <Container className="py-5" style={{ maxWidth: "701px" }}>
          <Formik
            initialValues={{
              salary: All.salary_offer,
              location: All.work_location,
              status: All.job_employment_type,
              title: All.job_title,
              experience: All.experience,
              description: All.job_description,
              responsibilities: All.responsibility,
              qualification: All.qualification_required,
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
            validate={(values) => {
              const errors = {};

              if (!values.salary) {
                errors.salary = "*Required";
              }
              if (!values.location) {
                errors.location = "*Valid location Required";
              }
              if (!values.status) {
                errors.status = "*Required";
              }
              if (!values.title) {
                errors.title = "*Required";
              }
              if (!values.experience) {
                errors.experience = "*Required";
              }
              if (!values.description) {
                errors.description = "*Required";
              }
              if (!values.responsibilities) {
                errors.responsibilities = "*Required";
              }
              if (!values.qualification) {
                errors.qualification = "*Required";
              }

              return errors;
            }}
          >
            {({ handleChange, handleBlur, values }) => (
              <Form>
                <div className="form-headline">
                  <span>Cal Pack Moving & Storage Services</span>
                </div>
                <div className="form-body">
                  <Row className="row-1">
                    <Col className="flex-column" lg={6}>
                      <label className="label">Job Title</label>
                      <input
                        name="title"
                        className="fields-contact"
                        type="text"
                        placeholder="Enter Title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                      <div className="error">
                        <ErrorMessage name="title" />
                      </div>
                    </Col>
                    <Col className="flex-column" lg={6}>
                      <label className="label">Salary Range</label>
                      <input
                        name="salary"
                        className="fields-contact"
                        type="text"
                        placeholder="1k - 10k"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.salary}
                      />
                      <div className="error">
                        <ErrorMessage name="salary" />
                      </div>
                    </Col>
                  </Row>

                  <Row className="row-1">
                    <Col className="flex-column" lg={6}>
                      <label className="label">Job Status</label>
                      <Field
                        component={SelectField}
                        name="status"
                        options={options}
                        className="fields-contact"
                        placeholder="Select Job Status"
                      />
                      <div className="error">
                        <ErrorMessage name="status" />
                      </div>
                    </Col>
                    <Col className="flex-column" lg={6}>
                      <label className="label">Experience</label>
                      <input
                        name="experience"
                        className="fields-contact"
                        type="text"
                        placeholder="Enter Title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.experience}
                      />
                      <div className="error">
                        <ErrorMessage name="experience" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="flex-column">
                      <label className="label">Location</label>
                      <input
                        name="location"
                        className="fields-contact"
                        type="text"
                        placeholder="Enter company location"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.location}
                      />

                      <div className="error">
                        <ErrorMessage name="location" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="flex-column">
                      <label className="label">Job Description</label>
                      <textarea
                        name="description"
                        className="form-textarea"
                        type="textarea"
                        placeholder="Write something about yourself"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                      <div className="error">
                        <ErrorMessage name="description" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="flex-column">
                      <label className="label">Responsibilities</label>
                      <textarea
                        name="responsibilities"
                        className="form-textarea"
                        type="textarea"
                        placeholder="Write about responsibilities"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.responsibilities}
                      />
                      <div className="error">
                        <ErrorMessage name="responsibilities" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="flex-column">
                      <label className="label">Qualification</label>
                      <textarea
                        name="qualification"
                        className="form-textarea"
                        type="textarea"
                        placeholder="Write  job qualification"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.qualification}
                      />
                      <div className="error">
                        <ErrorMessage name="qualification" />
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="form-footer">
                  <div></div>
                  <div className="form-submit-button">
                    <button ref={btnRef} className="form-btn" type="submit">
                      <span>Edit Job</span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <ToastContainer />
        </Container>
      </Layout>
    </>
  );
}

export default EditJobPage;
