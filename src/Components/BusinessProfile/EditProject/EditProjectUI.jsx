import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field, FieldArray } from "formik";
import { InputGroup } from "react-bootstrap";
import FileUpload from "../../global/Dropzone/Dropzone";
import { convertToHTML } from "draft-convert";
import * as Yup from "yup";
import AxiosConfig from "../../../Services/AxiosConfig";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw } from "draft-js";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Alert } from "react-bootstrap";
import { SelectField } from "../../global/SelectField/SelectField";
import { Row, Col } from "react-bootstrap";
import ImageCard from "src/Components/UI/Cards/ImageCard/ImageCard";
function Portfolio({
  navigateTo,
  onSubmit,
  isSuccess,
  isError,
  skip,
  formData,
}) {
  const portfolioSchema = Yup.object().shape({
    portfolio: Yup.array().of(
      Yup.object().shape({
        project_title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        project_photo: Yup.array().min(1, "Required"),
      })
    ),
  });

  return (
    <div id="wordExperience">
      <Formik
        validationSchema={portfolioSchema}
        enableReinitialize
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
          //   }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor={`project_title`} className="mb-1">
                Title
              </label>
              <InputGroup className="inputField4">
                <Field
                  placeholder="Title"
                  id={`project_title`}
                  name={`project_title`}
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12">
                <ErrorMessage name={`project_title`} />
              </p>
            </div>
            {/* Project Budget & Project Status */}
            <Row>
              <Col>
                <div>
                  <label htmlFor={`status`} className="mb-1">
                    Project Status
                  </label>

                  <Field
                    id={`status`}
                    name={`project_status`}
                    placeholder={"Select Project Status"}
                    component={SelectField}
                    options={[
                      {
                        value: "completed",
                        label: "completed",
                      },
                    ]}
                  />
                  <p className="text-danger fs-12">
                    <ErrorMessage name={`project_status`} />
                  </p>
                </div>
              </Col>
              <Col>
                <label htmlFor={`project_budget`} className="mb-1">
                  Price
                </label>
                <InputGroup className="inputField4">
                  <Field
                    type="number"
                    placeholder="Budget"
                    id={`project_budget`}
                    name={`project_budget`}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12">
                  <ErrorMessage name={`project_budget`} />
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor={`project_location`} className="mb-1">
                  Location
                </label>
                <InputGroup className="inputField4">
                  <Field
                    placeholder="Location"
                    id={`project_location`}
                    name={`project_location`}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12">
                  <ErrorMessage name={`project_location`} />
                </p>
              </Col>
              <Col>
                <label htmlFor={`completion_date`} className="mb-1">
                  Start Date
                </label>
                <InputGroup className="inputField4">
                  <Field
                    type="date"
                    id={`completion_date`}
                    name={`completion_date`}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12">
                  <ErrorMessage name={`completion_date`} />
                </p>
              </Col>
            </Row>
            {/* P */}
            {/* Project Description */}
            <div>
              <label className="mb-1" htmlFor="project_description">
                Description
              </label>
              <InputGroup className="inputField4">
                <Field
                  as="textarea"
                  id={`project_description`}
                  name="project_description"
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
            </div>
            {/* Image Gallery */}
            {values.project_photo && values.project_photo.length > 0 ? (
              <div>
                <label className="mb-1" htmlFor="image_gallery">
                  Gallery
                </label>
                <div>
                  {values.project_photo.map((item, index) => (
                    <>
                      <ImageCard
                        key={item.name}
                        name={item.name}
                        src={item.media_file}
                        onDelete={(name) => {
                          setFieldValue(
                            `project_photo`,
                            values.project_photo.filter(
                              (item) => item.name !== name
                            )
                          );
                        }}
                      />
                    </>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Upload Projet Image */}
            <div className="mt-3">
              <label className="mb-1">Upload Media</label>
              <div>
                <FileUpload
                  onUpload={(data) => {
                    setFieldValue(`project_photo`, [
                      ...values.project_photo,
                      data,
                    ]);
                  }}
                  onRemove={(file) => {
                    setFieldValue(
                      `project_photo`,
                      values.project_photo.filter(
                        (item) => item.name !== file.name
                      )
                    );
                  }}
                />
              </div>
              <p className="text-danger fs-12">
                <ErrorMessage name={`project_photo`} />
              </p>
            </div>

            <div className="d-flex justify-content-center mt-2 align-items-center">
              <button
                className="btn-green2 w-auto text-white px-4 mb-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="me-2">
                    <Spinner
                      as="span"
                      variant="light"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      animation="border"
                    />
                  </span>
                )}
                <span>Save</span>
              </button>
            </div>
            {isSuccess && <Alert variant="success">Success</Alert>}
            {isError && <Alert variant="danger">Something went wrong!</Alert>}
            {skip && (
              <Link to={navigateTo}>
                <p
                  className="primary-color "
                  style={{
                    float: "right",
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                >
                  <span className="me-2">Skip For Now</span>

                  <FontAwesomeIcon icon={faArrowRightLong} />
                </p>
              </Link>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Portfolio;
