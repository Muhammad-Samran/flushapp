import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosConfig from "../../Services/AxiosConfig";
import { Loading } from "../../../src/Components/global/Loading/Loading"
import Select from "react-select";
import {BreakLine} from "../../Styles";

function ServicesList() {
  const navigate = useNavigate()
  const [Services, setServices] = useState();
  const [serviceCatList, setSerCatList] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endIndex, setEndIndex] = useState(50);

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      border: "2px solid #c7c6c6",
      borderRadius: "5px",
      fontSize: "0.9rem",
    }),
    control: (provided, state) => ({
      ...provided,
      height: "38px !important",
      minHeight: "33px !important",
      // none of react-select's styles are passed to <Control />
      border: "none",
      boxShadow: state.isSelected || state.isFocused ? "none" : "none",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#04d76a" : "#fff",
      cursor: "pointer",
    }),
  };

  useEffect(() => {
    ServicesAPI()
    getServiceCatList()
  }, [startIndex]);

  const ServicesAPI = async () => {
    try {
      const { data } = await AxiosConfig.get('pre/services/?index=' + startIndex + '&offset=' + endIndex);
      // console.log("data........", data)
      if (data && Services) {
        setServices(oldstate => [...oldstate, ...data.data.services])
        setLoading(false)
      }
      else {
        setServices(data.data.services)
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  const getServiceCatList = async () => {
    try {
      const { data } = await AxiosConfig.get(`pre/services/`);
      // console.log(data)
      if (data.success === true) {
        let services = [...data.data.services];
        services = services.map((item) => ({
          label: item.Service_name,
          value: item.PreService_id,
        }));
        setSerCatList(services);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeIndexes = () => {
    setLoading(true)
    setStartIndex(endIndex + 1)
    setEndIndex(endIndex + 50)
  }
  return (
    <div className="p-2">
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <div>
          <h4>Services in your area</h4>
        </div>
        <div style={{
          width: '300px',
        }}>
          <Select
            options={serviceCatList}
            components={{ IndicatorSeparator: () => null }}
            name={"service_categories"}
            // value={
            //   serviceCatList ? serviceCatList.find((option) => option.value) : ""
            // }
            onChange={(option) => navigate(`/services/${option.value}`)}
            styles={customStyles}
            placeholder={"Search Service Categories"}
          />
        </div>
      </div>
      <BreakLine />
      {
        Services ?
          <ServicesListContainer>
            {Services.map((item, index) => (
              <ListItem>
                <Link to={`/services/${item.PreService_id}`}>
                  {item.Service_name}
                </Link>
              </ListItem>
            ))}
          </ServicesListContainer>
          :
          <></>
      }

      <div>{loading && <Loading />}</div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        color: "var(--primary-color)",
        cursor: "pointer"
      }}>
        <span
          onClick={changeIndexes}
        >
          Load More
        </span>
      </div>



    </div>
  );
}
const ServicesListContainer = styled.ul`
  display: grid;
  padding: 1rem;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const ListItem = styled.li`
  font-family: "Roboto", sans-serif;
  font-size: clamp(14px, 1vw, 16px) !important;
  color: #666666;
  a {
    color: #666666;
  }
  ::marker {
    color: #06c864;
  }
`;
export default ServicesList;
