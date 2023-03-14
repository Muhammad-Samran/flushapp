import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { InputGroup } from "react-bootstrap";
import FileUpload from "../../global/Dropzone/Dropzone";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Alert } from "react-bootstrap";
import { SelectField } from "../../global/SelectField/SelectField";
import SelectTimings from "../../UI/SelectTimings/SelectTimings";
import ImageCard from "src/Components/UI/Cards/ImageCard/ImageCard";
function EditPortfolio({
  values,
  navigateTo,
  onSubmit,
  isSuccess,
  isError,
  skip,
  setFieldValue,
  isSubmitting,
  edit = false,
}) {
  return (
    <div id="editportfolio">
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
        <label className="mb-1" htmlFor="portfolio_details">
          Description
        </label>
        <InputGroup className="inputField4">
          <Field
            as="textarea"
            id={`portfolio_details`}
            name="portfolio_details"
            className="inputTransparent flex p-2"
          />
        </InputGroup>
        <p className="text-danger fs-12">
          <ErrorMessage name={`portfolio_details`} />
        </p>
      </div>
      {/* Image Gallery */}
      <div>
        <label className="mb-1" htmlFor="image_gallery">
          Gallery
        </label>
        <div>
          {values.portfolio_media_url && values.portfolio_media_url.length > 0
            ? values.portfolio_media_url.map((item, index) => (
                <>
                  <ImageCard
                    key={item.name}
                    name={item.name}
                    src={item.media_file}
                    onDelete={(name) => {
                      setFieldValue(
                        `portfolio_media_url`,
                        values.portfolio_media_url.filter(
                          (item) => item.name !== name
                        )
                      );
                    }}
                  />
                </>
              ))
            : null}
        </div>
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
                `portfolio_media_url`,
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

      <div className="d-flex justify-content-center mt-2 align-items-center mt-5">
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
    </div>
  );
}

export default EditPortfolio;
