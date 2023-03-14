import JobArchitectureCard from "../../Components/global/JobArchitectureCard/JobArchitectureCard";
import React, { useEffect, useState } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import "../../Components/global/JobArchitectureCard/JobArchitectureCard.css";
import data from "./demoData.json";
import Layout from "src/Components/global/Dashboard/Layouts/Layout";
import axios from "../../Services/AxiosConfig";
import Pagination from "src/Components/global/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "src/Components/UI/Loader/Loader";


function JobArchitecturePage({ dataLimit = 10 }) {
  const location = useLocation();


  const JObID = location.state.JObID;

  const [totalData, setTotalData] = useState();
  const [dataAPI, setData] = useState();
  const pages = Math.ceil(totalData / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(dataLimit - 1);
  const [JobId, setJobId] = useState();

  useEffect(async () => {
    let check = true;
    if (check) {
      await getAPIData();
      check = false;
    }
  }, [startIndex]);

  // dummy data job id is: 3a1b7c51-eac4-4993-911e-c6b8481b2f54
  const getAPIData = async () => {
    try {
      const { data } = await axios.get(
        "get/applicants?index=" +
        startIndex +
        "&offset=" +
        dataLimit +
        "&sort_by=asce&job_id=" +
        JObID
      );
      // console.log(data);
      setTotalData(data.total_data);
      setData(data.data);
      setJobId(data.job_title)
    } catch (error) {
      // console.log(error);
    }
  };

  const deleteApplication = async (JobApplicationId) => {
    // console.log("job application id", JobApplicationId)
    try {
      const payload = {
        job_application_id: JobApplicationId
      }
      // console.log("payload", payload)
      const { data } = await axios.delete(
        "job/response/service/", {data:payload}
      );
      // console.log(data)
      await getAPIData()
      await showToast(data.success)
    } catch (error) {
      // console.log(error)
      await showToast(data.success)
    }
  }

  let remainingIndex = totalData % dataLimit;

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

  const showToast = (success, type) => {
    toast.dismiss();
    if (success) {
      toast.success("Job Deleted Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
    else if (!success) {
      toast.error("Error! Job Delete Failed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  };

  return (
    <>
      <Layout type="plain">
        <Container className="py-5">
          {dataAPI && totalData != 0 ? (
            <div>
              <JobArchitectureCard
                pages={pages}
                currentPage={currentPage}
                getData={dataAPI}
                JobId={JobId}
                deleteApplication={deleteApplication}
                getAPIData={getAPIData}
              />

              <Pagination
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                totalData={totalData}
                startIndex={startIndex}
                endIndex={endIndex}
                getAPIData={getAPIData}
              />
            </div>
          ) :(
            dataAPI? <h1>No Application Found</h1> : <Loader/>
            )
            }
        </Container>
        <ToastContainer />
      </Layout>
    </>
  );
}

export default JobArchitecturePage;
