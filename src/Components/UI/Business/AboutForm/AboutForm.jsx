import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import DummyImage from "../../../../Assets/images/personal_profile/default_image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectField } from "../../../global/SelectField/SelectField";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "react-google-autocomplete";
import { Spinner, Alert } from "react-bootstrap";
import styled from "styled-components";
import * as Yup from "yup";
import { Row, Col, InputGroup } from "react-bootstrap";
export default function AboutForm({
  setFieldValue,
  values,
  onBannerChange,
  onLogoChange,
  TempBanner,
  TempLogo,
  SubmitText,
  isSuccess,
  isError,
  isSubmitting,
}) {
  return (
    <div>
      {/* Basic Info Start */}
      <SectionContainer>
        <h4 className="primary-font primary-color fs-22">Basic Info</h4>
        {/* Company Name */}
        <FieldBlock>
          <label htmlFor="business_name">Name*</label>
          <Field
            id="business_name"
            name="business_name"
            type="text"
            className="inputField"
          />
          <ErrorDiv>
            <ErrorMessage name="business_name" />
          </ErrorDiv>
        </FieldBlock>
        {/* Company Email */}
        <FieldBlock>
          <label htmlFor="business_email">Email*</label>
          <Field
            id="business_email"
            name="business_email"
            type="text"
            className="inputField"
          />
          <ErrorDiv>
            <ErrorMessage name="business_email" />
          </ErrorDiv>
        </FieldBlock>
        {/* Company Address */}
        <FieldBlock>
          <label htmlFor="physical_address">Address*</label>
          {/* <Field
            id="physical_address"
            name="physical_address"
            type="text"
            className="inputField"
          /> */}

          <InputGroup className="inputField4">
            <Autocomplete
              className="inputTransparent flex p-2"
              inputAutocompleteValue={values.physical_address}
              apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
              onPlaceSelected={(place) => {
                setFieldValue("physical_address", place);
                // console.log("location", place)
              }}
            />
          </InputGroup>
          <ErrorDiv>
            <ErrorMessage name="physical_address" />
          </ErrorDiv>
        </FieldBlock>
        <FieldBlock>
          <label htmlFor="web_link">Website</label>
          <Field
            name="web_link"
            id="web_link"
            type="text"
            className="inputField"
          />
          <ErrorDiv>
            {" "}
            <ErrorMessage name="web_link" />
          </ErrorDiv>
        </FieldBlock>
      </SectionContainer>
      {/* Basic Info End */}
      {/* Logo and Banner Start */}
      <SectionContainer>
        {" "}
        <h4 className="primary-font primary-color fs-22">Profile Details</h4>
        <div>
          <label htmlFor="logo">Banner*</label>
          <Banner>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onBannerChange(e, setFieldValue)}
            />
            <Placeholder>
              <div
                className="w-100 h-100 d-flex justify-content-center align-items-center"
                style={{ zIndex: -10 }}
              >
                {TempBanner && (
                  <img src={TempBanner} width={100} height={100} alt="ll" />
                )}
                <div className="d-flex align-items-center">
                  <span>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </span>
                  <h5>Choose file</h5>
                </div>
                {/* <img src={TempBanner} width={100} height={100} alt="ll" /> */}
              </div>
            </Placeholder>
          </Banner>
        </div>
        <div className="mt-2">
          <label htmlFor="logo">Logo*</label>
          <Logo>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onLogoChange(e, setFieldValue)}
            />
            <Placeholder image={DummyImage}>
              <div
                className="w-100 h-100 d-flex justify-content-center align-items-center"
                style={{ zIndex: -10 }}
              >
                {TempLogo && (
                  <img src={TempLogo} width={100} height={100} alt="ll" />
                )}

                {/* <img src={TempBanner} width={100} height={100} alt="ll" /> */}
                <div className="d-flex align-items-center">
                  <span>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </span>
                  <h5>Choose</h5>
                </div>
              </div>
            </Placeholder>
          </Logo>
        </div>
        <FieldBlock>
          <label htmlFor="summary">Summary</label>
          <Field
            as="textarea"
            name="summary"
            id="summary"
            type="text"
            className="inputField"
          />
          <ErrorMessage name="summary" />
        </FieldBlock>
      </SectionContainer>
      {/* Logo and Banner End */}

      {/* Company Information Start */}
      <SectionContainer>
        <h4 className="primary-font primary-color fs-22">
          Company Information
        </h4>
        <FieldBlock>
          <div className="d-flex justify-content-between fs-16">
            <div className="secondary-font-medium">
              Are you looking to recruit staff?{" "}
            </div>
            {/* <Field component="div" name="recruitStaff"> */}
            <div className="d-flex flex-nowrap">
              <label className="checkmark-container me-2 d-inline-flex align-items-center">
                <span className="secondary-font-medium fs-18">Yes</span>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFieldValue(
                      "looking_to_recruit",
                      e.target.value === "true" ? true : false
                    )
                  }
                  checked={values.looking_to_recruit === true}
                  name="looking_to_recruit"
                  value={true}
                />
                <span className="checkmark"></span>
              </label>
              <label className="checkmark-container me-2 d-inline-flex align-items-center">
                <span className="secondary-font-medium fs-18">No</span>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFieldValue(
                      "looking_to_recruit",
                      e.target.value === "false" ? false : true
                    )
                  }
                  checked={values.looking_to_recruit === false}
                  name="looking_to_recruit"
                  value={false}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </FieldBlock>

        <FieldBlock>
          <div className="d-flex justify-content-between fs-16">
            <div className="secondary-font-medium">
              Are you looking to provide services through this platform?
            </div>
            {/* <Field component="div" name="recruitStaff"> */}
            <div className="d-flex flex-nowrap">
              <label className="checkmark-container me-2 d-inline-flex align-items-center">
                <span className="secondary-font-medium fs-18">Yes</span>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFieldValue(
                      "looking_to_provide_services",
                      e.target.value === "true" ? true : false
                    )
                  }
                  checked={values.looking_to_provide_services === true}
                  name="looking_to_provide_services"
                  value={true}
                />
                <span className="checkmark"></span>
              </label>
              <label className="checkmark-container me-2 d-inline-flex align-items-center">
                <span className="secondary-font-medium fs-18">No</span>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setFieldValue(
                      "looking_to_provide_services",
                      e.target.value === "false" ? false : true
                    )
                  }
                  checked={values.looking_to_provide_services === false}
                  name="looking_to_provide_services"
                  value={false}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        </FieldBlock>
        <FieldBlock>
          <div className="d-flex justify-content-between fs-16 mb-2">
            <div className="secondary-font-medium">
              How long have you been in Business?
            </div>
            {/* <Field component="div" name="recruitStaff"> */}
          </div>
          <Field
            name={"years_of_experience"}
            component={SelectField}
            options={[
              { value: "0-1", label: "0-1 year" },
              { value: "1-3", label: "1-3 years" },
              { value: "3-5", label: "3-5 years" },
              { value: "5+", label: "5+ years" },
            ]}
          />
          <p className="text-danger fs-12">
            <ErrorMessage name="years_of_experience" />
          </p>
        </FieldBlock>
        <FieldBlock>
          <div className="d-flex justify-content-between fs-16 mb-2">
            <div className="secondary-font-medium">Number of Employees?</div>
            {/* <Field component="div" name="recruitStaff"> */}
          </div>
          <Field
            name={"no_of_employees"}
            component={SelectField}
            options={[
              { value: "0-5", label: "0-5" },
              { value: "5-10", label: "5-10" },
              { value: "10-20", label: "10-20" },
              { value: "20-50", label: "20-50" },
              { value: "50+", label: "50+" },
            ]}
          />
          <p className="text-danger fs-12">
            <ErrorMessage name="no_of_employees" />
          </p>
        </FieldBlock>
      </SectionContainer>
      {/* Company Information End */}
      {/* Social Sart */}
      <SectionContainer>
        <h4 className="primary-font primary-color fs-22">Social Links</h4>
        <Row>
          <Col lg={6}>
            <FieldBlock>
              <label htmlFor="social_facebook">Facebook</label>
              <Field
                id="social_facebook"
                name={`social_media_links.facebook`}
                type="text"
                className="inputField"
              />
            </FieldBlock>
            <p className="text-danger fs-12">
              <ErrorMessage name="social_media_links.facebook" />
            </p>
          </Col>
          <Col lg={6}>
            <FieldBlock>
              <label htmlFor="social_linkedin">Linkedin</label>
              <Field
                id="social_facebook"
                name={`social_media_links.linkedin`}
                type="text"
                className="inputField"
              />
            </FieldBlock>
            <p className="text-danger fs-12">
              <ErrorMessage name="social_media_links.linkedin" />
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FieldBlock>
              <label htmlFor="social_twitter">Twitter</label>
              <Field
                id="social_twitter"
                name={`social_media_links.twitter`}
                type="text"
                className="inputField"
              />
            </FieldBlock>
            <p className="text-danger fs-12">
              <ErrorMessage name="social_media_links.twitter" />
            </p>
          </Col>
          <Col lg={6}>
            <FieldBlock>
              <label htmlFor="social_youtube">Youtube</label>
              <Field
                id="social_youtube"
                name={`social_media_links.youtube`}
                type="text"
                className="inputField"
              />
            </FieldBlock>
            <p className="text-danger fs-12">
              <ErrorMessage name="social_media_links.youtube" />
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FieldBlock>
              <label htmlFor="social_pinterest">Pinterest</label>
              <Field
                id="social_pinterest"
                name={`social_media_links.pinterest`}
                type="text"
                className="inputField"
              />
            </FieldBlock>
            <p className="text-danger fs-12">
              <ErrorMessage name="social_media_links.pinterest" />
            </p>
          </Col>
          <Col lg={6}>
            <FieldBlock>
              <label htmlFor="social_instagram">Instagram</label>
              <Field
                id="social_instagram"
                name={`social_media_links.instagram`}
                type="text"
                className="inputField"
              />
            </FieldBlock>
            <p className="text-danger fs-12">
              <ErrorMessage name="social_media_links.instagram" />
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <FieldBlock>
              <label htmlFor="social_snapchat">Snapchat</label>
              <Field
                id="social_snapchat"
                name={`social_media_links.snapchat`}
                type="text"
                className="inputField"
              />
            </FieldBlock>
            <p className="text-danger fs-12">
              <ErrorMessage name="social_media_links.snapchat" />
            </p>
          </Col>
          <Col lg={6}>
            <FieldBlock>
              <label htmlFor="social_tiktok">Tiktok</label>
              <Field
                id="social_tiktok"
                name={`social_media_links.tiktok`}
                type="text"
                className="inputField"
              />
            </FieldBlock>
            <p className="text-danger fs-12">
              <ErrorMessage name="social_media_links.tiktok" />
            </p>
          </Col>
        </Row>
      </SectionContainer>
      {/* Social End */}
      <div>
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
          <span>{SubmitText}</span>
        </button>
      </div>
      {isSuccess && <Alert variant="success">Success</Alert>}
      {isError && <Alert variant="danger">Something went wrong!</Alert>}
    </div>
  );
}
const ErrorDiv = styled.div`
  font-size: clamp(11px, 0.8vw, 12px) !important;
  color: #e70e0e;
`;
const Placeholder = styled.div`
  position: relative;
  background-image: ${(props) => `url(${props.image})`};
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: rgba(0, 0, 0, 0.6);
  h5 {
    font-size: clamp(14px, 0.8vw, 16px) !important;
    color: rgba(0, 0, 0, 0.6);
    margin: 0 0 0 5px;
  }
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4;
  /* background-color: gray; */
  border-radius: 5px;
  border: 2px dashed #e6e6e6;
  cursor: pointer;
  img {
    height: 100%;
    position: absolute;
    object-fit: cover;
    width: 100%;
    cursor: pointer;
  }
  input {
    z-index: 1000;
  }
`;
const Logo = styled.div`
  position: relative;
  width: 100px;
  aspect-ratio: 1;
  /* background-color: gray; */
  border-radius: 5px;
  border: 2px dashed #e6e6e6;
  cursor: pointer;
  img {
    height: 100%;
    position: absolute;
    object-fit: cover;
    width: 100%;
    cursor: pointer;
  }
  input {
    z-index: 1000;
  }
`;
const SectionContainer = styled.div`
  border: 2px solid #cccccc;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 30px;
  label {
    font-size: clamp(12px, 1.2vw, 14px);
    margin-bottom: 0.3rem;
  }
  .inputField {
    background: #ffffff;
    border: 2px solid #cccccc;
    box-sizing: border-box;
    border-radius: 6px;
    overflow: hidden;
    width: 100%;
    padding: 0.5rem;
    &:focus {
      outline: none;
      border: 2px solid var(--primary-color);
    }
  }
`;
const FieldBlock = styled.div`
  margin: 0 0 10px;
`;
