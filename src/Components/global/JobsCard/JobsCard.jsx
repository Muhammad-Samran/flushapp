import React from "react";
import styled from "styled-components";
function JobsCard({
  company_name,
  company_logo,
  company_location,
  job_title,
  job_type,
  job_description,
}) {
  return (
    <JobContainer>
      <div className="d-flex flex-row gap-2 mb-4">
        <div>
          <CompanyLogo src={company_logo} alt="company_logo" />
        </div>
        <div>
          <CompanyName>{company_name}</CompanyName>
          <CompanyLocation>{company_location}</CompanyLocation>
        </div>
      </div>
      <JobTitle>{job_title}</JobTitle>
      <JobType>{job_type}</JobType>
      <JobDescription>{job_description}</JobDescription>
      <ApplyNowBtn>Apply Now</ApplyNowBtn>
    </JobContainer>
  );
}
const JobContainer = styled.div`
  border: 2px solid #e1e1e1;
  padding: 20px;
  border-radius: 20px;
  max-width: 450px;
`;
const CompanyLogo = styled.img`
  width: 40px;
  height: 40px;
`;
const CompanyName = styled.h3`
  font-size: 16px;
  font-weight: bold;
  font-family: "Poppins Semi Bold", sans-serif;
  color: #3f464e;
  margin-bottom: 5px;
`;
const CompanyLocation = styled.p`
  font-size: 12px;
  color: #999999;
  font-family: "Roboto", sans-serif;
`;
const JobTitle = styled.h4`
  font-size: 16px;
  font-family: "Circular Std", sans-serif;
  font-size: clamp(18px, 1vw, 20px) !important;
  color: #3f464e;
  margin-bottom: 5px;
`;
const JobType = styled.p`
  font-size: 12px;
  color: #04d76a;
  font-family: "Roboto", sans-serif;
  margin-bottom: 10px;
`;
const JobDescription = styled.p`
  font-size: 14px;
  color: #444444;
  font-family: "Roboto", sans-serif;
  line-height: 1.4;
`;
const ApplyNowBtn = styled.button`
  background: #04d76a;
  border: none;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  font-family: "Roboto Medium", sans-serif;
  /* font-weight: bold; */
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #039d5b;
  }
`;
export default JobsCard;
