import { Formik, ErrorMessage, Field } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import BusinessAboutUI from '../../UI/Business/AboutForm/AboutForm';
import { useDispatch } from 'react-redux';
import { authorize } from 'src/Redux/AuthSlice';
import AxiosConfig from '../../../Services/AxiosConfig';
export default function AboutForm({navigate}) {
  const dispatch = useDispatch();
  const [TempBanner, setTempBanner] = useState();
  const [BannerImage, setBannerImage] = useState(null);
  const [TempLogo, setTempLogo] = useState();
  const [LogoImage, setLogoImage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const onBannerChange = async (e, setFieldValue) => {
    setBannerImage(e.target.files[0]);
    let img_src = await URL.createObjectURL(e.target.files[0]);
    setTempBanner(img_src);
    // setFieldValue("profile_photo", img_src);
  };
  const onLogoChange = async (e, setFieldValue) => {
    setLogoImage(e.target.files[0]);
    let img_src = await URL.createObjectURL(e.target.files[0]);
    setTempLogo(img_src);
    // setFieldValue("profile_photo", img_src);
  };
  const URLRegrex =
    /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

  const FormSchema = Yup.object().shape({
    business_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    business_email: Yup.string().email('Invalid email').required('Required'),
    physical_address: Yup.object().required("Required"),
    web_link: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    summary: Yup.string().min(2, 'Too Short!'),
    // Validate facebook link with yup
    social_media_links: Yup.object().shape({
      facebook: Yup.string().matches(URLRegrex, 'Invalid URL'),
      twitter: Yup.string().matches(URLRegrex, 'Invalid URL'),
      instagram: Yup.string().matches(URLRegrex, 'Invalid URL'),
      linkedin: Yup.string().matches(URLRegrex, 'Invalid URL'),
      youtube: Yup.string().matches(URLRegrex, 'Invalid URL'),
      pinterest: Yup.string().matches(URLRegrex, 'Invalid URL'),
      snapchat: Yup.string().matches(URLRegrex, 'Invalid URL'),
      tiktok: Yup.string().matches(URLRegrex, 'Invalid URL'),
    }),
  });
  const handleSubmit = async (values, setSubmitting) => {
    

    try {
      setIsSucces(false);
      setIsError(false);
      setSubmitting(true);
      let business_banner;
      let business_logo;
      // If Banner is selected then upoad it
      if (BannerImage) {
        const submitBanner = new FormData();
        submitBanner.append('media_file', BannerImage);
        const { data } = await AxiosConfig.post(
          process.env.REACT_APP_FILE_UPLOAD,
          submitBanner
        );
        business_banner = data.data.media_file;
        values = { ...values, business_banner };
      }
      // If Logo is selected then upoad it
      if (LogoImage) {
        const submitLogo = new FormData();
        submitLogo.append('media_file', LogoImage);
        const { data } = await AxiosConfig.post(
          process.env.REACT_APP_FILE_UPLOAD,
          submitLogo
        );
        business_logo = data.data.media_file;
        values = { ...values, business_logo};
      }
      // console.log(business_banner, business_logo);
      //  Create Business
    
      const { data } = await AxiosConfig.post('create/business/profile/', {
        ...values,
        serving_locations: [values.physical_address]
        , service_category_id:"dce28e55-beb1-4920-960f-ca7abbddfa72" 
      });
      // console.log(data);
      // console.log(data.message);
      dispatch(authorize());
      setIsSucces(true);
      setSubmitting(false);
      setIsError(false);

      setTimeout(function () {
        navigate(`/business/${data.data.business_profile_id}`);
      }, 2000);

    } catch (error) {
      // console.log(error);
      setIsError(true);
      setIsSucces(false);
    }
  };
  return (
    <div>
      <h1 className='title-head primary-font primary-color mt-3 mt-xl-0'>
        Create a New Business
      </h1>
      <Formik
        initialValues={{
          business_name: '',
          contact_number: '',
          physical_address: '',
          business_logo: '',
          business_banner: '',
          serving_location: [],
          looking_to_recruit: false,
          looking_to_provide_services: true,
          years_of_experience: '0-1',
          business_email: '',
          web_link: '',
          summary: '',
          no_of_employees: '0-5',
          no_of_home_projects: 0,
          business_category: '',
          social_media_links: {
            facebook: '',
            linkedin: '',
            instagram: '',
            youtube: '',
            twitter: '',
            pinterest: '',
            snapchat: '',
            tiktok: '',
          },
        }}
        validationSchema={FormSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          Field,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <BusinessAboutUI
              values={values}
              setFieldValue={setFieldValue}
              onBannerChange={onBannerChange}
              onLogoChange={onLogoChange}
              TempBanner={TempBanner}
              TempLogo={TempLogo}
              SubmitText='Create Business'
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
              isError={isError}
              // Field={Field}
            />
          </form>
        )}
      </Formik>
    </div>
  );
}
