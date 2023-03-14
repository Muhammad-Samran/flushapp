import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FieldArray, Field } from "formik";
import "./SelectTimings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
function SelectTimings({ field, setFieldValue, values, startTime, endTime }) {
  const [day, setCurrentDay] = useState("monday");
  return (
    <div className="">
      <div className="d-flex mb-5  justify-content-center">
        {Object.keys(values[field]).map((currentDay, index) => (
          <span className="mx-2" key={index}>
            <label className="round_checkmark_container my-2 d-inline-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={day === currentDay}
                onChange={(e) => setCurrentDay(currentDay)}
              />
              <span className="round_checkmark">
                <p className="m-0">{currentDay.split("")[0].toUpperCase()}</p>
              </span>
            </label>
          </span>
        ))}
      </div>

      <FieldArray
        name={`${field}.${day}.timings`}
        render={(arrayHelpers) => (
          <div>
            {values[field][day].timings &&
              values[field][day].timings.length > 0 ? (
              values[field][day].timings.map((friend, index) => (
                <div key={index}>
                  <div className="d-flex justify-content-end">
                    <AddItem
                      type="button"
                      onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </AddItem>
                    <AddItem
                      type="button"
                      onClick={() =>
                        arrayHelpers.insert(index, {
                          startTime: startTime,
                          endTime: endTime,
                        })
                      } // insert an empty string at a position
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </AddItem>
                  </div>

                  <div className="d-flex gap-3">
                    {/* Setting Start Time */}

                    <div className="flex-6">
                      <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Field
                          required
                          type="time"
                          className="time-input"
                          name={`${field}.${day}.timings.${index}.startTime`}
                        />
                      </Form.Group>
                    </div>

                    {/* Setting End Time */}
                    <div className="flex-6">
                      <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Field
                          required
                          type="time"
                          className="time-input"
                          name={`${field}.${day}.timings.${index}.endTime`}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="d-flex justify-content-center mt-2">
                <AddTimingsBtn
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({
                      startTime: startTime,
                      endTime: endTime,
                    })
                  }
                >
                  {/* show this when user has removed all friends from the list */}
                  Add Timings
                </AddTimingsBtn>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
const AddItem = styled.span`
  background-color: #04d76a;
  color: #fff;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  margin: 0 5px;
  border: 2px solid transparent;
  border-radius: 20px;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
  font-size: clamp(14px, 0.8vw, 16px) !important;

  &:hover {
    border: 2px solid #04d76a;
  }
`;
const AddTimingsBtn = styled.button`
  background-color: #cdf4e0;
  color: #3f464e;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 20px;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
  font-size: clamp(14px, 0.8vw, 16px) !important;
  &:hover {
    border: 2px solid #04d76a;
  }
`;
export default SelectTimings;
