import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "src/Components/global/ContactForm/ContactForm.css";
import BookingForm from "src/Components/global/BookingForm/BookingForm";
import axios from "src/Services/AxiosConfig";

function ContactForBooking() {
  const { serviceId } = useParams()
  const [timeSlots, setTimeSlots] = useState()
  const [timeSlotsLength, setTimeSlotsLength] = useState()
  const getTimeSlots = async(date) => {
    // console.log("serviceId", serviceId)
    try{
      const { data } = await axios.get(`check/service/slot?service_id=${serviceId}&date=${date}`)
      // console.log("time slots", data.slots_list)
      setTimeSlots(data.slots_list)
      setTimeSlotsLength(data.slots_list.length)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <BookingForm
      getTimeSlots={getTimeSlots}
      timeSlots={timeSlots}
      timeSlotsLength={timeSlotsLength}
      />
    </>
  );
}

export default ContactForBooking;
