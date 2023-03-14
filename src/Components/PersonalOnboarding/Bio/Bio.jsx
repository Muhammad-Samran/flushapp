import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputGroup } from 'react-bootstrap';
import { Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FormGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userSelector } from 'react-router-dom';
import * as Yup from 'yup';
import AxiosConfig from '../../../Services/AxiosConfig';
import BioUi from '../../global/PersonalProfile/Bio/Bio';
import DummyImage from '../../../Assets/images/personal_profile/default_image.png';
import {
  getUserProfile,
  updateUserProfile,
} from 'src/Services/PersonalProfile/getProfileData';
function Bio({ navigateTo }) {
  const [ProfileData, setProfileData] = useState({});
  const [apiData, setApiData] = useState();
  const [BioAlreadyExists, setBioExists] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const location = useLocation();
  const authorizing = useSelector((state) => state.auth.authorizing);
  const [BioData, setBioData] = useState({
    about: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    profile_photo: DummyImage,
  });

  useEffect(() => {
    (async function () {
      try {
        const profileData = await getUserProfile(userId);
        setProfileData(profileData.data);
        // console.log(profileData.data);
        // let { data } = await AxiosConfig.get("user/bio/create/");
        // setApiData(data);
        // if (data.data.about) {
        //   setBioExists(true);
        // } else {
        //   setBioExists(false);
        // }
        // if (data.data) {
        //   setBioData({
        //     ...BioData,
        //     first_name: data.data.first_name,
        //     last_name: data.data.last_name,
        //     address: data.data.address ? data.data.address : "",
        //     phone: data.data.phone ? data.data.phone : "",
        //     about: data.data.about || "",
        //   });
        // }

        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, [userId]);
  const onSubmit = async (values, submitImage, setSubmitting) => {
    try {
      setSubmitting(true);
      setIsError(false);
      setIsSucces(false);
      // console.log(values.about);
      let imageLink;
      // console.log(submitImage);
      // return;
      if (!submitImage) {
        imageLink = values.profile_photo;
      } else {
        const { data } = await AxiosConfig.post(
          process.env.REACT_APP_FILE_UPLOAD,
          submitImage
        );
        imageLink = data.data.media_file;
      }

      // const { data } = await AxiosConfig.post(
      //   process.env.REACT_APP_FILE_UPLOAD,
      //   submitImage
      // );

      // const imageLink = data.data.media_file;

      const res = await updateUserProfile({
        ...ProfileData,
        user_number: values.phone,

        profile_photo: imageLink,
      });
      if (res instanceof Error) throw new Error(res.message);
      if (BioAlreadyExists) {
        const response = await AxiosConfig.put('user/bio/create/', {
          about: values.about,
          id: userId,
          type: 'personal',
          userbio_id: apiData.data.userbio_id,
        });
      } else {
        const response = await AxiosConfig.post('user/bio/create/', {
          about: values.about,
          id: userId,
          type: 'personal',
        });
        // console.log(response);
      }

      setSubmitting(false);
      setIsSucces(true);
      setIsError(false);
      // resetForm();
      if (navigateTo) {
        navigate(navigateTo);
      }
    } catch (error) {
      // console.log(error);
      setIsError(true);
      setIsSucces(false);
      setSubmitting(false);
    }
  };
  return (
    <BioUi
      BioData={ProfileData}
      onSubmit={onSubmit}
      isSuccess={isSuccess}
      isError={isError}
      navigateTo={navigateTo}
    />
  );
}

export default Bio;
