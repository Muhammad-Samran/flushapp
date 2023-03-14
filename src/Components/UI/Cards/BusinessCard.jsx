import React from "react";
import styled from "styled-components";

import { Card, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
function BusinessCard({
    image,
    title,
    country,
  

}) {
    return (
        <Col md={3}>
            <Card className="border-radius-20">
                <Card.Img variant="top" src={image} />
                <Card.Body>                  
                    <Card.Title className="mb-0">
                      <h2 className="primary-font fs-18 mb-0">{title}</h2>     
                    </Card.Title>
                
                    <Card.Text className="mb-2">
                       <p className="fs-14 mb-2 p-color secondary-font">  {country}</p>
                        
                    </Card.Text>
                    
                    
                      
                    <Button variant="light">Book Now</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default BusinessCard;
