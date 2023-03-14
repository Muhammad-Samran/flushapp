import React from "react";
import { Routes, Route } from "react-router-dom";
import JobListingGrid from "../JobListingGrid/JobListingGrid";
import Layout from "src/Components/global/Dashboard/Layouts/Layout";
import JobDetail from "../JobListingDetail/JobListingDetail";
import SavedJobs from "../SavedJobs/SavedJobs";
import AppliedJobs from "../AppliedJobs/AppliedJobs";
import JobListing from "../JobListing/JobListing";
import JobArchivePage from "../JobArchivePage/JobArchivePage";

function JobsRouter() {
  return (
    <Layout type="plain">
      <Routes>
        <Route path="/" element={<JobListing />} />
        <Route path="/applied" element={<AppliedJobs />} />
        <Route path="/archive" element={<JobArchivePage />} />
        <Route path="/saved" element={<SavedJobs />} />
        <Route path="/:jobId" element={<JobDetail />} />
      </Routes>
    </Layout>
  );
}

export default JobsRouter;
