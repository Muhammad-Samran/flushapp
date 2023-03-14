import JobPossitionCard from "../../Components/global/JobPossitionCard/JobPossitionCard";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../Components/global/JobPossitionCard/JobPossitionCard.css";
import axios from "../../Services/AxiosConfig";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import Layout from "src/Components/global/Dashboard/Layouts/Layout";
import Pagination from "../../Components/global/Pagination/Pagination";
import Loader from "src/Components/UI/Loader/Loader";

function JobPossitionPage({ dataLimit = 10 }) {
  const [dataAPI, setData] = useState();
  const [totalData, setTotalData] = useState();
  const pages = Math.ceil(totalData / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  let endValue
  if (totalData <= dataLimit) {
    endValue = totalData
  }
  else {
    endValue = dataLimit - 1
  }
  const [endIndex, setEndIndex] = useState(endValue);

  let remainingIndex = totalData % dataLimit;
  const business_id = useSelector(
    (state) => state.auth?.userDetail?.business_list?.[0]?.business_profile_id
  );
  useEffect(() => {
    if (business_id !== undefined) {
      getAPIData();
    }
  }, [business_id, startIndex]);

  useEffect(() => {
    getAPIData();
  }, [startIndex]);

  const getAPIData = async () => {
    try {
      const { data } = await axios.get(`user/job/posts/?b_id=${business_id}&index=${startIndex}&offset=${endIndex}`);
      // console.log(data);
      setTotalData(data.total_data);
      setData(data.data);
      // console.log("data from axios", dataAPI);
    } catch (error) {
      // console.log(error);
    }
  };

  async function goToNextPage() {
    // console.log("currentPage number", currentPage);

    if (currentPage + 1 > pages) {
      return;
    } else if (currentPage + 1 == pages) {
      setStartIndex(totalData - remainingIndex);
      setEndIndex(totalData - 1);
    }
    else if (startIndex <= totalData) {
      setEndIndex(totalData);
    }
    else {
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
    }
    else if (startIndex != 0) {
      setCurrentPage((page) => page - 1);

      setStartIndex(startIndex - dataLimit);
      setEndIndex(endIndex - dataLimit);
    }
  }


  const showToast = (success) => {
    toast.dismiss();
    if (success) {
      toast.success("Job Archived Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error("Error! Job Archive Failed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
    <Layout>
      <Container className="py-5">
        
          {dataAPI ? (
            <JobPossitionCard
              pages={pages}
              currentPage={currentPage}
              getData={dataAPI}
              getAPIData={getAPIData}
              showToast={showToast}
            />
          ) : (
            <Loader/>
          )}

          <div style={{ paddingTop: '10px' }}>
            <Pagination
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
              totalData={totalData}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          </div>

        

        <ToastContainer />
      </Container>
      </Layout>
    </>
  );
}

export default JobPossitionPage;
