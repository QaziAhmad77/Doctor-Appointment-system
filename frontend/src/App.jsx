import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Spinner from './components/Spinner/Spinner';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes/PublicRoutes';
import ApplyDoctor from './pages/ApplyDoctor/ApplyDoctor';
import NotificationPage from './components/NotificationPage/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';
import BookingPage from './pages/BookingPage/BookingPage';
import Appointments from './pages/Appointments/Appointments';
import DoctorAppointmets from './pages/doctor/DoctorAppointmets';
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoutes>
                <Doctors />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctor/profile/:id"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoutes>
                <BookingPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoutes>
                <NotificationPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoutes>
                <Appointments />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <ProtectedRoutes>
                <DoctorAppointmets />
              </ProtectedRoutes>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
