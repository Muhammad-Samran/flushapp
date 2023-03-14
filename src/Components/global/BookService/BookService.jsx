import React, { useState } from "react";
import BookServiceUI from "../../UI/BookService/BookService";
import { Formik, Form } from "formik";
function BookService() {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  return (
    <div>
      {" "}
      <Formik
        // enableReinitialize
        // validationSchema={workExperenceSchema}
        initialValues={{
          name: "",
          email: "",
          phone: "",
          bookingType: "",
          bookingDate: "",
          bookingTime: "",
          budget: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values, setSubmitting);
        }}
      >
        {({ values, isSubmitting, setFieldValue, handleSubmit }) => (
          <BookServiceUI
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
            isError={isSuccess}
            values={values}
            handleSubmit={handleSubmit}
          />
        )}
      </Formik>
    </div>
  );
}

export default BookService;
