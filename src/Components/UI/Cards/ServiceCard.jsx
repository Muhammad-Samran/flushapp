import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function ServiceCard({ image, title, category, description, id, price }) {
  const navigate = useNavigate();
  return (
    <Col md={3}>
      <Card className="border-radius-20">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title className="mb-0">
            <h2 className="primary-font fs-18 mb-0"
            style={{  cursor: 'pointer' }}
              onClick={() =>
                navigate(`/services/${id}/detail`, {
                  state: {
                    serviceId: id,
                    image: image,
                    title:title,
                    category:category,
                    description: description,
                    price: price
                  },
                })
              }
            >{title}</h2>
          </Card.Title>
          <Card.Title className="mb-2 fs-14">{category}</Card.Title>
          <Card.Text className="mb-2">
            <p className="fs-14 mb-2 p-color secondary-font"> {description}</p>
            <p className="fs-14 mb-0">
              <span className="primary-color">Starting from </span>
              <span className="fw-bold">${price}</span>
            </p>
          </Card.Text>

          <Button
            variant="light"
            className="fs-14 fw-medium"
            onClick={() => navigate(`/services/${id}/booking`, {
              state: {
                serviceId: id,
                image: image,
                title:title,
                category:category,
                description: description,
                price: price
              },
            })}
          >
            Book Now
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ServiceCard;
