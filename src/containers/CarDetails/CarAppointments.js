/* eslint-disable */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import getAppointmentsData from '../../store/actions/get_user_appointments';
import classes from './CarDetails.module.css';

const CarAppointments = (props) => {
  const {id} = props;
  const appointments = useSelector((state) => state.userInfo.appointments).filter((appointment) => appointment.car_id == id );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointmentsData())
  }, [])

  const renderCarAppoinments = () => {
    if (appointments.length > 0) {
      return (
        <ul className={classes.details}>
          {appointments.map((item) => (
            <li key={item.id}>
              <h3>Date: {item.date}</h3>
              <h3>Time: {item.time}</h3>
            </li>
          ))}
        </ul>
      )
    } else {
      return (
        <h2>No Booked test drive yet</h2>
      )
    }
  }

  return(
    <>
     {renderCarAppoinments()}
    </>
  );
}


export default CarAppointments;
