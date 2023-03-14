import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ManageBookingsUI from "./ManageBookingsUI";
import axios from "src/Services/AxiosConfig";

function ManageBookingsContainer({ dataLimit = 10 }) {
  const { serviceId } = useParams()
  const [serviceList, setServiceList] = useState()
  const [serviceTitle, setServiceTitle] = useState()
  const [totalBookings, setTotalBookings] = useState()

  const totalData = totalBookings
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

  const getListServices = async () => {
    try {
      const { data } = await axios.get(`booking/service/details?service_id=${serviceId}`)
      // console.log(data)
      setServiceList(data.booking_list)
      setTotalBookings(data.total_bookings)
      setServiceTitle(data.service_title)
    } catch (error) {
      console.log(error)
    }
  }

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

  useEffect(async () => {
    await getListServices()
  }, [])

  return (
    <>
      <ManageBookingsUI
        totalBookings={totalBookings}
        serviceList={serviceList}
        serviceTitle={serviceTitle}
        serviceId={serviceId}
        getListServices={getListServices}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalData={totalData}
      // onClick={() => navigate(`/services/bookings/manage/${item.service_id}`)}
      />
    </>
  )
}

export default ManageBookingsContainer;
