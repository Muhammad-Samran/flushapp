import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getPortfolioItem } from "src/Services/PersonalProfile/getProfileData";
import { useSelector } from "react-redux";
import styled from "styled-components";
function ViewProject({ navigateTo, data, onEdit }) {
  const location = useLocation();
  return (
    <div>
      <div onClick={(e) => onEdit()}>
        <BackButton>Edit</BackButton>
        {/* <button>Edit</button> */}
      </div>
      <h4 className="mb-2">{data.title}</h4>
      <p className="mb-2">{data.description}</p>
      {<img src={data.image} alt="portfolio" className="img-fluid" />}
    </div>
  );
}
const BackButton = styled.button`
  background-image: linear-gradient(135deg, #04d78c, #3f464e);
  border-radius: 10px;
  outline: none;
  border: none;
  width: 125px;
  font-size: clamp(14px, 1.5vw, 16px);
  font-family: "Roboto Medium", sans-serif;
  padding: 10px;
  color: #f4f1f0;
  margin-top: 10px;
  float: right;
`;

export default ViewProject;
