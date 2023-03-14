import React from "react";
import DummyCompanyLogo from "../../../Assets/images/BusinessDummyImages/company_logo.jpg";
import styled from "styled-components";
import JobsCard from "../../global/JobsCard/JobsCard";
const JobsData = [
  {
    company_logo: DummyCompanyLogo,
    company_name: "SourceLab",
    company_location: "New York",
    job_title: "Software Engineer",
    job_type: "Full Time",
    job_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
  {
    company_logo: DummyCompanyLogo,
    company_name: "SourceLab",
    company_location: "New York",
    job_title: "Software Engineer",
    job_type: "Full Time",
    job_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
  {
    company_logo: DummyCompanyLogo,
    company_name: "SourceLab",
    company_location: "New York",
    job_title: "Software Engineer",
    job_type: "Full Time",
    job_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
  {
    company_logo: DummyCompanyLogo,
    company_name: "SourceLab",
    company_location: "New York",
    job_title: "Software Engineer",
    job_type: "Full Time",
    job_description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque reprehenderit sapiente quasi nesciunt accusantium assumenda similique dolorum explicabo vitae aut cupiditate tempora omnis ipsum hic, voluptatem dolore ullam voluptatibus?",
  },
];
function JobsList() {
  return (
    <JobsListContainer>
      {JobsData.map((item, index) => (
        <JobsCard
          key={index}
          company_name={item.company_name}
          company_logo={item.company_logo}
          company_location={item.company_location}
          job_title={item.job_title}
          job_type={item.job_type}
          job_description={item.job_description}
        />
      ))}
    </JobsListContainer>
  );
}
const JobsListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;
export default JobsList;
