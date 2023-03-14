import React, { useState, useEffect } from "react";
import {
  SidePanel,
  DetailArea,
} from "../../Components/global/JobArchitectureDetailCard/JobArchitectureDetailCard";
import { Container, Row, Card, Button, Col, Form } from "react-bootstrap";
// import data from "./demoData.json";
import Layout from "src/Components/global/Dashboard/Layouts/Layout";
import { useLocation } from "react-router-dom";
import Pagination from "src/Components/global/Pagination/Pagination";
import axios from "../../Services/AxiosConfig";
import Loader from "src/Components/UI/Loader/Loader";

function JobArchitectureDetailPage({ dataLimit = 10 }) {
  const location = useLocation();

  const job_id = location.state.job_id;
  const applicant_id = location.state.applicant_id;

  const [totalData, setTotalData] = useState();
  const [dataAPI, setData] = useState();
  const [DetailData, setDetailData] = useState();
  const pages = Math.ceil(totalData / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(dataLimit - 1);
  const [currentItem, setCurrentItem] = useState();
  const [JobTitle, setJobTitle] = useState();

  useEffect(async () => {
    let check = true;
    if (check) {
      await getAPIData();
      await checkIsDetails()
      check = false;
    }
  }, [startIndex,currentItem]);

  const getAPIData = async () => {
    try {
      const { data } = await axios.get(
        "get/applicants?index=" +
          startIndex +
          "&offset=" +
          dataLimit +
          "&sort_by=asce&job_id=" +
          job_id
      );
      // console.log(data);
      setTotalData(data.total_data);
      setData(data.data);
      setJobTitle(data.job_title)
    } catch (error) {
      // console.log(error);
    }
  };

  const getDetailAPIData = async (job_id,applicant_id) => {
    try {
      const payload ={
        applicant_id:applicant_id,
        job_id: job_id
      }
      const { data } = await axios.post(
        "get/applicants",payload
      );
      // console.log("detail api data...",data);
      setDetailData(data.data)
    } catch (error) {
      // console.log(error);
    }
  };

  const checkIsDetails = () => {
    // console.log("navigate state",job_id )
    // console.log("navigate state",applicant_id )
    if(currentItem){
      getDetailAPIData(currentItem.job_post_id,currentItem.applicant_id)
    }
    else{
      getDetailAPIData(job_id,applicant_id)
    }
  }

  async function goToNextPage() {
    // console.log("currentPage number", currentPage);

    if (currentPage + 1 > pages) {
      return;
    } else if (currentPage + 1 == pages) {
      setStartIndex(totalData - remainingIndex);
      setEndIndex(totalData - 1);
    } else {
      setCurrentPage((page) => page + 1);

      setStartIndex(startIndex + dataLimit);
      setEndIndex(endIndex + dataLimit);
    }
  }

  let remainingIndex = totalData % dataLimit;

  async function goToPreviousPage() {
    // console.log("current page on previous", currentPage);
    if (currentPage == 0) {
      return;
    } else if (currentPage + 1 === pages) {
      setCurrentPage((page) => page - 1);
      setStartIndex(startIndex - dataLimit);
      setEndIndex(endIndex - remainingIndex);
    } else if (startIndex != 0) {
      setCurrentPage((page) => page - 1);

      setStartIndex(startIndex - dataLimit);
      setEndIndex(endIndex - dataLimit);
    }
  }

  return (
    <>
      <Layout type="plain">
        <Container className="py-5">
          <div className="header-title marBot">
            <span>{JobTitle}</span>
          </div>
          <Row>
            <Col lg={4} md={4} sm={5}>
              <div className="side-panel-archi">
                {dataAPI ? (
                  <SidePanel
                  dataAPI={dataAPI}
                    totalData={totalData}
                    setCurrentItem={setCurrentItem}
                  />
                ) : (
                  <Loader/>
                )}
              </div>
              <div>
                <Pagination
                  goToNextPage={goToNextPage}
                  goToPreviousPage={goToPreviousPage}
                  totalData={totalData}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  getAPIData={getAPIData}
                />
              </div>
            </Col>
            <Col lg={8} md={8} sm={7}>
              {DetailData ? (
                <DetailArea DetailData={DetailData} />
              ) : (
                <Loader/>
              )}
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default JobArchitectureDetailPage;
