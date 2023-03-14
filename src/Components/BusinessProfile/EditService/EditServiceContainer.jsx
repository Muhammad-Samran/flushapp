import React, { useState, useEffect } from "react";
import EditServiceUI from "./EditServiceUI";
import { Formik, Form } from "formik";
import { createService } from "src/Services/Business/getBusiness";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../../Services/AxiosConfig";


function EditService({ navigateTo,serviceId, setEditModal }) {
  const [serviceCatList, setSerCatList] = useState([]);
  const [serviceData, setServiceData] = useState();
  const businessId = useSelector(
    (state) => state.auth.userDetail.business_list[0].business_profile_id
  );
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);

  const getServiceCatList = async () => {
    try {
      const { data } = await axios.get(`pre/services/`);
      if (data.success === true) {
        let services = [...data.data.services];
        services = services.map((item) => ({
          label: item.Service_name,
          value: item.PreService_id,
        }));
        setSerCatList(services);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getServiceDetail = async () => {
    try {
      const { data } = await axios.get(`user/single/service/?service_id=${serviceId}`);
      // console.log(data.data[0])
      await setServiceData(data.data[0])
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceCatList()
    getServiceDetail()
  }, []);


  const onSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    setIsError(false);
    setIsSucces(false);
    let newService_timings = [];
    for (const [key, value] of Object.entries(values.service_timings)) {
      newService_timings.push({ day_name: key, ...value });
    }
    try {
      const payload = {
        ...values,
        service_timings: newService_timings,
        business_id: businessId,
        service_id : serviceId
      }

      const res = await axios.put(`edit/posted/service`, payload)
      if (res instanceof Error) throw new Error(res.message);
      setSubmitting(false);
      setIsSucces(true);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsSucces(false);
      setSubmitting(false);
    }
  };
  const serviceSchema = Yup.object().shape({
    service_title: Yup.string().required("Required"),
    service_description: Yup.string().required("Required"),
    service_image: Yup.array().length(1, "Required"),
    service_category_id: Yup.string().required("Required"),
    service_price: Yup.number().required("Required"),
  });
  const categoryOptions = [
    { value: "full-time", label: "FullTime" },
    { value: "part-time", label: "Part Time" },
    { value: "internship", label: "Internship" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
    { value: "other", label: "Other" },
  ];
  const startTime = "10:00:00"; // Default Opening Time
  const endTime = "22:00:00"; // Default Closing Time
  return (
    <div id="wordExperience">
      <Formik
        validationSchema={serviceSchema}
        enableReinitialize
        initialValues={{
          service_title: serviceData ? serviceData.service_title : '',
          service_description: serviceData ? serviceData.service_description : '',
          service_image: serviceData ? serviceData.service_image : [],
          service_category_id: serviceData ? serviceData.service_category_id : '',
          service_price: serviceData ? serviceData.service_price : '',
          service_timings: serviceData ? serviceData.service_slots : {
            //Setting Opening & Closing Time for all days
            monday: {
              timings: [],
            },
            tuesday: {
              timings: [],
            },
            wednesday: {
              timings: [],
            },
            thursday: {
              timings: [],
            },
            friday: {
              timings: [],
            },
            saturday: {
              timings: [],
            },
            sunday: {
              timings: [],
            },
          },
        }}
        onSubmit={(values, { setSubmitting }) => {
          // console.log("Info: ", values);
          onSubmit(values, setSubmitting);
          //   }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
              Edit Service
            </h1>
            <EditServiceUI
              navigateTo={navigateTo}
              onSubmit={onSubmit}
              isSuccess={isSuccess}
              isError={isError}
              values={values}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
              categoryOptions={serviceCatList}
              startTime={startTime}
              endTime={endTime}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditService;
