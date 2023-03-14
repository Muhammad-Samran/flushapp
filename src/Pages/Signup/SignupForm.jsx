import React, { useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup } from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Autocomplete from "react-google-autocomplete";
import {
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);

  useEffect(() => {
    toast.dismiss();
    if (auth.isSignUpProcessing) {
      toast.loading("Please wait...");
    }
    if (auth.isSignUpError) {
      toast.error(auth.signUpErrorMessage);
    }
    if (auth.signupSuccess) {
      toast({
        render: "Success",
        type: "success",
      });
      navigate("/on-boarding/bio");
    }
  }, [auth, navigate]);

  const handleSignUpSubmit = (values) => {
    try {
      dispatch(signup(values));
    } catch (error) {
      // console.log(error);
    }
  };

  // Validation
  const SignupSchema = Yup.object().shape({
    accountType: Yup.string().required("Required"),
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required"),
    physicalAddress: Yup.object().required("Required"),
    // gender: Yup.string().required('Required'),
    agree: Yup.boolean().oneOf([true], "Required"),
    password: Yup.string()
      .required("Required.")
      .min(6, "Password is too short - should be 6 chars minimum.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/,
        "Password must contains at least one Special character, one Uppercase letter, one Lowercase letter and one Number."
      ),
    confirmPassword: Yup.string().test(
      "passwords-match",
      "Passwords must match",
      function (value) {
        return this.parent.password === value;
      }
    ),
  });
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Formik
        initialValues={{
          accountType: "personal",
          firstName: "",
          lastName: "",
          email: "",
          physicalAddress: "",
          password: "",
          confirmPassword: "",
          agree: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSignUpSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-xl-row gap-lg-2 mt-3">
              <FormGroup className="flex-fill ">
                <label htmlFor="firstName">First Name</label>
                <InputGroup className="inputField4">
                  <input
                    id="fistName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12 mb-0">
                  <ErrorMessage name="firstName" />
                </p>
              </FormGroup>
              <FormGroup className="flex-fill">
                <label htmlFor="lastName">Last Name</label>
                <InputGroup className="inputField4">
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12">
                  <ErrorMessage name="lastName" />
                </p>
              </FormGroup>
            </div>
            <div>
              {/* <FormGroup>
                <label htmlFor='gender'>Gender</label>
                <InputGroup className='inputField4'>
                  <select
                    id='gender'
                    name='gender'
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='flex inputTransparent p-2'
                  >
                    <option value='' disabled label='Gender' />
                    <option value='male' label='Male' />
                    <option value='female' label='Female' />
                    <option value='other' label='Other' />
                  </select>
                </InputGroup>
                <p className='text-danger fs-12'>
                  <ErrorMessage name='gender' />
                </p>
              </FormGroup> */}
            </div>
            <div>
              <FormGroup>
                <label htmlFor="email">Email Address</label>
                <InputGroup className="inputField4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12">
                  <ErrorMessage name="email" />
                </p>
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <label htmlFor="address">Address</label>
                <InputGroup className="inputField4">
                  <Autocomplete
                    className="inputTransparent flex p-2"
                    inputAutocompleteValue={values.physicalAddress}
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    onPlaceSelected={(place) => {
                      setFieldValue("physicalAddress", place);
                    }}
                  />
                </InputGroup>

                <p className="text-danger fs-12">
                  <ErrorMessage name="physicalAddress" />
                </p>
              </FormGroup>
            </div>
            <div className="d-flex  flex-column flex-xl-row gap-lg-2">
              <FormGroup className="flex-fill">
                <label htmlFor="password">Password</label>
                <InputGroup className="inputField4">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12 mb-0">
                  <ErrorMessage name="password" />
                </p>
              </FormGroup>
              <FormGroup className="flex-fill">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <InputGroup className="inputField4">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    className="inputTransparent flex p-2"
                  />
                </InputGroup>
                <p className="text-danger fs-12">
                  <ErrorMessage name="confirmPassword" />
                </p>
              </FormGroup>
            </div>
            <div className="agreeStatementDiv">
              <label className="checkmark-container my-2 d-inline-flex align-items-center">
                <span className="secondary-font">
                  I agree to all
                  <span className="primary-color">{` Terms & Conditions `}</span>
                  and
                  <span className="primary-color">{` Privacy Policy. `}</span>
                </span>
                <input
                  name="agree"
                  type="checkbox"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.agree}
                  checked={values.agree}
                />
                <span className="checkmark"></span>
              </label>
              <p className="text-danger fs-12">
                <ErrorMessage name="agree" />
              </p>
            </div>
            <div>
              <button
                style={{ width: "208px" }}
                className="btn-green2 text-white  mb-3 mt-1 secondary-font "
                type="submit"
                // disabled={isSubmitting}
              >
                Create Your Account
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
