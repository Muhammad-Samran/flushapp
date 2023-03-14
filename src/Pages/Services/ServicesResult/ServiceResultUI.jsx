import React from "react";
import { Row } from "react-bootstrap";
import ServiceCard from "src/Components/UI/Cards/ServiceCard";
import service01 from "src/Assets/images/services/img-01.png";
import service02 from "src/Assets/images/services/img-02.png";
import service03 from "src/Assets/images/services/img-03.png";
import service04 from "src/Assets/images/services/img-04.png";

const businessServices = [
  {
    image: service01,
    title: "Exterior Wall Painting",
    country: "Rivendell Drive, OH, USA",
    category: "lorem 01",
  },
  {
    image: service02,
    title: "Exterior Wall Painting",
    country: "Rivendell Drive, OH, USA",
    category: "lorem 01",
  },
  {
    image: service03,
    title: "Exterior Wall Painting",
    country: "Rivendell Drive, OH, USA",
    category: "lorem 01",
  },
  {
    image: service04,
    title: "Exterior Wall Painting",
    country: "Rivendell Drive, OH, USA",
    category: "lorem 01",
  },
];
function ServiceResultUI({ services }) {
  // console.log("services", services)
  return (
    <div>
      <Row className="mb-4">
        <div className="d-flex justify-content-between aling-items-center mb-3">
          <div className="section-heading" style={{  cursor: 'pointer' }}>
            <h2 className="fs-24 mb-0">{services[0].service_title} Services</h2>
          </div>
          <div className="sec-link">
            <a href="" className="primary-color fs-16">
              See All
            </a>
          </div>
        </div>
        {services.map((item, index) => (
          <ServiceCard
            image={item.service_image[0].media_file}
            title={item.service_title}
            description={item.service_description}
            category={item.service_category}
            id={item.service_id}
            price={item.service_price}
          />
        ))}
      </Row>

      <Row>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="section-heading">
            <h2 className="fs-24 mb-0">Plumbing Business</h2>
          </div>
          <div className="sec-link">
            <a href="" className="primary-color fs-16">
              See All
            </a>
          </div>
        </div>
        {businessServices.map((item, index) => (
          <ServiceCard
            image={item.image}
            title={item.title}
            category={item.country}
          />
        ))}
      </Row>
    </div>
  );
}

export default ServiceResultUI;
