import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AxiosConfig from 'src/Services/AxiosConfig';
import BioUi from '../../global/PersonalProfile/Bio/Bio';
import {
  updateUserProfile,
  getUserProfile,
  getUserBio,
} from '../../../Services/PersonalProfile/getProfileData';
function EditBio({ navigateTo }) {
  const [FormData, setFormData] = useState({
    about: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    profile_photo: '',
  });
  const [bioId, setBioId] = useState('');
  // const [ProfileData, setProfileData] = useState({});
  // const [BioData, setBioData] = useState({
  //   about: "",
  //   first_name: "",
  //   last_name: "",
  //   phone: "",
  //   address: "",
  //   profile_photo: "",
  // });
  // const [apiData, setApiData] = useState();

  const [BioAlreadyExists, setBioExists] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async function () {
      try {
        const bioData = await getUserBio();
        // console.log("Bio data===", bioData);
        // setFormData({
        //   ...FormData,

        // });
        const profileData = await getUserProfile(userId);
        // console.log("Profile data", profileData);
        setBioId(bioData.data.userbio_id);
        setFormData({
          ...FormData,
          first_name: profileData.data.first_name,
          last_name: profileData.data.last_name,
          profile_photo: profileData.data.profile_photo,
          about: bioData.data.about,
        });
        if (bioData?.data?.about) {
          setBioExists(true);
        }
        // setFormData({ first_name });
        // setProfileData(profileData.data);
        // const { data } = await AxiosConfig.get("user/bio/create/");
        // setApiData(data);
        // if (data.data.about) {
        //   setBioExists(true);
        // } else {
        //   setBioExists(false);
        // }
        // if (data.data) {
        //   setBioData({
        //     ...BioData,

        //     about: data.data.about || "",
        //   });
        // }
        // console.log("flag ");
        // if (ProfileData.profile_photo) {
        //   console.log("flag ");
        //   setBioData({ ...BioData, profile_photo: ProfileData.profile_photo });
        // }
        // console.log(data);
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);
  const onSubmit = async (values, submitImage, setSubmitting) => {
    // console.log('submitIMage', submitImage);
    try {
      setSubmitting(true);
      setIsError(false);
      setIsSucces(false);
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
      // console.log(imageLink);
      // return;
      const res = await updateUserProfile({
        // ...ProfileData,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        physical_address: values.address,
        gender: 'male',
        cover_photo: '',
        profile_photo: imageLink,
      });
      if (res instanceof Error) throw new Error(res.message);

      if (BioAlreadyExists) {
        const response = await AxiosConfig.put('user/bio/create/', {
          about: values.about,
          id: userId,
          type: 'personal',
          userbio_id: bioId,
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
      BioData={FormData}
      onSubmit={onSubmit}
      isSuccess={isSuccess}
      isError={isError}
      navigateTo='/'
    />
  );
}

export default EditBio;
