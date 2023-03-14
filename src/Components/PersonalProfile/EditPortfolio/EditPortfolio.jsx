import React, { useState, useEffect } from "react";
import { convertToHTML } from "draft-convert";
import AxiosConfig from "../../../Services/AxiosConfig";
import { useNavigate, Link, useParams } from "react-router-dom";
import PortfolioUI from "../../global/PersonalProfile/Portfolio/Portfolio";
import { getPortfolioItem } from "src/Services/PersonalProfile/getProfileData";
import Loader from "src/Components/UI/Loader/Loader";
function Education({ navigateTo }) {
  const { id, portfolioId } = useParams();
  // console.log(id, portfolioId);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState({
    portfolio_label: "",
    portfolio_details: "",
    portfolio_media_url: [],
  });
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
  const onSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    setIsError(false);
    setIsSucces(false);
    //   console.log(values);
    const temp = {
      portfolio_label: values.portfolio_label,
      portfolio_details: values.portfolio_details,
      portfolio_media_url: values.portfolio_media_url,
      // portfolio_details: convertToHTML(
      //   values.portfolio_details.getCurrentContent()
      // ),
      belongs_to_business: "",
    };
    try {
      const response = await AxiosConfig.put(
        `portfolio/add/details/?p_id=${portfolioId}`,
        temp
      );
      // console.log(response);
      setSubmitting(false);
      setIsSucces(true);
      setIsError(false);
      if (navigateTo) {
        navigate(navigateTo);
      }
    } catch (error) {
      // console.log(error);
      setIsError(true);
      setIsSucces(false);
      setSubmitting(false);
    }
  };
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
      <PortfolioUI
        formData={portfolioData}
        navigateTo={navigateTo}
        onSubmit={onSubmit}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
}

export default Education;
