import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout/Layout';
import { DatePicker, TimePicker, message } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';

const BookingPage = () => {
  const [doctors, setDoctors] = useState([]);
  console.log(doctors, 'this is bahir doctor');
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const headers = { Authorization: localStorage.getItem('token') };
  const params = useParams();
  const host = 'http://localhost:4000';
  const { user } = useSelector((state) => state.user);
  const getUserData = async () => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      const res = await axios.post(
        `${host}/api/doctor/getDoctorById`,
        { doctorId: params.doctorId },
        { headers }
      );
      if (res.data.success) {
        console.log(res.data.data, 'this is data of mine');
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBooking = async () => {
    const headers = { Authorization: localStorage.getItem('token') };
    try {
      dispatch(showLoading());
      if(!date && !time){
        alert("Time & Date required")
      }
      const res = await axios.post(
        `${host}/api/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${host}/api/user/booking-availability`,
        { doctorId: params.doctorId, date, time },
        { headers }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}{' '}
            </h4>
            <h4>Fees: {doctors.feesPerCunsaltaion} </h4>
            <h4>
              Timings: {doctors.timings && doctors.timings[0]} -{' '}
              {doctors.timings && doctors.timings[1]}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                formate="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format('DD-MM-YYYY'));
                }}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => {
                  setTime(moment(value).format('HH:mm'));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
