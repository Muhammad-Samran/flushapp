import React from "react";
import { H1 } from "../../../Styles";
import { Row, Col, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import { SelectField } from "../../global/SelectField/SelectField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function BookService({ isSubmitting, isSuccess, isError, handleSubmit }) {
  return (
    <>
      <form handleSubmit={handleSubmit}>
        <H1>{`Feel Free to Contact for Booking Service`.toUpperCase()}</H1>

        <Row>
          <Col lg={6}>
            {/* Title */}
            <div>
              <label className="mb-1">Title</label>
              <InputGroup className="inputField4">
                <Field
                  placeholder="Enter Name"
                  name="name"
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12">
                <ErrorMessage name="name" />
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div>
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <InputGroup className="inputField4">
                <Field
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12">
                <ErrorMessage name="email" />
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <div>
              <label htmlFor="phone" className="mb-1">
                Email
              </label>
              <InputGroup className="inputField4">
                <Field
                  placeholder="Enter Phone"
                  id="phone"
                  name="phone"
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12">
                <ErrorMessage name="phone" />
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div>
              <label htmlFor="bookingType" className="mb-1">
                Booking Type
              </label>

              <Field
                id="bookingType"
                name="bookingType"
                placeholder={"Select Booking type"}
                component={SelectField}
                options={[
                  { value: "full-time", label: "FullTime" },
                  { value: "part-time", label: "Part Time" },
                  { value: "internship", label: "Internship" },
                  { value: "contract", label: "Contract" },
                  { value: "freelance", label: "Freelance" },
                  { value: "other", label: "Other" },
                ]}
              />
              <p className="text-danger fs-12">
                <ErrorMessage name="bookingType" />
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <div className="flex">
              <label htmlFor="bookingDate" className="mb-1">
                Booking Date
              </label>
              <InputGroup className="inputField4">
                <Field
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12">
                <ErrorMessage name={"bookingDate"} />
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div>
              <label htmlFor="Budget" className="mb-1">
                Budget
              </label>

              <Field
                id="budget"
                name="budget"
                placeholder={"Select Budget"}
                component={SelectField}
                options={[
                  { value: "full-time", label: "FullTime" },
                  { value: "part-time", label: "Part Time" },
                  { value: "internship", label: "Internship" },
                  { value: "contract", label: "Contract" },
                  { value: "freelance", label: "Freelance" },
                  { value: "other", label: "Other" },
                ]}
              />
              <p className="text-danger fs-12">
                <ErrorMessage name="budget" />
              </p>
            </div>
          </Col>
        </Row>
        <div>
          <label htmlFor={`description`} className="mb-1">
            Description
          </label>
          <InputGroup className="inputField4">
            <Field
              as="textarea"
              placeholder="Write Description"
              id="description"
              name="description"
              className="inputTransparent flex p-2"
            />
          </InputGroup>
          <p className="text-danger fs-12">
            <ErrorMessage name="description" />
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
      </form>
      {isSuccess && <Alert variant="success">Success</Alert>}
      {isError && <Alert variant="danger">Something went wrong!</Alert>}
    </>
  );
}

export default BookService;
