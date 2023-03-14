import React, {useState} from "react";
import "./JobPossitionCard.css";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import AxiosConfig from "../../../Services/AxiosConfig";
import Loader from "src/Components/UI/Loader/Loader";
import {
  faArrowDown,
  faArrowUp,
  faFolderOpen,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";


const jobType = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
];
const customStyles = {
  dropdownIndicator: (base) => ({
    ...base,
    color: "#06C864", // Custom colour
  }),
};

const JobPossitionCard = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const ArchiveAPI = async (JobId) => {
    try {
      setLoading(true)
      const payload = {
        job_post_id: JobId,
        is_expired: true,
      };

      const { data } = await AxiosConfig.put("archive/job/post/", payload);

      props.showToast(data.success);
      setLoading(false)
    } catch (error) {
      // console.log(error);
      props.showToast(false);
    }
  };

  const changeStatus = async (status, job_post_id) => {
    // console.log("target value", status)
    try {
      setLoading(true)
      let payload

      switch (status) {
        case 'Open':
          payload = {
            job_post_id: [job_post_id],
            is_open : true
          }
          break;
        case 'Close':
          payload = { 
            job_post_id: [job_post_id],
            is_open : false
          }
          break;
        default:
            console.log(status)
            break
      }

      const { data } = await AxiosConfig.post("jobpost/open/status", payload)
      // console.log(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div>{loading && <Loader />}</div>
      <div className="main-header mt-3">
        <div className="header-title">
          <span>Job Positions</span>
        </div>
        {/* <div className="header-filter"> */}
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
        {/* </div> */}
      </div>
      <div className="top-headings d-flex">
        <div className="position detail-heading">
          <span>Positions</span>
        </div>

        <div className="center-detail " style={{ marginRight: "50px" }}>
          <div className="detail-heading">
            <span>Applicants</span>
          </div>
          <div className="detail-heading">
            <span>Interview</span>
          </div>
          <div className="detail-heading">
            <span>Hired</span>
          </div>
          <div className="detail-heading">
            <span>Rejected</span>
          </div>
          <div className="detail-heading">
            <span>Pending</span>
          </div>
          <div className="detail-heading">
            <span>Job Status</span>
          </div>
          <div className="detail-heading">
            <span>Action</span>
          </div>
        </div>
        {/* <div className="right-end select-dropdown detail-heading">
          <span>Job Status</span>
        </div> */}
      </div>

      {props.getData.map((item, index) =>
        item.is_expired ? null : (
          <div className="main job-position-main">
            <div className="body">
              <div className="checkbox">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" />
                </Form.Group>
              </div>
              <div
                className="title title-job-position"
                style={{ color: "#3F464E" }}
              >
                <h4
                  onClick={() =>
                    navigate(`/jobs-applicants`, {
                      state: {
                        JObID: item.job_post_id,
                      },
                    })
                  }
                >
                  {item.job_title}
                </h4>

                <div className="sub-title" style={{ color: "#3F464E" }}>
                  <p>{item.work_location}</p>
                </div>

                <div className="job-detail">
                  <div className="location" style={{ marginRight: "15px" }}>
                    <span>
                      Created on:{" "}
                      {dateFormat(item.create_ts, "dddd, mmmm dS, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="main-center-detail"> */}
            <div className="center-detail">
              <div className="detail-counts">
                <span>{item.total_apllications}</span> <br />{" "}
                <span className="detail-desc">Candidates</span>
              </div>
              <div className="detail-counts">
                <span>{item.total_interviewed}</span> <br />{" "}
                <span className="detail-desc">Interviewed</span>
              </div>
              <div className="detail-counts">
                <span>{item.total_hired}</span> <br />{" "}
                <span className="detail-desc">Hired</span>
              </div>
              <div className="detail-counts">
                <span>{item.total_rejected}</span> <br />{" "}
                <span className="detail-desc"> Rejected</span>
              </div>
              <div className="detail-counts">
                <span>{item.total_pending}</span> <br />{" "}
                <span className="detail-desc">Pending</span>
              </div>
              <div className="detail-counts">
                <Form.Select
                  size="sm"
                  defaultValue={item.is_open == true && "Open" || item.is_open == false && "Close"}
                  onChange={
                    (e) => {
                      // console.log("select onchange", e.target.value, "=>", item.is_open)
                      changeStatus(e.target.value, item.job_post_id)
                    }
                  }
                >
                  <option value={"Open"} >Open</option>
                  <option value={"Close"}>Close</option>
                </Form.Select>
              </div>
              <div className="detail-counts buttons-position">
                {/* <Form.Select size="sm">
              <option>Edit</option>
              <option>Archive</option>
            </Form.Select> */}
                <div className="edit-btn">
                  <button
                    class="button2 edit-job-btn "
                    style={{ marginRight: "10px" }}
                    onClick={() =>
                      navigate(`/edit-job`, {
                        state: { item },
                      })
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: "#37d1aa" }}
                    />{" "}
                  </button>
                </div>
                <div className="archive-btn">
                  <button
                    class="button2 edit-job-btn"
                    onClick={async () => {
                      await ArchiveAPI(item.job_post_id);
                      await props.getAPIData();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFolderOpen}
                      style={{ color: "#37d1aa" }}
                    />{" "}
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="right-end select-dropdown">
            <Form.Select size="sm">
              <option>Open</option>
              <option>Close</option>
            </Form.Select>
          </div> */}
            {/* </div> */}
          </div>
        )
      )}
      {/* <div className="PanelFooter">
        <Pagination.Prev onClick={(event) => props.goToPreviousPage()}>
          Previous
        </Pagination.Prev>

        <Pagination>{pageIndex()}</Pagination>

        <Pagination.Next onClick={(event) => props.goToNextPage()}>
          Next
        </Pagination.Next>
      </div> */}
    </>
  );
};

export default JobPossitionCard;
