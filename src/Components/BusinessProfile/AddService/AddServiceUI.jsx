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
function AddServiceUI({
  values,
  navigateTo,
  onSubmit,
  isSuccess,
  isError,
  skip,
  setFieldValue,
  isSubmitting,
  categoryOptions,
  startTime,
  endTime,
  edit = false,
}) {
  return (
    <div id="addService">
      <div>
        <label htmlFor={`service_title`} className="mb-1">
          Title
        </label>

        <InputGroup className="inputField4">
          <Field
            placeholder="Title"
            id={`service_title`}
            name={`service_title`}
            className="inputTransparent flex p-2"
          />
        </InputGroup>
        <p className="text-danger fs-12">
          <ErrorMessage name={`service_title`} />
        </p>
      </div>
      {/* Service Category */}
      <div>
        <label htmlFor={`category`} className="mb-1">
          Category
        </label>

        <Field
          id={`category`}
          name={`service_category_id`}
          placeholder={"Select Service Category"}
          component={SelectField}
          options={categoryOptions}
        />
        <p className="text-danger fs-12">
          <ErrorMessage name={`service_category_id`} />
        </p>
      </div>
      {/* Service Description */}
      <div>
        <label className="mb-1" htmlFor="service_description">
          Description
        </label>
        <InputGroup className="inputField4">
          <Field
            as="textarea"
            id={`service_description`}
            name="service_description"
            className="inputTransparent flex p-2"
          />
        </InputGroup>
        <p className="text-danger fs-12">
          <ErrorMessage name={`service_description`} />
        </p>
      </div>
      <div>
        <label htmlFor={`service_price`} className="mb-1">
          Price
        </label>
        <InputGroup className="inputField4">
          <Field
            type="number"
            placeholder="Price"
            id={`service_price`}
            name={`service_price`}
            className="inputTransparent flex p-2"
          />
        </InputGroup>
        <p className="text-danger fs-12">
          <ErrorMessage name={`service_price`} />
        </p>
      </div>
      {/* Image Gallery */}

      {values.service_image && values.service_image.length > 0 ? (
        <>
          {" "}
          <label className="mb-1" htmlFor="image_gallery">
            Gallery
          </label>
          <div>
            {values.service_image.map((item, index) => (
              <>
                <ImageCard
                  key={item.name}
                  name={item.name}
                  src={item.media_file}
                  onDelete={(name) => {
                    setFieldValue(
                      `service_image`,
                      values.service_image.filter((item) => item.name !== name)
                    );
                  }}
                />
              </>
            ))}
          </div>
        </>
      ) : null}

      {/* Upload Portfolio Image */}
      <div className="mt-3">
        <label className="mb-1">Upload Media</label>
        <div>
          <FileUpload
            onUpload={(data) => {
              setFieldValue(`service_image`, [...values.service_image, data]);
            }}
            onRemove={(file) => {
              setFieldValue(
                `service_image`,
                values.service_image.filter((item) => item.name !== file.name)
              );
            }}
          />
        </div>
        <p className="text-danger fs-12">
          <ErrorMessage name={`service_image`} />
        </p>
      </div>
      <p className="mb-1  heading-font f-bold fs-24 navLink">Add Timings</p>
      {/* Service Timings */}
      <SelectTimings
        field="service_timings"
        setFieldValue={setFieldValue}
        values={values}
        startTime={startTime}
        endTime={endTime}
      />
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

export default AddServiceUI;
