import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListingCard1 from "../../../Components/UI/Cards/ListingCard1/ListingCard1";
import axios from "src/Services/AxiosConfig";
import Pagination from '../../../Components/global/Pagination/Pagination'
import Loader from "src/Components/UI/Loader/Loader";


function ManageServices({ dataLimit = 10 }) {

  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState()
  const [serviceListLength, setServiceListLength] = useState()
  const [loading, setLoading] = useState(false);

  const totalData = serviceListLength
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
      setLoading(true)
      const { data } = await axios.get(`my/posted/services/?index=${startIndex}&offset=${endIndex}`)
      // console.log(data)
      setServiceList(data.services_list)
      setServiceListLength(data.total_services)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function goToNextPage() {
    // console.log("currentPage number", currentPage);

    if (currentPage + 1 > pages) {
      return;
    } else if (currentPage + 1 === pages) {
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
    if (currentPage === 0) {
      return;
    } else if (currentPage + 1 === pages) {
      setCurrentPage((page) => page - 1);
      setStartIndex(startIndex - dataLimit);
      setEndIndex(endIndex - remainingIndex);
    }
    else if (startIndex !== 0) {
      setCurrentPage((page) => page - 1);

      setStartIndex(startIndex - dataLimit);
      setEndIndex(endIndex - dataLimit);
    }
  }

  const archiveService = async (status, service_id) => {
    try {
      setLoading(true)
      const payload = {
        service_id: service_id,
        archive: status
      }
      const { data } = await axios.post(`archive/service`, payload)
      // console.log(data)
      await getListServices()
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const ChangeStatus = async (status, service_id) => {
    try {
      setLoading(true)
      let payload

      switch (status) {
        case 'Open':
          payload = {
            service_id: service_id,
            enable: true
          }
          break;
        case 'Close':
          payload = {
            service_id: service_id,
            enable: false
          }
          break;
        default:
          console.log(status)
          break
      }
      const { data } = await axios.post(`enable/service`, payload)
      // console.log(data)
      await getListServices()
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getListServices()
  }, [startIndex]);

  return (
    <>
    <div>{loading && <Loader />}</div>
      <div className="main-header mt-3">
        <div className="header-title mb-2">
          <span>Services</span>
        </div>
        {/* <div>
          {" "}
          <Form>
            <Form.Group className="mb-3">
              <div className="header-filter">
                <div className="label-filter">
                  <span>Sort by:</span>
                </div>
                <div className="job-position-fields" style={{ width: "50px" }}>
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    style={{ color: "#3F464E" }}
                  />{" "}
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    style={{ color: "#3F464E" }}
                  />
                </div>
                <div className="label-filter">
                  <span>Filter by:</span>
                </div>
                <div className="job-position-fields">
                  <Select
                    styles={customStyles}
                    components={{ IndicatorSeparator: () => null }}
                    options={jobType}
                    placeholder="All"
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
        </div> */}
      </div>
      <div className="top-headings">
        <Row>
          <Col lg={3} md={3} sm={3}>
            <div className="detail-heading">
              <span>Services</span>
            </div>
          </Col>
          <Col lg={3} md={3} sm={3}>
            <div className="detail-heading">
              <span>Total Bookings</span>
            </div>
          </Col>
          <Col lg={3} md={3} sm={3}>
            <div className="detail-heading">
              <span> Status </span>
            </div>
          </Col>
          <Col lg={3} md={3} sm={3}>
            <div className="detail-heading">
              <span> Action </span>
            </div>
          </Col>
        </Row>
      </div>


      <div>
        {serviceListLength > 0 ?
          (<>    {serviceList.map((item, index) => (
            <ListingCard1
              item={item}
              ChangeStatus={ChangeStatus}
              archiveService={archiveService}
              onClick={() => navigate(`/services/bookings/manage/${item.service_id}`)}
            />
          ))}
            <div style={{ paddingTop: '10px' }}>
              <Pagination
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                totalData={totalData}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            </div> </>)
          : (<></>)}
      </div>
    </>
  );
}

export default ManageServices;
