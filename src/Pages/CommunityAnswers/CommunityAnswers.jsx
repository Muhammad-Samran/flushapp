import React from "react";
import AnswerForm from "src/Components/global/AnswerForm/AnswerForm";
import Layout from "src/Components/global/Dashboard/Layouts/Layout";

function CommunityAnswers() {
  return (
    <>
      <Layout type="plain">
        <AnswerForm />
      </Layout>
    </>
  );
}

export default CommunityAnswers;
