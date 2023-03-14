import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputGroup } from "react-bootstrap";
import { Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormGroup } from "react-bootstrap";
import DummyImage from "../../../../Assets/images/personal_profile/default_image.png";
import styled from "styled-components";
import * as Yup from "yup";
import Profile from "react-facebook/dist/Profile";
import axiosApiInstance from "src/Services/AxiosConfig";
function Bio({
  BioData = {
    about: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    profile_photo: "",
  },
  onSubmit,
  isSuccess,
  isError,
  navigateTo,
}) {
  const [uploadImage, setuploadImage] = useState(null);
  const [tempLink, setTempLink] = useState(BioData.profile_photo);
  useEffect(() => {
    setTempLink(BioData.profile_photo);
  }, [BioData]);
  const location = useLocation();
  const bioSchema = Yup.object().shape({
    about: Yup.string().required("Required"),
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(244, "Too Long!")
      .required("Required"),
    phone: Yup.string().required("Required"),
  });
  const onFileChange = async (e, setFieldValue) => {
    setuploadImage(e.target.files[0]);
    let img_src = await URL.createObjectURL(e.target.files[0]);
    // console.log(img_src);
    setTempLink(img_src);
    // setFieldValue("profile_photo", img_src);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={BioData}
      validationSchema={bioSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (!uploadImage) {
          onSubmit(values, uploadImage, setSubmitting);
        } else {
          const submitImage = new FormData();

          submitImage.append("media_file", uploadImage);
          onSubmit(values, submitImage, setSubmitting);
        }

        // try {
        //   const res = await axiosApiInstance.post(
        //     process.env.REACT_APP_FILE_UPLOAD,
        //     submitImage
        //   );
        //   console.log(res);

        // } catch (error) {}
      }}
    >
      {({
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        setTouched,
        setFieldValue,
      }) => (
        <Form>
          <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
            Bio
          </h1>
          <div>
            {/* Image Upload field input */}
            <ProfileImage>
              <img
                style={{ objectFit: "cover" }}
                src={tempLink ? tempLink : DummyImage}
                width={100}
                height={100}
                alt="ll"
              />
            </ProfileImage>

            {/* <input alt="af" type="image" /> */}

            <ImageUploadBtn>
              Add Image
              <input
                style={{ objectFit: "cover" }}
                className=""
                type="file"
                accept="image/*"
                onChange={(e) => onFileChange(e, setFieldValue)}
              />
            </ImageUploadBtn>
          </div>
          <div className="d-flex flex-column flex-xl-row gap-3">
            <FormGroup className="flex-fill">
              <label htmlFor="first_name">First Name</label>
              <InputGroup className="inputField4">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12 mb-0">
                <ErrorMessage name="first_name" />
              </p>
            </FormGroup>
            <FormGroup className="flex-fill">
              <label htmlFor="last_name">Last Name</label>
              <InputGroup className="inputField4">
                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12">
                <ErrorMessage name="last_name" />
              </p>
            </FormGroup>
          </div>
          <div className="d-flex flex-column flex-xl-row gap-3 mt-3">
            <FormGroup className="flex-fill">
              <label htmlFor="phone">Phone</label>
              <InputGroup className="inputField4">
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12 mb-0">
                <ErrorMessage name="phone" />
              </p>
            </FormGroup>
            <FormGroup className="flex-fill">
              <label htmlFor="address">Address</label>
              <InputGroup className="inputField4">
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className="inputTransparent flex p-2"
                />
              </InputGroup>
              <p className="text-danger fs-12">
                <ErrorMessage name="address" />
              </p>
            </FormGroup>
          </div>
          <div className="mt-3">
            <label htmlFor="about">About</label>
            <InputGroup className="inputField4">
              <Field
                id="about"
                as="textarea"
                type="text"
                name="about"
                placeholder="Write Something about yourself"
                className="inputTransparent flex p-2"
              />
            </InputGroup>
            <p className="text-danger fs-12">
              <ErrorMessage name="about" />
            </p>
          </div>

          <div className="d-flex justify-content-center mt-2 align-items-center">
            <button
              className="btn-green2 w-auto text-white px-4 mb-2"
              type="submit"
              disabled={isSubmitting}
              onClick={(e) => {
                setTouched(["phone", "address", "about"], true);
              }}
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
          <Link to={navigateTo ? navigateTo : location.pathname}>
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
  );
}
const ProfileImage = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
`;
const ImageUploadBtn = styled.button`
  position: relative;
  background-color: #f4f1f0;
  color: #3f464e;
  border: none;
  padding: 10px 10px;
  border-radius: 10px;
  margin-left: 10px;
  top: -10px;
  cursor: pointer;
`;
export default Bio;
