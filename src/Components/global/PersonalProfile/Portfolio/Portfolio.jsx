import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field, FieldArray } from "formik";
import { InputGroup } from "react-bootstrap";
import FileUpload from "../../Dropzone/Dropzone";
import { convertToHTML } from "draft-convert";
import * as Yup from "yup";
import AxiosConfig from "../../../../Services/AxiosConfig";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw } from "draft-js";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Alert } from "react-bootstrap";
function Portfolio({
  navigateTo,
  onSubmit,
  isSuccess,
  isError,
  formData = {
    portfolio_label: "",
    portfolio_details: "",
    portfolio_media_url: [],
  },
}) {
  const portfolioSchema = Yup.object().shape({
    portfolio: Yup.array().of(
      Yup.object().shape({
        portfolio_label: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        portfolio_media_url: Yup.array().length(1, "Required"),
      })
    ),
  });

  return (
    <div id="wordExperience">
      <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
        Portfolio
      </h1>
      <Formik
        validationSchema={portfolioSchema}
        initialValues={formData}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
          //   }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor={`portfolio_label`} className="mb-1">
                Title
              </label>
              <InputGroup className="inputField4">
                <Field
                  placeholder="Title"
                  id={`portfolio_label`}
                  name={`portfolio_label`}
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12">
                <ErrorMessage name={`portfolio_label`} />
              </p>
            </div>
            {/* Portfolio Description */}
            <div>
              <label className="mb-1" htmlFor="description">
                Description
              </label>
              <InputGroup className="inputField4">
                <Field
                  as="textarea"
                  id={`description`}
                  name="portfolio_details"
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              {/* <Editor
                toolbar={{
                  options: ["inline", "list", "textAlign", "link"],
                }}
                editorState={values.portfolio_details}
                toolbarClassName="portfolioDescriptionToolbar"
                wrapperClassName="portfolioDescriptionWrapper"
                editorClassName="portfolioDescriptionEditor"
                onEditorStateChange={(e) =>
                  setFieldValue(`portfolio_details`, e)
                }
              /> */}
            </div>
            {/* Upload Portfolio Image */}
            <div className="mt-3">
              <label className="mb-1">Upload Media</label>
              <div>
                <FileUpload
                  onUpload={(data) => {
                    setFieldValue(`portfolio_media_url`, [
                      ...values.portfolio_media_url,
                      data,
                    ]);
                  }}
                  onRemove={(file) => {
                    setFieldValue(
                      `portfolio_media_url]`,
                      values.portfolio_media_url.filter(
                        (item) => item.name !== file.name
                      )
                    );
                  }}
                />
              </div>
              <p className="text-danger fs-12">
                <ErrorMessage name={`portfolio_media_url`} />
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Portfolio;
