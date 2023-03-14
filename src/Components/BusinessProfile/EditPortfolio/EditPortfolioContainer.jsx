import React, { useState, useEffect } from "react";
import EditPortfolioUI from "./EditPortfolioUI";
import { Formik, Form } from "formik";

import { DeleteBtn, HeadingFlex } from "../../../Styles";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import useData from "src/Hook/useData";
import axios from "../../../Services/AxiosConfig";
import { deletePortfolio } from "../../../Services/Business/getBusiness";
import Loader from "src/Components/UI/Loader/Loader";
function EditPortfolio({ navigateTo, portfolioId, setEditModal }) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const { businessId } = useParams();
  const [formData, setFormData] = useState({
    portfolio_label: "",
    portfolio_details: "",
    portfolio_media_url: [],
  });
  const [loading, data, error, refresh] = useData(
    `business/fetch/portfolio/?p_id=${portfolioId}`
  );
  useEffect(() => {
    if (data.data) {
      setFormData(data.data);
    }
  }, [data]);
  if (loading) {
    return <Loader/>;
  }
  if (error) {
    return <h2>Something went wrong.</h2>;
  }
  const onSubmit = async (values, setSubmitting) => {
    // console.log(values);
    setSubmitting(true);
    setIsError(false);
    setIsSucces(false);
    try {
      const res = await axios.put(
        `business/portfolio/?p_id=${portfolioId}&business_id=${businessId}`,
        {
          ...values,
          belongs_to_business: businessId,
        }
      );
      if (res instanceof Error) throw new Error(res.message);
      setSubmitting(false);
      setIsSucces(true);
      setIsError(false);
    } catch (error) {
      // console.log(error);
      setIsError(true);
      setIsSucces(false);
      setSubmitting(false);
    }
  };
  const portfolioSchema = Yup.object().shape({
    portfolio_label: Yup.string().required("Required"),
    portfolio_details: Yup.string().required("Required"),
    portfolio_media_url: Yup.array().min(1, "Required"),
  });
  const categoryOptions = [
    { value: "full-time", label: "FullTime" },
    { value: "part-time", label: "Part Time" },
    { value: "internship", label: "Internship" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
    { value: "other", label: "Other" },
  ];

  return (
    <div id="wordExperience">
      <Formik
        validationSchema={portfolioSchema}
        initialValues={formData}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
          //   }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <HeadingFlex>
              <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
                Edit Portfolio
              </h1>

              <DeleteBtn
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this Portfolio Item?"
                    )
                  ) {
                    // console.log("Deleting portfolio=>", portfolioId);
                    await deletePortfolio(portfolioId, businessId);
                    setEditModal(false);
                  } else {
                    // console.log("No");
                  }
                }}
              >
                Delete
              </DeleteBtn>
            </HeadingFlex>
            <EditPortfolioUI
              navigateTo={navigateTo}
              onSubmit={onSubmit}
              isSuccess={isSuccess}
              isError={isError}
              values={values}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditPortfolio;
