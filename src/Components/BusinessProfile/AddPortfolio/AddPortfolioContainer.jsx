import React, { useState } from "react";
import AddPortfolioUi from "./AddPortfolioUI";
import { Formik, Form } from "formik";
import { createPortfolio } from "src/Services/Business/getBusiness";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
function AddPortfolio({ navigateTo }) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const { businessId } = useParams();
  const onSubmit = async (values, setSubmitting) => {
    // console.log(values);
    setSubmitting(true);
    setIsError(false);
    setIsSucces(false);
    try {
      const res = await createPortfolio({
        ...values,
        belongs_to_business: businessId,
      });
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
    portfolio_media_url: Yup.array().length(1, "Required"),
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
        initialValues={{
          portfolio_label: "",
          portfolio_details: "",
          portfolio_media_url: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values, setSubmitting);
          //   }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <h1 className="title-head primary-font primary-color mt-3 mt-xl-0">
              Add Portfolio
            </h1>
            <AddPortfolioUi
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

export default AddPortfolio;
