import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getPortfolioItem } from "src/Services/PersonalProfile/getProfileData";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "src/Components/UI/Loader/Loader";
function ViewPortfolio({ navigateTo }) {
  const location = useLocation();
  const { id, portfolioId } = useParams();
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const {
          res: { data },
          error,
        } = await getPortfolioItem(id, portfolioId);
        if (error) throw new Error(error.message);
        setPortfolioData(data.data);
        setLoading(false);
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    })();
  }, [portfolioId, id]);
  if (loading)
    return (
      <Loader/>
      // <div className="d-flex justify-content-center">
      //   <div className="spinner-border" role="status">
      //     <span className="sr-only">Loading...</span>
      //   </div>
      // </div>
    );

  return (
    <div>
      <Link to={`${location.pathname}/edit`}>
        <BackButton>Edit</BackButton>
        {/* <button>Edit</button> */}
      </Link>
      <h4 className="mb-2">{portfolioData.portfolio_label}</h4>
      <p className="mb-2">{portfolioData.portfolio_details}</p>
      {portfolioData?.portfolio_media_url?.length > 0 &&
        portfolioData.portfolio_media_url.map((item, index) => (
          <>
            <img
              key={index}
              src={item.media_file}
              alt="portfolio"
              className="img-fluid"
            />
          </>
        ))}
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

export default ViewPortfolio;
