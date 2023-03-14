import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Layout from "src/Components/global/Dashboard/Layouts/Layout";
import QuestionsCard from "../../Components/global/QuestionsCard/QuestionsCard";
import CategoriesCard from "../../Components/global/CategoriesCard/CategoriesCard";
import data from "./demoGridData.json";
import Q_Data from "./data.json";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CategoriesPage({ dataLimit = 6 }) {
  const pages = Math.round(Q_Data.length / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    // console.log("total page Number", pages);
    // console.log("current page number", currentPage + 1);
    if (currentPage + 1 > pages) {
      return;
    } else {
      setCurrentPage((page) => page + 1);
    }
  }

  function goToPreviousPage() {
    // console.log("current page on previous", currentPage - 1);
    if (currentPage - 1 == 0) {
      return;
    } else {
      setCurrentPage((page) => page - 1);
    }
  }

  function changePage(event) {
    const pageNumber = Number(event.target.text);
    // console.log("page Number", pageNumber);
    if (pageNumber) {
      setCurrentPage(pageNumber);
    } else {
      return;
    }
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return Q_Data.slice(startIndex, endIndex);
  };

  return (
    <>
      <Layout type="leftsidebar">
        {/* <Container > */}
        <div >
          <div className="cat-heading">
            <div className="header-title marBot t-space">
              <span>Categories</span>
            </div>
            <div className="cat-button">
              <button className="cat-btn">
                <span>Ask a Question</span>
              </button>
            </div>
          </div>
          <div className="grid-call">
            {data.map((item, index) => (
              <CategoriesCard item={item} />
            ))}
          </div>

          <div className="Q-main">
              <div className="q-heading">
                  <h2>Search Questions & Answers</h2>
              </div>
            <div className="search-bar-main">
              <div class="form-group has-search">
                <div className="icon-div">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="icon-search icon-end"
                  />
                </div>

                <input
                  type="text"
                  className="form-control input-font"
                  placeholder="Type Questions or answers"
                />
              </div>
            </div>
          </div>

          <QuestionsCard
            pages={pages}
            currentPage={currentPage}
            changePage={changePage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            getData={getPaginatedData()}
          />
        {/* </Container> */}
        </div>
      </Layout>
    </>
  );
}

export default CategoriesPage;
