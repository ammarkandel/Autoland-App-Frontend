/* eslint-disable */
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import classes from './CarDetails.module.css';
import { useGetAppointmentsQuery } from '../../store/actions/get_appointments';
import { authActions } from '../../store/slices/AuthSlice';

const CarAppointments = (props) => {
  const { id, userId, update } = props;
  const { data, isLoading, isError } = useGetAppointmentsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(
        authActions.showNotification({
          status: 'pending',
          title: 'Loading....',
          message: 'Loading Your Appointments',
        }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({
            status: 'hide',
          }),
        );
      }, 2000);
    } else if (isError) {
      dispatch(
        authActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Error while get appointments',
        }),
      );
      setTimeout(() => {
        dispatch(
          authActions.hideNotification({
            status: 'hide',
          }),
        );
      }, 2000);
    }
  }, [])
  const renderCarAppoinments = () => {
    if (data && data.length > 0) {
      const carAppointments = data.filter((appointment) => appointment.car_id == id && appointment.user_id == userId);
      return (
        <ul className={classes.details}>
          {carAppointments.map((item) => (
            <li key={item.id}>
              <h3>
                Date:
                {item.date}
              </h3>
              <h3>
                Time:
                {item.time}
              </h3>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <h2>No Booked test drive yet</h2>
    );
  };

  return (
    <>
      {renderCarAppoinments()}
    </>
  );
};

CarAppointments.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  update: PropTypes.bool.isRequired,
};

export default CarAppointments;
