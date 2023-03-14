import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import image from "src/Assets/images/BusinessDummyImages/image1.jpg";
import "./ServicesDetailPage.css";
import AxiosConfig from "../../Services/AxiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

function ServicesDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [service, setService] = useState()

  const serviceId = location.state.serviceId;
  const image = location.state.image;
  const title = location.state.title;
  const price = location.state.price;
  const description = location.state.description;

  const getDetail = async () => {
    let newService_timings = [];

    try {
      const { data } = await AxiosConfig.get(`user/single/service/?service_id=${serviceId}`);
      // console.log("data........", data)
      
      for (const [key, value] of Object.entries(data.data[0].service_slots)) {
        newService_timings.push({ day_name: key, ...value });
      }
      setService(newService_timings)
      // console.log("newService_timings........", newService_timings)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetail()
  }, []);

  return (
    <>
      <Container>
        <div className="service-main">
          <div className="service-header-img">
            <img src={image} />
          </div>
          <div className="service-title">
            <span>{title}</span>
          </div>

          <div className="service-footer">
            <div className="service-footer-leftside">
              <div className="service-desc">
                <p>{description}</p>
              </div>
            </div>
            <div className="service-footer-rightside">
              <h6>Shift Weekly Routine</h6>
              {service ?
                service.map((item, index) => (
                  <div>
                    <span className="fs-16">{item.day_name.toUpperCase()} <br/> {item.timings.map((time,index) => (<span> {time.startTime} -- {time.endTime} <br/> </span>) )}</span>
                    <br />
                  </div>
                ))
                :
                (<></>)
              }
            </div>
          </div>

          <div className="services-price-book-now">
            <div className="service-price">
              <span className="service-span1">Starting from</span>
              <span className="service-span2">${price}</span>
            </div>
            <div className="service-booking">
              <button className="service-book-btn"
                onClick={() => navigate(`/services/${serviceId}/booking`, {state:{
                  image:image,
                  title:title,
                  description:description
                }})}
              >Book Now</button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ServicesDetailPage;
