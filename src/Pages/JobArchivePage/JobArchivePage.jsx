import JobArchiveCard from "../../Components/global/JobArchiveCard/JobArchiveCard";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../Components/global/JobPossitionCard/JobPossitionCard.css";
import axios from "../../Services/AxiosConfig";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../Components/global/Pagination/Pagination";
import Loader from "src/Components/UI/Loader/Loader";
import { useSelector } from "react-redux";

function JobArchivePage({ dataLimit = 10 }) {

  const [totalData, setTotalData] = useState();
  const [dataAPI, setData] = useState();
  const pages = Math.ceil(totalData / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(dataLimit - 1);

  const business_id = useSelector(
    (state) => state.auth?.userDetail?.business_list?.[0]?.business_profile_id
  );
  useEffect(() => {
    if (business_id !== undefined) {
      getAPIData();
    }
  }, [business_id, startIndex]);
  
  let remainingIndex = totalData % dataLimit;

  const getAPIData = async () => {
    // console.log("api call",startIndex);
    try {
      const { data } = await axios.get(
        "archive/job/post/?b_id="+business_id+"&index=" +
          startIndex +
          "&offset=" +
          dataLimit
      );
      // console.log(data);
      setTotalData(data.total_jobs);
      setData(data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  async function goToNextPage() {
    // console.log("startIndex Number", startIndex)
    // console.log("endIndex number", endIndex)
    // console.log("currentPage number", currentPage);
    // console.log("totalData - remainingIndex number", totalData - remainingIndex)

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

    // await getAPIData();
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

    // await getAPIData();
  }

  const showToast = (success, type) => {
    toast.dismiss();
    if (success && type === "unarchive") {
      toast.success("Job Unarchived Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } 
    else if(!success && type === "unarchive") {
      toast.error("Error! Job Unarchive Failed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }

    if (success && type === "delete") {
      toast.success("Job Deleted Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    } 
    else if(!success && type === "delete") {
      toast.error("Error! Job Delete Failed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  };

  return (
    <>
      <Container className="py-5">
        {dataAPI ? (
          <div>
            <JobArchiveCard
              pages={pages}
              currentPage={currentPage}
              getData={dataAPI}
              showToast={showToast}
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
        ) : (
          <Loader/>
        )}

        <ToastContainer />
      </Container>
    </>
  );
}

export default JobArchivePage;
